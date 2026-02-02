import { PrismaClient } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash } from 'lucide-react';

const prisma = new PrismaClient();

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: params.id },
        include: { images: true }
    });

    if (!product) {
        return <div>Product not found</div>;
    }

    async function updateProduct(formData: FormData) {
        'use server'
        const title = formData.get('title') as string;
        const price = formData.get('price');
        const description = formData.get('description') as string;
        const status = formData.get('status') as string;
        const imageUrl = formData.get('imageUrl') as string;
        const affiliateUrl = formData.get('affiliateUrl') as string;

        await prisma.product.update({
            where: { id: params.id },
            data: {
                title,
                price: Number(price),
                description,
                status,
                affiliateUrl: affiliateUrl || null,
                images: {
                    deleteMany: {},
                    create: { url: imageUrl }
                }
            }
        });

        redirect('/admin/products');
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 hover:bg-muted rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold">Edit Product</h1>
            </div>

            <form action={updateProduct} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {/* Main Info */}
                    <div className="p-6 border rounded-xl bg-card space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Product Title</label>
                            <input name="title" defaultValue={product.title} className="w-full p-2 border rounded-md bg-background" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea name="description" rows={5} defaultValue={product.description} className="w-full p-2 border rounded-md bg-background" />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="p-6 border rounded-xl bg-card space-y-4">
                        <h3 className="font-semibold">Media</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Main Image URL</label>
                            <input name="imageUrl" defaultValue={product.images[0]?.url} className="w-full p-2 border rounded-md bg-background" />
                        </div>
                        {product.images[0]?.url && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={product.images[0].url} alt="Preview" className="h-40 w-40 object-cover rounded-md border" />
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Status & Price */}
                    <div className="p-6 border rounded-xl bg-card space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select name="status" defaultValue={product.status} className="w-full p-2 border rounded-md bg-background">
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price ($)</label>
                            <input name="price" type="number" step="0.01" defaultValue={Number(product.price)} className="w-full p-2 border rounded-md bg-background" />
                        </div>
                    </div>

                    {/* Source Info */}
                    <div className="p-6 border rounded-xl bg-card space-y-4">
                        <h3 className="font-semibold">Sourcing</h3>
                        <div className="bg-muted p-3 rounded-md text-sm mb-2">
                            <span className="font-bold">{product.sourceplatform}</span> Product
                        </div>
                        {product.productType === 'AFFILIATE' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Affiliate Link</label>
                                <input name="affiliateUrl" defaultValue={product.affiliateUrl || ''} className="w-full p-2 border rounded-md bg-background" />
                            </div>
                        )}
                        <div className="pt-4">
                            <Button type="submit" className="w-full gap-2">
                                <Save className="h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
