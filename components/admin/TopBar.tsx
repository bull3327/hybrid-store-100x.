import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminTopBar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">
            {/* Search (Global Admin Search) */}
            <div className="flex w-full max-w-sm items-center gap-2 rounded-md border bg-muted/40 px-3 py-1.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search products, orders, customers..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-primary/10 border flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                </div>
            </div>
        </header>
    );
}
