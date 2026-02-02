
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import {
    Star,
    Truck,
    ShieldCheck,
    RefreshCcw,
    ExternalLink,
    ShoppingBag,
    Check,
    AlertCircle,
    Zap
} from 'lucide-react';
import { generateAffiliateLink } from '@/lib/affiliate';
import { BuyNowButton } from '@/components/storefront/BuyNowButton';

const prisma = new PrismaClient();

interface Props {
    params: { slug: string };
}

async function getProduct(slug: string) {
    return await prisma.product.findUnique({
        where: { slug },
        include: { images: true }
    });
}

export default async function ProductDetailPage({ params }: Props) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    const isAffiliate = product.productType === 'AFFILIATE';
    const discount = product.compareAtPrice
        ? Math.round(((Number(product.compareAtPrice) - Number(product.price)) / Number(product.compareAtPrice)) * 100)
        : 0;

    return (
        <div className="container py-20 md:py-32">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <a href="/" className="hover:text-primary transition-colors">Home</a>
                <span>/</span>
                <span className="text-foreground font-medium truncate">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Product Images */}
                <div className="space-y-6">
                    <div className="aspect-square relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 shadow-2xl">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0].url}
                                alt={product.images[0].altText || product.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                        )}

                        {discount > 0 && (
                            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg shadow-accent/20">
                                Save {discount}%
                            </div>
                        )}
                    </div>
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img) => (
                                <div key={img.id} className="aspect-square relative rounded-xl border border-white/10 bg-card/30 overflow-hidden cursor-pointer hover:border-primary transition-all">
                                    <Image src={img.url} alt="Thumbnail" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20">
                            <Zap className="w-3 h-3" /> Trending Now
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">{product.title}</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center text-yellow-500">
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <Star className="h-5 w-5 fill-current" />
                                <span className="ml-2 font-semibold text-foreground">4.9</span>
                            </div>
                            <span className="text-sm text-muted-foreground border-l border-white/10 pl-4">120+ Reviews</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-primary">${Number(product.price).toFixed(2)}</span>
                            {product.compareAtPrice && (
                                <span className="text-xl text-muted-foreground line-through decoration-destructive/50">
                                    ${Number(product.compareAtPrice).toFixed(2)}
                                </span>
                            )}
                        </div>
                        <p className="text-green-500 text-sm font-medium flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Selling fast! Only 5 left at this price.
                        </p>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    {/* ACTION AREA - THE MONEY MAKER */}
                    <div className="mt-4 pt-4">
                        {isAffiliate ? (
                            <div className="space-y-4">
                                <Button size="lg" className="w-full gap-2 text-lg h-16 rounded-full font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] animate-pulse hover:animate-none bg-primary hover:bg-primary/90" asChild>
                                    <a
                                        href={generateAffiliateLink(product.affiliateUrl, product.sourceplatform)}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                    >
                                        Buy on Partner Site <ExternalLink className="h-5 w-5" />
                                    </a>
                                </Button>
                                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    External transaction handled by partner.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <BuyNowButton
                                    productId={product.id}
                                    price={Number(product.price)}
                                    title={product.title}
                                    imageUrl={product.images[0]?.url || '/placeholder.png'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-2 text-center text-sm">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <Truck className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-white">{product.shippingDays || 'Fast Shipping'}</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center text-sm">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-white">Lifetime Warranty</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center text-sm">
                            <div className="p-2 rounded-full bg-primary/10 text-primary">
                                <RefreshCcw className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-white">30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
