
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Zap } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="p-1 rounded bg-primary/20 text-primary">
                                <Zap className="h-4 w-4" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">HYBRIDSTORE</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Curating the future of lifestyle technology.
                            Premium gadgets, smart home devices, and innovative tools for the modern creator.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61587477980263' },
                                { Icon: Twitter, href: '#' },
                                { Icon: Instagram, href: '#' },
                                { Icon: Youtube, href: '#' }
                            ].map(({ Icon, href }, i) => (
                                <Link key={i} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined} className="p-2 rounded-full bg-white/5 text-muted-foreground hover:bg-primary hover:text-white transition-all">
                                    <Icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Best Sellers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Smart Home</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Accessories</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Shipping Info</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Returns</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                            Subscribe for exclusive drops and early access.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
                            />
                            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2026 HybridStore. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
