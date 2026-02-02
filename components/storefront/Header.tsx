'use client';

import Link from 'next/link';
import { ShoppingCart, Search, User, Menu, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';

export function Header() {
    const { openCart, cartCount } = useCart();

    return (
        <header className="fixed top-0 z-50 w-full glass border-b border-white/5 bg-background/60 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 rounded-lg bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Zap className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        HYBRID<span className="text-foreground">STORE</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
                    {[
                        { label: 'Trending', href: '/#featured' },
                        { label: 'All Products', href: '/products' },
                        { label: 'Smart Home', href: '/products?q=smart' },
                        { label: 'Support', href: '/support' }
                    ].map((item) => (
                        <Link key={item.label} href={item.href} className="hover:text-primary transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex relative group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-secondary/50 border-none rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-primary w-40 transition-all focus:w-64 outline-none text-foreground placeholder:text-muted-foreground/50"
                        />
                        <Search className="absolute right-3 top-1.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary" />
                    </div>

                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <User className="h-5 w-5" />
                    </Button>

                    <button
                        onClick={openCart}
                        className="relative bg-primary hover:bg-primary/90 text-white p-2 rounded-full transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
