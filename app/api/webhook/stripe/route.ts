import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook Error: ${error.message}`);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    const session = event.data.object as any;

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;
        const orderId = session.metadata?.orderId;

        if (orderId) {
            try {
                await prisma.order.update({
                    where: { id: orderId },
                    data: {
                        status: 'PAID',
                        paymentStatus: 'paid',
                        guestEmail: session.customer_details?.email || null,
                        customerName: session.customer_details?.name || null,
                        shippingAddress: session.shipping_details?.address || session.customer_details?.address || undefined,
                    },
                });
                console.log(`Order ${orderId} marked as paid.`);
            } catch (err) {
                console.error('Error updating order:', err);
            }
        }
    }

    return NextResponse.json({ received: true });
}
