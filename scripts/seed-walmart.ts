
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// High Quality "Hardest" Items from Walmart
const WALMART_PRODUCTS = [
    {
        title: 'Ninja CREAMI Ice Cream Maker',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1563319088-75e117498305?w=800&q=80',
        description: 'Turn almost anything into ice cream, sorbet, milkshakes, and more. The viral sensation.',
        url: 'https://www.walmart.com/ip/Ninja-CREAMi-Ice-Cream-Maker/236471845'
    },
    {
        title: 'Dyson Airwrap Multi-Styler',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80',
        description: 'Curl. Shape. Smooth and hide flyaways. With no extreme heat.',
        url: 'https://www.walmart.com/ip/Dyson-Airwrap-Multi-Styler/123456789'
    },
    {
        title: 'Sony PlayStation 5 Slim',
        price: 499.00,
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
        description: 'The latest PS5 console. Slimmer design, same powerful performance.',
        url: 'https://www.walmart.com/ip/PlayStation-5-Slim-Console/5113184346'
    },
    {
        title: 'Bissell Little Green Cleaner',
        price: 123.59,
        image: 'https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?w=800&q=80',
        description: 'Portable spot and stain cleaner. Perfect for pets and tough messes.',
        url: 'https://www.walmart.com/ip/Bissell-Little-Green-Portable-Spot-Cleaner/50069382'
    },
    {
        title: 'Apple AirPods Pro (2nd Gen)',
        price: 249.00,
        image: 'https://images.unsplash.com/photo-1608248597279-f9cfa1a50ebd?w=800&q=80',
        description: 'Rich audio quality. Up to 2x more Active Noise Cancellation.',
        url: 'https://www.walmart.com/ip/Apple-AirPods-Pro-2nd-Generation/1971776993'
    }
];

async function main() {
    console.log('Starting Walmart Import...');

    for (const p of WALMART_PRODUCTS) {
        console.log(`Importing: ${p.title}`);

        try {
            await prisma.product.create({
                data: {
                    title: p.title,
                    slug: `walmart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    description: p.description,
                    price: p.price,
                    productType: 'AFFILIATE',
                    sourceplatform: 'WALMART',
                    sourceUrl: p.url,
                    status: 'DRAFT', // Set to ACTIVE if you want them public immediately
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

    console.log('Done!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
