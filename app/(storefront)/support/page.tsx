
import { Button } from '@/components/ui/Button';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { ChatBot } from '@/components/storefront/ChatBot';

export default function SupportPage() {
    return (
        <div className="container py-24 md:py-32 relative">
            <ChatBot />

            <div className="max-w-2xl mx-auto text-center space-y-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">How can we help?</h1>
                    <p className="text-muted-foreground text-lg">
                        Our team is here to assist you with any questions about your orders or products.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 text-left">
                    <div className="p-6 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <Mail className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Email Support</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Get a response within 24 hours.
                        </p>
                        <a href="mailto:hybridstorehybridstore@gmail.com" className="text-primary font-medium hover:underline">
                            hybridstorehybridstore@gmail.com
                        </a>
                    </div>

                    <div className="p-6 rounded-2xl border bg-card hover:border-primary/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <MessageCircle className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                            Available 24/7 with Multi-Language Support.
                        </p>
                        <div className="text-sm font-medium text-primary">
                            Click the bubble ↘️
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                    <h2 className="text-2xl font-bold mb-4">FAQ</h2>
                    <div className="space-y-4 text-left">
                        <details className="group border rounded-lg bg-card open:border-primary/20">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                                Where is my order?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-4 pt-0 text-muted-foreground">
                                You can track your order using the tracking number sent to your email. Shipping typically takes 2-5 business days.
                            </div>
                        </details>
                        <details className="group border rounded-lg bg-card open:border-primary/20">
                            <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                                What is your return policy?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="p-4 pt-0 text-muted-foreground">
                                We offer a 30-day money-back guarantee on all products. Contact support to initiate a return.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
