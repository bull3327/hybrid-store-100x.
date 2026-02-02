'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function markAsFulfilled(orderId: string) {
    await prisma.order.update({
        where: { id: orderId },
        data: { fulfillmentStatus: 'FULFILLED' }
    });

    revalidatePath('/admin/orders');
}
