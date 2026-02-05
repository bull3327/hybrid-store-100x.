
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ensure DATABASE_URL is available for local runs
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "postgresql://postgres:password@localhost:5432/hybridstore?schema=public";
}

// Popular "Winning" Dropshipping Products (Zendrop Style)
const ZENDROP_PRODUCTS = [
    {
        title: 'Galaxy Star Projector 2.0',
        price: 39.99, // Selling Price
        cost: 12.00,  // Approx Cost
        image: 'https://images.unsplash.com/photo-1534234828563-025aa7424ad8?w=800&q=80',
        description: 'Transform your room into a galaxy. The #1 rated ambient lighting device for 2024.',
        url: 'https://zendrop.com/example/galaxy-projector' // Placeholder source
    },
    {
        title: 'Portable Neck Fan Pro',
        price: 24.99,
        cost: 6.50,
        image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&q=80',
        description: 'Stay cool anywhere. Bladeless design, 3-speed settings, and USB rechargeable.',
        url: 'https://zendrop.com/example/neck-fan'
    },
    {
        title: 'Pain Relief Neck Massager',
        price: 34.95,
        cost: 9.00,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
        description: 'Electric pulse neck massager for deep tissue pain relief. Perfect for office workers.',
        url: 'https://zendrop.com/example/neck-massager'
    },
    {
        title: 'Sunset Lamp Projector',
        price: 29.99,
        cost: 7.50,
        image: 'https://images.unsplash.com/photo-1615177005934-297eb0429bf0?w=800&q=80',
        description: 'Golden hour anytime. Create stunning vibes for your photos and videos.',
        url: 'https://zendrop.com/example/sunset-lamp'
    },
    {
        title: 'Smart Posture Corrector',
        price: 19.99,
        cost: 5.00,
        image: 'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?w=800&q=80',
        description: 'Build confidence and fix slouching automatically with smart vibration feedback.',
        url: 'https://zendrop.com/example/posture-corrector'
    }
];

async function main() {
    console.log('Starting Zendrop Dropshipping Import...');

    // Clean up previous Zendrop imports to avoid duplicates
    console.log('Cleaning up old Zendrop drafts...');
    await prisma.product.deleteMany({
        where: { sourceplatform: 'ZENDROP', status: 'DRAFT' } // Only delete drafts to be safe, or all Zendrop if desired
    });

    for (const p of ZENDROP_PRODUCTS) {
        console.log(`Importing: ${p.title}`);

        try {
            await prisma.product.create({
                data: {
                    title: p.title,
                    slug: `zendrop-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    description: p.description,
                    price: p.price,
                    costPrice: p.cost,

                    // KEY DIFFERENCE: DROPSHIP type means YOU collect payment via Strpe
                    productType: 'DROPSHIP',
                    sourceplatform: 'ZENDROP',
                    sourceUrl: p.url,

                    status: 'PUBLISHED', // Changed from DRAFT to PUBLISHED for immediate visibility
                    images: {
                        create: {
                            url: p.image,
                            altText: p.title
                        }
                    }
                }
            });
        } catch (e) {
            console.error(`Failed to import ${p.title}`, e);
        }
    }

    console.log('Done! These products are set to DROPSHIP mode (You take payment).');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
