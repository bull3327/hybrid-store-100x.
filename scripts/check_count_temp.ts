
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.product.count();
    console.log(`Total Products in DB: ${count}`);
    const zendrop = await prisma.product.findMany({
        where: { sourceplatform: 'ZENDROP' },
        select: { title: true, status: true }
    });
    console.log('Zendrop Products:', zendrop);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
