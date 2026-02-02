
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    const products = await prisma.product.findMany({
        where: { status: 'PUBLISHED' },
        include: { images: true }
    });

    const baseUrl = process.env.NEXTAUTH_URL || 'https://your-store.com';

    // XML Header
    let xml = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>HybridStore Product Feed</title>
<link>${baseUrl}</link>
<description>Premium Gadgets and Accessories</description>
`;

    // Items
    for (const product of products) {
        const isAffiliate = product.productType === 'AFFILIATE';
        const link = isAffiliate && product.affiliateUrl
            ? product.affiliateUrl
            : `${baseUrl}/products/${product.slug}`;

        const image = product.images[0]?.url
            ? (product.images[0].url.startsWith('http') ? product.images[0].url : `${baseUrl}${product.images[0].url}`)
            : '';

        xml += `
<item>
<g:id>${product.id}</g:id>
<g:title>${product.title.replace(/&/g, '&amp;')}</g:title>
<g:description>${product.description.replace(/&/g, '&amp;').substring(0, 5000)}</g:description>
<g:link>${link}</g:link>
<g:image_link>${image}</g:image_link>
<g:brand>HybridStore</g:brand>
<g:condition>new</g:condition>
<g:availability>in stock</g:availability>
<g:price>${Number(product.price).toFixed(2)} USD</g:price>
<g:google_product_category>Electronics > Electronics Accessories</g:google_product_category>
</item>`;
    }

    xml += `
</channel>
</rss>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
