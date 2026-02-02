
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Loader2, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface AddToCartButtonProps {
    productId: string;
    title: string;
    price: number;
    imageUrl: string;
}

export function BuyNowButton({ productId, title, price, imageUrl }: AddToCartButtonProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        setLoading(true);

        // Simulate a small delay for better UX
        setTimeout(() => {
            addToCart({
                id: productId,
                title,
                price,
                imageUrl,
                quantity: 1,
                slug: productId
            });
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        }, 600);
    };

    return (
        <>
            <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={loading}
                className={`w-full gap-3 text-lg h-16 rounded-full font-bold shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all transform hover:scale-[1.02] ${success ? 'bg-green-500 hover:bg-green-600' : 'bg-gradient-to-r from-primary to-accent hover:opacity-90'}`}
            >
                {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : success ? (
                    <Check className="h-6 w-6" />
                ) : (
                    <ShoppingBag className="h-6 w-6" />
                )}
                {loading ? 'Adding...' : success ? 'Added to Cart' : `Add to Cart - $${price.toFixed(2)}`}
            </Button>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-4">
                <span className="flex items-center gap-1">Free Shipping</span>
                <span className="flex items-center gap-1">Secure Checkout</span>
            </div>
        </>
    );
}
