'use server'

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function importProduct(formData: FormData) {
    const url = formData.get('url') as string;

    if (!url) return;

    let title = "Imported Product";
    let productType = "DROPSHIP"; // Default
    let sourcePlatform = "MANUAL";
    let price = 29.99;

    // 1. High IQ Detection Logic
    if (url.includes('amazon')) {
        title = "New Amazon Find";
        sourcePlatform = "AMAZON";
        productType = "AFFILIATE";
    } else if (url.includes('aliexpress')) {
        title = "New AliExpress Drop";
        sourcePlatform = "ALIEXPRESS";
        productType = "DROPSHIP";
    } else if (url.includes('walmart')) {
        title = "Walmart Deal";
        sourcePlatform = "WALMART";
        productType = "AFFILIATE";
    }

    // 2. Create the Product in Database
    const newProduct = await prisma.product.create({
        data: {
            title: title + " (Draft)",
            slug: `imported-${Date.now()}`, // Temporary slug
            description: "Imported product. Please edit description.",
            price: price,
            productType: productType,
            sourceplatform: sourcePlatform,
            sourceUrl: url,
            status: 'DRAFT', // Safety first
            images: {
                create: {
                    url: '/placeholder.png',
                    altText: 'Imported Image'
                }
            }
        }
    });

    // 3. Redirect to the Edit Page so user can finish setup
    redirect(`/admin/products/${newProduct.id}`);
}
