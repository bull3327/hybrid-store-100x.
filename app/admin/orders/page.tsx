import { PrismaClient } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Package, Truck, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { redirect } from 'next/navigation';

import { markAsFulfilled } from './actions';

const prisma = new PrismaClient();

// Revalidate frequently so admin sees new orders
export const revalidate = 0;

async function getOrders() {
    return await prisma.order.findMany({
        where: {
            status: 'PAID' // Only show paid orders
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            images: true
                        }
                    }
                }
            },
            user: true
        }
    });
}

function parseAddress(addressJson: string | null) {
    if (!addressJson) return null;
    try {
        return JSON.parse(addressJson);
    } catch (e) {
        console.error("Failed to parse address", e);
        return null;
    }
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    const unfulfilledCount = orders.filter(o => o.fulfillmentStatus === 'UNFULFILLED').length;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders & Fulfillment</h1>
                    <p className="text-muted-foreground mt-1">
                        {unfulfilledCount} orders waiting to be shipped.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Export CSV</Button>
                    <Button>Refresh</Button>
                </div>
            </div>

            <div className="space-y-6">
                {orders.length === 0 ? (
                    <div className="p-12 border rounded-xl bg-muted/20 text-center">
                        <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No orders yet</h3>
                        <p className="text-muted-foreground">When customers buy, orders will appear here.</p>
                    </div>
                ) : (
                    orders.map((order) => {
                        const address = parseAddress(order.shippingAddress);
                        const isFulfilled = order.fulfillmentStatus === 'FULFILLED';

                        return (
                            <div key={order.id} className={`border rounded-xl overflow-hidden bg-card transition-all ${!isFulfilled ? 'border-primary/50 shadow-md' : 'opacity-80'}`}>
                                {/* Order Header */}
                                <div className="bg-muted/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isFulfilled ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                            {isFulfilled ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <div className="font-semibold flex items-center gap-2">
                                                Order #{order.id.slice(-6).toUpperCase()}
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${isFulfilled ? 'bg-green-50 border-green-200 text-green-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                                                    {order.fulfillmentStatus}
                                                </span>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">${Number(order.amountTotal).toFixed(2)}</div>
                                        <div className="text-xs text-muted-foreground uppercase">{order.paymentStatus} via Stripe</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                                    {/* Column 1: Customer */}
                                    <div className="p-6 text-sm">
                                        <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Customer
                                        </h4>
                                        <div className="space-y-1">
                                            <p className="font-medium text-base">{address?.name || 'Guest'}</p>
                                            <p>{address?.line1}</p>
                                            {address?.line2 && <p>{address.line2}</p>}
                                            <p>{address?.city}, {address?.state} {address?.postal_code}</p>
                                            <p>{address?.country}</p>
                                            <p className="mt-2 text-muted-foreground">{order.guestEmail || order.user?.email}</p>
                                        </div>
                                    </div>

                                    {/* Column 2: Items */}
                                    <div className="p-6 md:col-span-2">
                                        <h4 className="font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Items to Ship
                                        </h4>
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-start gap-4 p-3 rounded-lg border bg-background/50">
                                                    {/* Product Image */}
                                                    <div className="h-16 w-16 bg-muted rounded-md overflow-hidden relative flex-shrink-0">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img src={item.product?.images?.[0]?.url || '/placeholder.png'} alt={item.product.title} className="object-cover h-full w-full" />
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-sm line-clamp-1">{item.product.title}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>

                                                        {/* Supplier Link (High IQ Feature) */}
                                                        <div className="mt-3 flex gap-2">
                                                            {item.product.sourceUrl ? (
                                                                <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5" asChild>
                                                                    <a href={item.product.sourceUrl} target="_blank" rel="noopener noreferrer">
                                                                        <ExternalLink className="h-3 w-3" />
                                                                        Order from Supplier
                                                                    </a>
                                                                </Button>
                                                            ) : (
                                                                <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                                                                    No Supplier Link Linked
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="font-medium text-sm">${Number(item.price).toFixed(2)}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Cost: ${item.product.costPrice ? Number(item.product.costPrice).toFixed(2) : '?'}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Order Actions */}
                                        {!isFulfilled && (
                                            <div className="mt-6 pt-4 border-t flex justify-end gap-3">
                                                <form action={async () => {
                                                    'use server'
                                                    await markAsFulfilled(order.id);
                                                }}>
                                                    <Button type="submit" size="sm">
                                                        Mark as Fulfilled
                                                    </Button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
