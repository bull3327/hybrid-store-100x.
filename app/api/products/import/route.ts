import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        let title = "Imported Product (Draft)";
        let productType = "DROPSHIP";
        let sourcePlatform = "MANUAL";
        let price = 29.99;

        // Smart Detection
        if (url.includes('amazon') || url.includes('amzn')) {
            title = "Amazon Product";
            sourcePlatform = "AMAZON";
            productType = "AFFILIATE";
        } else if (url.includes('aliexpress')) {
            title = "AliExpress Product";
            sourcePlatform = "ALIEXPRESS";
            productType = "DROPSHIP";
        } else if (url.includes('walmart')) {
            title = "Walmart Product";
            sourcePlatform = "WALMART";
            productType = "AFFILIATE";
        }

        // Create Product
        const newProduct = await prisma.product.create({
            data: {
                title,
                slug: `imported-${Date.now()}`,
                description: `Imported from ${sourcePlatform}. Please edit details.`,
                price: price,
                productType,
                sourceplatform: sourcePlatform,
                sourceUrl: url,
                status: 'DRAFT',
                images: {
                    create: {
                        url: '/placeholder.png', // User must upload real image in Edit
                        altText: 'Default Placeholder'
                    }
                }
            }
        });

        return NextResponse.json({ success: true, productId: newProduct.id });

    } catch (error) {
        console.error('Import Error:', error);
        return NextResponse.json({ error: 'Failed to import product' }, { status: 500 });
    }
}
