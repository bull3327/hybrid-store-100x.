import {
    Users,
    DollarSign,
    MousePointerClick,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <div className="text-sm text-muted-foreground">
                    Last updated: Just now
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Revenue */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">$4,231.89</div>
                        <span className="text-xs font-medium text-green-600 flex items-center">
                            +20.1% <ArrowUpRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>

                {/* Affiliate Commissions */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground">Affiliate Commissions</p>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">$642.00</div>
                        <span className="text-xs font-medium text-green-600 flex items-center">
                            +12.5% <ArrowUpRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>

                {/* Clicks (Traffic) */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground">Outbound Clicks</p>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">+12,234</div>
                        <span className="text-xs font-medium text-muted-foreground flex items-center">
                            +0.0%
                        </span>
                    </div>
                </div>

                {/* Active Users */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <div className="text-2xl font-bold">573</div>
                        <span className="text-xs font-medium text-green-600 flex items-center">
                            +201 <ArrowUpRight className="h-3 w-3" />
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart Placeholder */}
                <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Revenue Overview</h3>
                    <div className="h-[300px] w-full bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground">
                        [Chart Component Placeholder]
                    </div>
                </div>

                {/* Recent Sales/Activity */}
                <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">SALE</div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">New Order #1024</p>
                                <p className="text-xs text-muted-foreground">Minimalist Vase Set</p>
                            </div>
                            <div className="text-sm font-medium">+$49.99</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">CLICK</div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">Amazon Click-through</p>
                                <p className="text-xs text-muted-foreground">Bamboo Sheets</p>
                            </div>
                            <div className="text-sm text-muted-foreground">Just now</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">SALE</div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">New Order #1023</p>
                                <p className="text-xs text-muted-foreground">Essential Oil Diffuser</p>
                            </div>
                            <div className="text-sm font-medium">+$35.50</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
