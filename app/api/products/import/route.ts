import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { fetchProductData } from '@/lib/fetchers';

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
        let imageUrl = '/placeholder.png';
        let description = 'Imported product. Please edit details.';


        // Smart Detection
        if (url.includes('amazon') || url.includes('amzn')) {
            sourcePlatform = "AMAZON" as any;
            productType = "AFFILIATE" as any;
        } else if (url.includes('aliexpress')) {
            sourcePlatform = "ALIEXPRESS" as any;
            productType = "DROPSHIP" as any;
        } else if (url.includes('walmart')) {
            sourcePlatform = "WALMART" as any;
            productType = "AFFILIATE" as any;
        }

        // Try to Fetch Data (API / Scrape)
        const metadata = await fetchProductData(url);

        if (metadata) {
            if (metadata.title) title = metadata.title.substring(0, 150);
            if (metadata.images && metadata.images.length > 0) imageUrl = metadata.images[0];
            if (metadata.description) description = metadata.description.substring(0, 500) + '...';
            if (metadata.price) price = metadata.price;
        }

        // Create Product
        const newProduct = await prisma.product.create({
            data: {
                title,
                slug: `imported-${Date.now()}`,
                description: description,
                price: price,
                productType,
                sourceplatform: sourcePlatform,
                sourceUrl: url,
                status: 'DRAFT',
                images: {
                    create: {
                        url: imageUrl,
                        altText: title
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
