import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/storefront/ProductCard';

const prisma = new PrismaClient();

export default async function CollectionPage({ params }: { params: { slug: string } }) {
    // 1. Fetch the Collection
    const collection = await prisma.collection.findUnique({
        where: { slug: params.slug },
        include: {
            products: {
                include: {
                    images: true
                }
            }
        }
    });

    // 2. Fallback: If no collection found, check if it's a "Smart Collection" keyword
    // e.g. "trending", "new-arrivals", "all"
    let products = collection?.products || [];
    let title = collection?.title || params.slug;

    if (!collection) {
        if (params.slug === 'all') {
            title = "All Products";
            products = await prisma.product.findMany({
                where: { status: 'PUBLISHED' },
                include: { images: true },
                orderBy: { createdAt: 'desc' }
            });
        } else if (params.slug === 'trending') {
            title = "Trending Now";
            products = await prisma.product.findMany({
                where: { status: 'PUBLISHED' },
                include: { images: true },
                take: 12,
                orderBy: { createdAt: 'desc' } // Mock logic for now
            });
        } else {
            return notFound();
        }
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white capitalize">{title}</h1>
                <p className="mt-4 text-xl text-gray-400">
                    Curated selection of the best items.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500">No products found in this collection.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={Number(product.price)}
                            imageUrl={product.images[0]?.url || '/placeholder.png'}
                            category="Collection"
                            type={product.productType as 'DROPSHIP' | 'AFFILIATE'}
                            affiliateUrl={product.sourceUrl || '#'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
