'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function deleteDeadProducts() {
    // Logic: Find products with "DRAFT" status older than 30 days OR published with 0 views/sales
    // For safety in this demo, we'll just delete "DRAFT" products created > 7 days ago

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const deleted = await prisma.product.deleteMany({
        where: {
            status: 'DRAFT',
            createdAt: {
                lt: sevenDaysAgo
            }
        }
    });

    revalidatePath('/admin/copilot');
    return deleted.count;
}
