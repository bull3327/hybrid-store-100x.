import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Download,
    Tags,
    Settings,
    FolderTree,
    LogOut,
    Mountain
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/import", label: "Import Center", icon: Download },
    { href: "/admin/promotions", label: "Promotions", icon: Tags },
    { href: "/admin/collections", label: "Collections", icon: FolderTree },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
    // In a real client component we use usePathname, but for this static generation 
    // without 'use client' we'll just mock it or assume simple links. 
    // For now let's make it a client component stub or just standard links.

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            {/* Brand */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                    <Mountain className="h-6 w-6" />
                    <span>HybridStore</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="space-y-1">
                    {sidebarLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                                    // "bg-muted text-primary" // Active state would go here based on pathname
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User / Footer */}
            <div className="border-t p-4">
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}
