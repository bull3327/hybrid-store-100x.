
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';
import { getBaseUrl } from '@/lib/utils';
const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { items, userId, userEmail } = await req.json(); // items: [{ productId, quantity }]

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Fetch products from DB
        const productIds = items.map((item: any) => item.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { images: true }
        });

        const line_items: any[] = [];
        let totalAmount = 0;
        const orderItemsData: any[] = [];

        items.forEach((item: any) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
                // Skip or throw? Let's skip validly
                return;
            }

            const unitAmount = Math.round(Number(product.price) * 100); // cents
            totalAmount += (unitAmount * item.quantity);

            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.title,
                        images: (product.images.length > 0 && product.images[0].url.startsWith('http'))
                            ? [product.images[0].url]
                            : [],
                        metadata: {
                            productId: product.id
                        }
                    },
                    unit_amount: unitAmount,
                },
                quantity: item.quantity,
            });

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            });
        });

        const baseUrl = getBaseUrl();

        // Create Order in DB
        const order = await prisma.order.create({
            data: {
                userId: userId || null, // Optional if guest
                guestEmail: userEmail || null,
                amountTotal: totalAmount / 100, // Store as decimal dollars
                status: 'PENDING',
                paymentStatus: 'unpaid',
                items: {
                    create: orderItemsData
                }
            }
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${order.id}`,
            cancel_url: `${baseUrl}/checkout/cancel`,
            metadata: {
                userId: userId || 'guest',
                orderId: order.id
            },
        });

        // Update order with session ID
        await prisma.order.update({
            where: { id: order.id },
            data: { stripeSessionId: session.id }
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
