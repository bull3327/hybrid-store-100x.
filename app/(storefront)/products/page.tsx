import { PrismaClient } from '@prisma/client';
import { ProductCard } from '@/components/storefront/ProductCard';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';

const prisma = new PrismaClient();

export const metadata: Metadata = {
    title: 'All Products | HybridStore',
    description: 'Explore our curated collection of premium products.',
};

// Revalidate every hour
export const revalidate = 3600;

async function getProducts(query?: string) {
    const where: any = { status: 'PUBLISHED' };

    if (query) {
        where.OR = [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
        ];
    }

    return await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { images: true }
    });
}

type Props = {
    searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function ProductsPage({ searchParams }: Props) {
    const query = typeof searchParams?.q === 'string' ? searchParams.q : undefined;
    const products = await getProducts(query);

    return (
        <div className="container pt-24 pb-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {query ? `Results for "${query}"` : 'All Products'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Curated items for a balanced life.
                    </p>
                </div>

                {/* Simple Filter mockups - Functional filtering in V2 */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Button variant="outline" size="sm" className="whitespace-nowrap">All</Button>
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">Home Decor</Button>
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">Bedding</Button>
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">Wellness</Button>
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">Kitchen</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.slug}
                            title={product.title}
                            price={Number(product.price)}
                            compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : undefined}
                            imageUrl={product.images[0]?.url || '/placeholder.png'}
                            category={product.productType} // Using Type as category for now since Category is complex
                            type={product.productType as 'DROPSHIP' | 'AFFILIATE'}
                            affiliateUrl={product.affiliateUrl || undefined}
                            shippingBadge={product.shippingDays || undefined}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                        <p>No products found. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
