

// import 'dotenv/config'
// Explicitly setting for local dev context if .env isn't picked up automatically by all runners
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/hybridstore?schema=public"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding (V3 - Verified JPG Images)...')

    // 1. Clean up existing products to ensure "less products" constraint
    console.log('Clearing existing products...')
    try {
        await prisma.orderItem.deleteMany({})
        await prisma.order.deleteMany({})
        await prisma.productImage.deleteMany({})
        await prisma.product.deleteMany({})
    } catch (e) {
        console.log('Tables might be empty, continuing...')
    }

    // 2. Users (Admin)
    const adminEmail = 'admin@example.com'
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: 'Store Admin',
            password: 'hashed_password_here',
            role: 'ADMIN',
        },
    })

    // 3. Products - Highly Curated "Winning" Products
    // Using Verified Direct JPG URLs to prevent broken image widgets
    const products = [
        // --- ZENDROP WINNING PRODUCTS ---
        {
            title: 'Rossetta Galaxy Star Projector 2.0',
            slug: 'rossetta-galaxy-projector',
            description: 'Transform your room into a galaxy. The #1 rated ambient lighting device for 2024. Features remote control, multiple lighting modes, and bluetooth speaker.',
            price: 39.99,
            compareAtPrice: 59.99,
            costPrice: 12.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            sourceUrl: 'https://zendrop.com/example/galaxy-projector',
            status: 'PUBLISHED',
            shippingDays: '5-10 days',
            badge: 'Trending',
            images: [
                { url: 'https://m.media-amazon.com/images/I/714W29v6WNL._AC_SL1500_.jpg', altText: 'Rossetta Galaxy Star Projector', position: 0 }
            ]
        },
        {
            title: 'JISULIFE Portable Neck Fan Pro',
            slug: 'jisulife-neck-fan',
            description: 'Stay cool anywhere. Bladeless design, 3-speed settings, and USB rechargeable. 360-degree cooling experience.',
            price: 24.99,
            compareAtPrice: 39.99,
            costPrice: 6.50,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            sourceUrl: 'https://zendrop.com/example/neck-fan',
            status: 'PUBLISHED',
            shippingDays: '5-10 days',
            badge: 'Summer Essential',
            images: [
                { url: 'https://m.media-amazon.com/images/I/61S-YyvLzCL._AC_SL1500_.jpg', altText: 'Portable Neck Fan', position: 0 }
            ]
        },
        {
            title: 'Deep Tissue Neck Massager',
            slug: 'neck-massager',
            description: 'Electric pulse neck massager for deep tissue pain relief. Perfect for office workers. Heat function included.',
            price: 34.95,
            compareAtPrice: 49.95,
            costPrice: 9.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            sourceUrl: 'https://zendrop.com/example/neck-massager',
            status: 'PUBLISHED',
            shippingDays: '5-10 days',
            badge: 'Relief',
            images: [
                { url: 'https://m.media-amazon.com/images/I/71K9Mv6X1zL._AC_SL1500_.jpg', altText: 'Neck Massager', position: 0 }
            ]
        },
        {
            title: 'UFO Sunset Lamp Projector',
            slug: 'sunset-lamp',
            description: 'Golden hour anytime. Create stunning vibes for your photos and videos. USB powered with adjustable brightness and 16 colors (RGB).',
            price: 29.99,
            compareAtPrice: 45.00,
            costPrice: 7.50,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            sourceUrl: 'https://zendrop.com/example/sunset-lamp',
            status: 'PUBLISHED',
            shippingDays: '5-10 days',
            badge: 'Instagram Viral',
            images: [
                { url: 'https://m.media-amazon.com/images/I/71R3yL7kL+L._AC_SX679_.jpg', altText: 'Sunset Lamp RGB', position: 0 }
            ]
        },
        {
            title: 'Upright GO 2 Smart Posture Corrector',
            slug: 'smart-posture-corrector',
            description: 'Build confidence and fix slouching automatically with smart vibration feedback. Invisible under clothes. Syncs with app.',
            price: 79.99,
            compareAtPrice: 99.99,
            costPrice: 40.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            sourceUrl: 'https://zendrop.com/example/posture-corrector',
            status: 'PUBLISHED',
            shippingDays: '5-10 days',
            badge: 'Tech Health',
            images: [
                { url: 'https://m.media-amazon.com/images/I/61hXvU9KkBL._AC_SL1500_.jpg', altText: 'Upright GO 2 Posture Corrector', position: 0 }
            ]
        },
        // --- NEW CATEGORIES: Kitchen, Bedding, Home Decor ---
        {
            title: 'Fullstar Vegetable Chopper',
            slug: 'fullstar-veggie-chopper',
            description: 'The ultimate kitchen time-saver. 4-in-1 vegetable chopper with spiralizer and slicer.',
            price: 29.99,
            compareAtPrice: 39.99,
            costPrice: 10.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            status: 'PUBLISHED',
            badge: 'Kitchen Must-Have',
            images: [
                { url: 'https://m.media-amazon.com/images/I/81xH8zFq4CL._AC_SL1500_.jpg', altText: 'Fullstar Chopper', position: 0 }
            ]
        },
        {
            title: 'YnM Weighted Blanket (Cooling)',
            slug: 'ynm-weighted-blanket',
            description: 'Experience deep, restful sleep with the original YnM weighted blanket. Breathable, cooling fabric.',
            price: 69.99,
            compareAtPrice: 89.99,
            costPrice: 30.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            status: 'PUBLISHED',
            badge: 'Sleep',
            images: [
                { url: 'https://m.media-amazon.com/images/I/81lS9Wf2ZML._AC_SL1500_.jpg', altText: 'Weighted Blanket', position: 0 }
            ]
        },
        // --- AFFILIATE PRODUCTS ---
        {
            title: 'Dyson V15 Detect Cordless Vacuum',
            slug: 'dyson-v15',
            description: 'Engineered for deep cleaning. Laser reveals microscopic dust. LCD screen displays scientific proof of a deep clean.',
            price: 649.99,
            compareAtPrice: 749.99,
            costPrice: 0,
            productType: 'AFFILIATE',
            sourceplatform: 'AMAZON',
            affiliateUrl: 'https://amazon.com/dp/B099K1W3Y3?tag=hybridstore-20',
            status: 'PUBLISHED',
            shippingDays: 'Prime 2-Day',
            badge: 'Top Rated',
            images: [
                { url: 'https://m.media-amazon.com/images/I/61l6vS-Xy-L._AC_SL1500_.jpg', altText: 'Dyson V15', position: 0 }
            ]
        },
        {
            title: 'Levitating Air Bonsai Pot',
            slug: 'levitating-plant-pot',
            description: 'The original levitating planter. Premium mag-lev technology rotates the pot 360 degrees. Modern, futuristic, and perfect for home or office.',
            price: 79.99,
            compareAtPrice: 99.99,
            costPrice: 0,
            productType: 'AFFILIATE' as any,
            sourceplatform: 'AMAZON',
            affiliateUrl: 'https://www.amazon.com/dp/B07G31SK2Z?tag=hybridstore0b-20',
            status: 'PUBLISHED',
            shippingDays: 'Prime Shipping',
            badge: 'Viral Hit',
            images: [
                { url: 'https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07G31SK2Z&Format=_SL500_&ID=AsinImage&MarketPlace=US', altText: 'Levitating Air Bonsai Pot', position: 0 }
            ]
        }
    ]

    for (const p of products) {
        const { images, ...data } = p
        const product = await prisma.product.create({
            data: {
                ...(data as any),
                images: {
                    create: images
                }
            }
        })
        console.log(`Created product: ${product.title}`)
    }

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
