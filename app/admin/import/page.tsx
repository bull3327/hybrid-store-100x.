import {
    PlusCircle,
    Globe,
    Link as LinkIcon,
    ShoppingCart,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const IMPORT_SOURCES = [
    {
        id: 'zendrop',
        name: 'Zendrop',
        description: '1 Million+ dropshipping products with fast US shipping.',
        icon: Globe,
        color: 'bg-indigo-500',
        type: 'DROPSHIP',
        status: 'Connected'
    },
    {
        id: 'amazon',
        name: 'Amazon Associates',
        description: 'Import any Amazon product via URL. Earn commissions.',
        icon: ShoppingCart,
        color: 'bg-orange-500',
        type: 'AFFILIATE',
        status: 'Active'
    },
    {
        id: 'walmart',
        name: 'Walmart Affiliate',
        description: 'Access millions of Walmart products.',
        icon: LinkIcon,
        color: 'bg-blue-500',
        type: 'AFFILIATE',
        status: 'Connect'
    },
    {
        id: 'manual',
        name: 'Manual Product',
        description: 'Create a custom product from scratch.',
        icon: PlusCircle,
        color: 'bg-emerald-500',
        type: 'BOTH',
        status: 'Always On'
    }
];

export default function AdminImportPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Import Center</h1>
                <p className="text-muted-foreground">
                    Select a source to import products from or paste a URL directly.
                </p>
            </div>

            import {importProduct} from './actions';
            // ... inside the component
            {/* Real Working Import Form */}
            <div className="rounded-xl border bg-card p-8 shadow-sm">
                <div className="mx-auto max-w-2xl text-center space-y-4">
                    <h2 className="text-lg font-semibold">Quick Import via URL</h2>
                    <p className="text-sm text-muted-foreground">
                        Paste a product link from Amazon, Walmart, or AliExpress. We'll auto-detect the source.
                    </p>
                    <form action={importProduct} className="flex gap-2">
                        <input
                            name="url"
                            type="text"
                            required
                            placeholder="https://amazon.com/dp/..."
                            className="flex-1 rounded-md border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <Button type="submit">Import Product</Button>
                    </form>
                </div>
            </div>

            {/* Source Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {IMPORT_SOURCES.map((source) => (
                    <div key={source.id} className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`rounded-lg p-3 text-white ${source.color}`}>
                                <source.icon className="h-6 w-6" />
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${source.type === 'AFFILIATE' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                                {source.type}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold">{source.name}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {source.description}
                        </p>

                        <div className="mt-6">
                            {source.status === 'Connected' || source.status === 'Active' ? (
                                <Button className="w-full group-hover:bg-primary" variant="outline">
                                    Browse Catalog <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button className="w-full" variant="secondary">
                                    Connect Account
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
