'use client'

import { useState } from 'react';
import { Radar, RefreshCw, Trash2, TrendingUp, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { deleteDeadProducts } from './actions';
import { useRouter } from 'next/navigation';

// MOCK "LIVE" FEED (In real life, this fetches from your Python scraper/RapidAPI)
const TRENDING_OPPORTUNITIES = [
    {
        id: 't1',
        title: 'Portable Neck Fan 3.0',
        platform: 'Amazon Movers & Shakers',
        growth: '+400%',
        url: 'https://www.amazon.com/dp/B08XJ2K3M5',
        image: 'https://m.media-amazon.com/images/I/71c3O0rWn+L._AC_SL1500_.jpg'
    },
    {
        id: 't2',
        title: 'Galaxy Moon Lamp (Viral)',
        platform: 'TikTok Creative Center',
        growth: '+850%',
        url: 'https://shopee.com/galaxy-lamp-fake', // Example
        image: 'https://m.media-amazon.com/images/I/71N1Rk+oCJL._AC_SL1500_.jpg'
    },
    {
        id: 't3',
        title: 'Zero-Gravity Chair',
        platform: 'Google Trends: "Furniture"',
        growth: '+120%',
        url: 'https://www.amazon.com/dp/B07F3S7S2V',
        image: 'https://m.media-amazon.com/images/I/81x+r2s-ZLL._AC_SL1500_.jpg'
    }
];

export default function CopilotPage() {
    const [loading, setLoading] = useState(false);
    const [purgeLoading, setPurgeLoading] = useState(false);
    const router = useRouter();

    const handleImport = async (url: string) => {
        setLoading(true);
        // Reuse our smart Import API
        try {
            const res = await fetch('/api/products/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/admin/products/${data.productId}`);
            }
        } catch (e) {
            alert("Auto-import failed.");
        } finally {
            setLoading(false);
        }
    };

    const handlePurge = async () => {
        if (!confirm("Are you sure? This will delete all OLD Draft products.")) return;
        setPurgeLoading(true);
        try {
            const count = await deleteDeadProducts();
            alert(`Purged ${count} dead products.`);
        } finally {
            setPurgeLoading(false);
        }
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">

            {/* HERDER HEADER */}
            <div>
                <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                    <Radar className="h-10 w-10 text-primary" />
                    Store Copilot
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">BETA</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    AI-driven insights to automate growth and maintenance.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. THE HUNTER (Trending Feed) */}
                <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
                    <div className="p-6 border-b bg-gradient-to-r from-blue-500/10 to-transparent">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                            Trend Hunter
                        </h2>
                        <p className="text-sm text-muted-foreground">Top movers detected in your niche (Updated: 1h ago)</p>
                    </div>
                    <div className="divide-y">
                        {TRENDING_OPPORTUNITIES.map((item) => (
                            <div key={item.id} className="p-5 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.title} className="h-16 w-16 rounded-lg object-cover bg-muted" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold truncate">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        <span className="text-green-600 bg-green-50 px-1.5 rounded font-mono">{item.growth}</span>
                                        <span>• {item.platform}</span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => handleImport(item.url)}
                                    disabled={loading}
                                    className="gap-2"
                                >
                                    {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <ExternalLink className="h-3 w-3" />}
                                    Launch
                                </Button>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t bg-muted/20 text-center">
                        <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
                            <RefreshCw className="h-3 w-3 mr-2" /> Refresh Feed (API)
                        </Button>
                    </div>
                </div>

                {/* 2. THE REAPER (Maintenance) */}
                <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
                    <div className="p-6 border-b bg-gradient-to-r from-red-500/10 to-transparent">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-red-500" />
                            The Reaper
                        </h2>
                        <p className="text-sm text-muted-foreground">Cleanup underperforming & stale inventory.</p>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="bg-muted/30 rounded-xl p-4 border flex items-center justify-between">
                            <div>
                                <div className="font-medium">Stale Drafts</div>
                                <div className="text-xs text-muted-foreground">Drafts created {'>'} 7 days ago</div>
                            </div>
                            <div className="font-mono font-bold text-lg">--</div> {/* Need DB count here ideally */}
                        </div>

                        <div className="bg-muted/30 rounded-xl p-4 border flex items-center justify-between">
                            <div>
                                <div className="font-medium">Zero-Traffic Zombies</div>
                                <div className="text-xs text-muted-foreground">Published {'>'} 30 days, 0 views</div>
                            </div>
                            <div className="font-mono font-bold text-lg">0</div>
                        </div>

                        <div className="pt-4">
                            <Button
                                variant="destructive"
                                className="w-full h-12 text-base shadow-red-500/20 shadow-lg"
                                onClick={handlePurge}
                                disabled={purgeLoading}
                            >
                                {purgeLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                ) : (
                                    <Trash2 className="h-5 w-5 mr-2" />
                                )}
                                Auto-Purge Dead Inventory
                            </Button>
                            <p className="text-center text-xs text-muted-foreground mt-3">
                                Analyzes sales velocity & traffic before deletion.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
