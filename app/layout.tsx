import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/app/globals.css";
import { cn, getBaseUrl } from "@/lib/utils";

const fontSans = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    // ...
    metadataBase: new URL(getBaseUrl()),
    title: {
        default: "HybridStore | Next Gen Lifestyle",
        template: "%s | HybridStore"
    },
    description: "Discover the future of living with our curated collection of smart gadgets, home decor, and wellness essentials.",
    openGraph: {
        title: "HybridStore | Next Gen Lifestyle",
        description: "Discover the future of living with our curated collection of smart gadgets, home decor, and wellness essentials.",
        url: 'https://hybrid-store-demo.vercel.app',
        siteName: 'HybridStore',
        images: [
            {
                url: '/images/products/projector.png', // Ideally a dedicated OG image
                width: 1200,
                height: 630,
                alt: 'HybridStore Preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "HybridStore | Next Gen Lifestyle",
        description: "Curated smart gadgets and premium essentials.",
        images: ['/images/products/projector.png'],
    },
};

import { CartProvider } from "@/lib/cart-context";
import { CartDrawer } from "@/components/storefront/CartDrawer";

// ...

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <CartProvider>
                    {children}
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    );
}
