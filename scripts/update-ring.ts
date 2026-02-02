
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const product = await prisma.product.findUnique({
        where: { slug: 'fluxring-titanium' },
        include: { images: true }
    })

    if (!product) {
        console.error('Product not found')
        return
    }

    // Delete old images
    await prisma.productImage.deleteMany({
        where: { productId: product.id }
    })

    // Add new image
    await prisma.productImage.create({
        data: {
            productId: product.id,
            url: '/images/products/fluxring-new.png',
            altText: 'FluxRing Titanium - Next Gen Health Tracker',
            position: 0
        }
    })

    console.log('Updated FluxRing image successfully.')
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())
