
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { RefreshCcw, Play, Download, Wand2, Copy } from 'lucide-react';

interface Product {
    id: string;
    title: string;
    description: string;
    images: { url: string }[];
    price: string;
}

export function VideoGenerator() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [script, setScript] = useState<{ hook: string; body: string; cta: string } | null>(null);
    const [previewKey, setPreviewKey] = useState(0);

    // Mock Fetch Products
    useEffect(() => {
        // In real app, fetch from /api/products
        // Mocking for UI demonstration
        setProducts([
            {
                id: '1',
                title: 'HoloLight Galaxy Projector',
                description: 'Transform your room into a galaxy.',
                price: '49.99',
                images: [{ url: '/images/products/projector.png' }]
            },
            {
                id: '2',
                title: 'WingSnap Pro Eyeliner',
                description: 'Perfect wings in seconds.',
                price: '24.99',
                images: [{ url: '/images/products/eyeliner.png' }]
            },
            {
                id: '3',
                title: 'Nebula Levitating Pot',
                description: 'Floating bonsai pot.',
                price: '89.99',
                images: [{ url: '/images/products/pot.png' }]
            }
        ]);
    }, []);

    const generateAd = () => {
        if (!selectedProduct) return;
        setIsGenerating(true);

        // Simulate AI Latency
        setTimeout(() => {
            const hooks = [
                "Stop scrolling! You need to see this.",
                "This gadget changed my life.",
                "POV: You found the perfect gift.",
                "Why is everyone talking about this?"
            ];
            const bodies = [
                `The ${selectedProduct.title} is finally here.`,
                "It's never been easier to upgrade your setup.",
                "Premium quality, affordable price.",
                "I wish I knew about this sooner."
            ];
            const ctas = [
                "Get yours at HybridStore.",
                "Link in bio!",
                "50% OFF today only.",
                "Shop now before it sells out."
            ];

            setScript({
                hook: hooks[Math.floor(Math.random() * hooks.length)],
                body: bodies[Math.floor(Math.random() * bodies.length)],
                cta: ctas[Math.floor(Math.random() * ctas.length)]
            });

            setPreviewKey(prev => prev + 1); // Content changed
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-8">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <label className="block text-sm font-medium mb-4">1. Select a Winning Product</label>
                    <div className="grid grid-cols-2 gap-4">
                        {products.map(p => (
                            <div
                                key={p.id}
                                onClick={() => setSelectedProduct(p)}
                                className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 hover:bg-accent/5 transition-all ${selectedProduct?.id === p.id ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border'}`}
                            >
                                <div className="h-10 w-10 relative bg-muted rounded overflow-hidden flex-shrink-0">
                                    <Image src={p.images[0].url} alt={p.title} fill className="object-cover" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-bold text-sm truncate">{p.title}</p>
                                    <p className="text-xs text-muted-foreground">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <label className="block text-sm font-medium mb-4">2. Generate Content</label>
                    <div className="space-y-4">
                        <Button
                            onClick={generateAd}
                            disabled={!selectedProduct || isGenerating}
                            className="w-full h-12 text-lg gap-2"
                        >
                            {isGenerating ? <RefreshCcw className="animate-spin" /> : <Wand2 className="w-5 h-5" />}
                            {isGenerating ? 'Designing Ad...' : 'Auto-Generate Video'}
                        </Button>

                        {script && (
                            <div className="space-y-3 pt-4 border-t">
                                <div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Hook</span>
                                    <p className="text-sm font-medium">{script.hook}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Body</span>
                                    <p className="text-sm font-medium">{script.body}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Call to Action</span>
                                    <p className="text-sm font-medium text-primary">{script.cta}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview (Mock Phone) */}
            <div className="flex justify-center items-start lg:sticky lg:top-6">
                <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20"></div>

                    {/* Screen Content */}
                    <div className="relative w-full h-full bg-slate-900">
                        {selectedProduct && script ? (
                            <div key={previewKey} className="w-full h-full relative">
                                {/* Background Image (Ken Burns Effect) */}
                                <div className="absolute inset-0 bg-black">
                                    <Image
                                        src={selectedProduct.images[0].url}
                                        alt="Ad bg"
                                        fill
                                        className="object-cover opacity-80 animate-ken-burns"
                                    />
                                </div>

                                {/* UI Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 flex flex-col gap-2">
                                    {/* TikTok Style Text */}
                                    <div className="mb-4 space-y-2">
                                        <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 inline-block animate-slide-in-right">
                                            <p className="text-white font-bold text-lg drop-shadow-md">{script.hook}</p>
                                        </div>
                                        <div className="animate-fade-in delay-700">
                                            <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">{script.body}</p>
                                        </div>
                                    </div>

                                    {/* Action Bar */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white text-xs">H</div>
                                            <span className="text-white font-bold text-sm">HybridStore</span>
                                        </div>
                                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-bold animate-pulse">
                                            Shop Now
                                        </Button>
                                    </div>
                                </div>

                                {/* Music Icon Animation */}
                                <div className="absolute bottom-6 right-4 z-20 animate-spin-slow">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                                <Play className="w-12 h-12 opacity-20" />
                                <p className="text-xs text-center px-8">Select a product and click generate to preview ad.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes ken-burns {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.2) translate(-2%, -2%); }
                }
                .animate-ken-burns {
                    animation: ken-burns 15s ease-out infinite alternate;
                }
                @keyframes slide-in-right {
                    0% { transform: translateX(20px); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.5s ease-out forwards;
                }
                .delay-700 { animation-delay: 0.7s; animation-fill-mode: both; }
                .animate-spin-slow {
                    animation: spin 4s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
