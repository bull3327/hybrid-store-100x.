'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    imageUrl: string;
    category: string;
    type: 'DROPSHIP' | 'AFFILIATE';
    affiliateUrl?: string;
    shippingBadge?: string;
    className?: string; // Allow external styling
}

export function ProductCard({
    id,
    title,
    price,
    compareAtPrice,
    imageUrl,
    category,
    type,
    affiliateUrl,
    shippingBadge,
    className
}: ProductCardProps) {
    const { addToCart } = useCart();

    const discount = compareAtPrice
        ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any parent link clicks just in case
        addToCart({
            id,
            title,
            price,
            imageUrl,
            quantity: 1,
            slug: id
        });
    };

    return (
        <div className={cn(
            "group relative flex flex-col rounded-xl border-none bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden",
            className
        )}>
            {/* Badge Overlay */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                {discount > 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-destructive shadow-sm">
                        -{discount}%
                    </span>
                )}
                {shippingBadge && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs font-bold shadow-sm">
                        {shippingBadge}
                    </span>
                )}
            </div>

            {/* Image */}
            <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Quick Add Overlay - Mobile friendly? Maybe just desktop hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-6">
                    {/* Visual cue only */}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 space-y-3">
                <div className="space-y-1 flex-1">
                    <p className="text-xs font-medium text-accent uppercase tracking-wider">{category}</p>
                    <h3 className="font-semibold leading-snug tracking-tight text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/products/${id}`} className="hover:underline decoration-primary/50 underline-offset-4">
                            {title}
                        </Link>
                    </h3>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        {compareAtPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                ${compareAtPrice.toFixed(2)}
                            </span>
                        )}
                        <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
                    </div>

                    {/* Compact Action Button */}
                    {type === 'AFFILIATE' && affiliateUrl ? (
                        <Button size="sm" variant="outline" className="rounded-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" asChild>
                            <a href={affiliateUrl} target="_blank" rel="noopener noreferrer">
                                <span>Check Price</span> <ExternalLink className="h-3 w-3" />
                            </a>
                        </Button>
                    ) : (
                        <Button
                            size="icon"
                            className="rounded-full h-10 w-10 shadow-md hover:bg-primary/90 transition-transform active:scale-95"
                            onClick={handleAddToCart}
                        >
                            <ShoppingBag className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
