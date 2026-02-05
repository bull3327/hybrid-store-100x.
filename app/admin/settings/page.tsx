'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
    const [email, setEmail] = useState('hybridstorejack@gmail.com');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        alert('Settings Saved');
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your store preferences.</p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                <form onSubmit={handleSave} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Store Contact Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                            This email will be used for customer notifications and invoices.
                        </p>
                    </div>

                    <Button type="submit">Save Changes</Button>
                </form>
            </div>
        </div>
    );
}
