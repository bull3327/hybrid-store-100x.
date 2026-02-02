
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Search, Truck, MapPin, Package, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TrackingResult {
    id: string;
    status: 'processing' | 'shipped' | 'delivered';
    location: string;
    eta: string;
    steps: { date: string; time: string; status: string; location: string }[];
}

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TrackingResult | null>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setResult({
                id: orderId,
                status: 'shipped',
                location: 'In Transit - International Hub',
                eta: 'Oct 24, 2026',
                steps: [
                    { date: 'Oct 20', time: '14:30', status: 'Arrived at International Hub', location: 'Shenzhen, CN' },
                    { date: 'Oct 19', time: '09:15', status: 'Package Picked Up', location: 'Dongguan, CN' },
                    { date: 'Oct 18', time: '18:00', status: 'Order Processed', location: 'Warehouse' },
                ]
            });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="container py-24 md:py-32 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Track Your Shipment</h1>
                    <p className="text-muted-foreground">
                        Enter your order ID to see real-time updates from our global logistics network.
                    </p>
                </div>

                <form onSubmit={handleTrack} className="flex gap-4 max-w-md mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Order ID (e.g. #1024)"
                            className="w-full bg-secondary/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <Button type="submit" disabled={loading} size="lg" className="px-8 font-bold">
                        {loading ? 'Locating...' : 'Track'}
                    </Button>
                </form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="space-y-8"
                        >
                            {/* Map Visualization */}
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                                <Image
                                    src="/images/tracking-map.png"
                                    alt="Live Tracking Map"
                                    fill
                                    className="object-cover opacity-80"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                {/* Floating Status Card */}
                                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-green-500/20 text-green-500 rounded-full animate-pulse">
                                            <Truck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Current Status</p>
                                            <p className="font-bold text-white">{result.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-white/10 pt-2 mt-2">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                                            <p className="font-bold text-accent">{result.eta}</p>
                                        </div>
                                        <div className="text-xs text-primary font-bold">On Time</div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Package className="h-5 w-5 text-primary" /> Shipment History
                                </h3>
                                <div className="space-y-8 relative pl-2">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-white/10" />

                                    {result.steps.map((step, i) => (
                                        <div key={i} className="flex gap-6 relative">
                                            <div className="z-10 h-10 w-10 flex-shrink-0 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                                {i === 0 ? <Truck className="h-5 w-5 text-primary" /> : <CheckCircle className="h-5 w-5 text-muted-foreground" />}
                                            </div>
                                            <div className="flex-1 pt-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className={`font-bold ${i === 0 ? 'text-white' : 'text-muted-foreground'}`}>{step.status}</h4>
                                                    <span className="text-sm text-muted-foreground">{step.date}</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">{step.location}</p>
                                                <p className="text-xs text-muted-foreground/50">{step.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
