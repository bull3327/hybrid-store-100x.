import Link from "next/link";
import { Plus, MoreHorizontal, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            images: true,
            variants: true
        }
    });
}

export default async function AdminProductsPage() {
    const products = await getProducts();
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">
                        Manage your dropshipping and affiliate inventory.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                    </Button>
                    <Button size="sm" className="gap-2" asChild>
                        <Link href="/admin/import">
                            <Plus className="h-4 w-4" /> Add Product
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Filters / Toolbar */}
            <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
                <div className="relative flex-1">
                    {/* Placeholder for table search */}
                    <div className="px-3 py-1.5 text-sm text-muted-foreground">Search products...</div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>

            {/* Products Table */}
            <div className="rounded-lg border bg-card shadow-sm">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[80px]">Image</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Title</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Type</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Inventory</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Price</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[50px]"></th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => {
                                const stock = product.variants.reduce((acc, v) => acc + v.inventoryQty, 0);
                                const hasVariants = product.variants.length > 0;

                                return (
                                    <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle">
                                            <div className="h-12 w-12 overflow-hidden rounded-md border bg-muted">
                                                {product.images[0] ? (
                                                    <img src={product.images[0].url} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full bg-secondary flex items-center justify-center text-xs">No Img</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle font-medium">
                                            {product.title}
                                            <div className="text-xs text-muted-foreground font-normal">{product.productType}</div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === 'PUBLISHED'
                                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {product.productType === 'AFFILIATE' ? (
                                                <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800">
                                                    🔗 Affiliate
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-md border border-orange-200 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/50 dark:text-orange-200 dark:border-orange-800">
                                                    📦 Dropship
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle">
                                            {hasVariants ? (
                                                <span className="text-muted-foreground">{stock} in stock</span>
                                            ) : (
                                                <span className="text-muted-foreground italic">No variants</span>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle text-right font-medium">
                                            ${Number(product.price).toFixed(2)}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
