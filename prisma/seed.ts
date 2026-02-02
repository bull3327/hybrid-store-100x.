

// import 'dotenv/config'
// Explicitly setting for local dev context if .env isn't picked up automatically by all runners
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/hybridstore?schema=public"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Clean up existing products to ensure "less products" constraint
    console.log('Clearing existing products...')
    // Note: SQLite might fail on deleteMany if tables don't exist, but migration should have handled it.
    try {
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
    const products = [
        {
            title: 'NebulaLink 4K Holo-Projector',
            slug: 'nebulalink-4k-projector',
            description: 'Experience the cosmos in unparalleled 4K clarity. The NebulaLink transforms any room into a breathtaking galactic voyage with proprietary laser technology. Features app control, sleep timer, and 16 million colors.',
            price: 129.99,
            compareAtPrice: 199.99,
            costPrice: 45.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ALIEXPRESS',
            status: 'PUBLISHED',
            shippingDays: '7-12 days',
            badge: 'Viral Hit',
            images: [
                { url: '/images/products/projector.png', altText: 'NebulaLink 4K Projection in Living Room', position: 0 }
            ]
        },
        {
            title: 'FluxRing Titanium Health Tracker',
            slug: 'fluxring-titanium',
            description: 'Advanced biometric tracking in a sleek, aerospace-grade titanium ring. Monitor sleep, heart rate, and recovery with clinical precision. Water-resistant up to 100m and featuring a 7-day battery life.',
            price: 199.99,
            compareAtPrice: 299.00,
            costPrice: 60.00,
            productType: 'DROPSHIP',
            sourceplatform: 'ZENDROP',
            status: 'PUBLISHED',
            shippingDays: '3-5 days',
            badge: 'Premium',
            images: [
                { url: '/images/products/fluxring-v2.png', altText: 'FluxRing Titanium V2', position: 0 }
            ]
        },
        {
            title: 'Levit8 Anti-Gravity Smart Planter',
            slug: 'levit8-smart-planter',
            description: 'Future-proof your decor with the Levit8. Using magnetic suspension, your plant floats and rotates in mid-air, ensuring 360° sunlight exposure. Minimalist design meets botanical innovation.',
            price: 79.99,
            compareAtPrice: 119.99,
            costPrice: 28.00,
            productType: 'DROPSHIP',
            sourceplatform: 'SPOCKET',
            status: 'PUBLISHED',
            shippingDays: '2-4 days',
            badge: 'Trending',
            images: [
                { url: '/images/products/pot.png', altText: 'Levitating Planter White', position: 0 }
            ]
        },
        {
            title: 'Sony WH-1000XM5 Wireless Headphones',
            slug: 'sony-wh1000xm5',
            description: 'Industry-leading noise cancellation. Crystal clear hands-free calling. Up to 30-hour battery life with quick charging. The ultimate listening experience.',
            price: 348.00,
            compareAtPrice: 399.00,
            costPrice: 0,
            productType: 'AFFILIATE',
            sourceplatform: 'AMAZON',
            affiliateUrl: 'https://amazon.com/dp/B09XS7JWHH?tag=hybridstore-20',
            status: 'PUBLISHED',
            shippingDays: 'Prime 2-Day',
            badge: 'Best Seller',
            images: [
                { url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop', altText: 'Sony Headphones', position: 0 }
            ]
        },
        {
            title: 'Dyson V15 Detect Cordless Vacuum',
            slug: 'dyson-v15',
            description: 'Engineered for deep cleaning. Laser reveals microscopic dust. LCD screen displays scientific proof of a deep clean.',
            price: 649.99,
            compareAtPrice: 749.99,
            costPrice: 0,
            productType: 'AFFILIATE',
            sourceplatform: 'WALMART',
            affiliateUrl: 'https://walmart.com/ip/dyson-v15',
            status: 'PUBLISHED',
            shippingDays: 'Next Day',
            badge: 'Top Rated',
            images: [
                { url: 'https://images.unsplash.com/photo-1558317374-a354d5f6d4da?q=80&w=1000&auto=format&fit=crop', altText: 'Dyson Vacuum', position: 0 }
            ]
        }
    ]

    for (const p of products) {
        const { images, ...data } = p
        const product = await prisma.product.create({
            data: {
                ...data,
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
