import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as cheerio from 'cheerio';

const prisma = new PrismaClient();

async function scrapeMetadata(url: string) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        if (!res.ok) return null;

        const html = await res.text();
        const $ = cheerio.load(html);

        const title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Imported Product';
        const image = $('meta[property="og:image"]').attr('content') || $('link[rel="image_src"]').attr('href') || '/placeholder.png';
        const description = $('meta[property="og:description"]').attr('content') || '';

        return { title, image, description };
    } catch (e) {
        console.error("Scraping failed", e);
        return null; // Fallback to defaults
    }
}

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
            sourcePlatform = "AMAZON";
            productType = "AFFILIATE";
        } else if (url.includes('aliexpress')) {
            sourcePlatform = "ALIEXPRESS";
            productType = "DROPSHIP";
        } else if (url.includes('walmart')) {
            sourcePlatform = "WALMART";
            productType = "AFFILIATE";
        }

        // Try to Scrape
        const metadata = await scrapeMetadata(url);
        if (metadata) {
            if (metadata.title) title = metadata.title.substring(0, 100); // Trim long Amazon titles
            if (metadata.image) imageUrl = metadata.image;
            if (metadata.description) description = metadata.description;
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
