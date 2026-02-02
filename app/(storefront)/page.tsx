
import Link from 'next/link'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import { ArrowRight, Star, Zap, ShieldCheck, Truck } from 'lucide-react'

const prisma = new PrismaClient()

async function getFeaturedProducts() {
    return await prisma.product.findMany({
        take: 8,
        where: { status: 'PUBLISHED' },
        include: { images: true }
    })
}

export default async function HomePage() {
    const products = await getFeaturedProducts()

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero_banner.png"
                        alt="Future Tech"
                        fill
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
                        Next Gen Dropshipping
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white animate-fade-in-up">
                        EXPERIENCE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow">FUTURE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
                        Discover a curated collection of the world's most innovative gadgets and lifestyle upgrades.
                        Premium quality. Futuristic design.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                        <Link href="#featured" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-bold transition-all btn-primary-glow flex items-center justify-center gap-2">
                            Shop Now <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="#featured" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-lg font-bold transition-all backdrop-blur-sm flex items-center justify-center">
                            View Collection
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-10 border-y border-white/5 bg-white/5">
                <div className="container px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Zap, label: "Fast Shipping", sub: "2-5 Day Delivery" },
                        { icon: ShieldCheck, label: "Secure Payment", sub: "256-bit Encryption" },
                        { icon: Star, label: "Premium Quality", sub: "Verified Suppliers" },
                        { icon: Truck, label: "Global Tracking", sub: "Real-time Updates" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 justify-center">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-white">{item.label}</p>
                                <p className="text-xs text-muted-foreground">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section id="featured" className="py-24">
                <div className="container px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Trending <span className="text-primary">Now</span></h2>
                            <p className="text-muted-foreground">Hand-picked viral products for 2026.</p>
                        </div>
                        <Link href="/products" className="hidden md:flex items-center text-primary hover:text-accent transition-colors font-medium">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {products.map((product) => (
                            <Link href={`/products/${product.slug}`} key={product.id} className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                                {product.badge && (
                                    <div className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                                        {product.badge}
                                    </div>
                                )}
                                <div className="aspect-square relative bg-white/5">
                                    {product.images[0] ? (
                                        <Image
                                            src={product.images[0].url}
                                            alt={product.images[0].altText || product.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white text-black px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                            Quick View
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-white mb-1 truncate">{product.title}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-xs line-through">${Number(product.compareAtPrice).toFixed(2)}</span>
                                            <span className="text-primary font-bold text-xl">${Number(product.price).toFixed(2)}</span>
                                        </div>
                                        <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="#" className="inline-flex items-center text-primary font-medium">
                            View All Products <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promos / CTA */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5" />
                <div className="container px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Upgrade?</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mb-8">Join thousands of happy customers and bring the future into your home today.</p>
                    <Link href="#featured" className="bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg shadow-accent/20 transition-all inline-block">
                        Start Shopping
                    </Link>
                </div>
            </section>
        </>
    )
}
