"use client";

import { Search } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    defaultValue?: string;
    placeholder?: string;
    autoFocus?: boolean;
}

export function SearchBar({
    defaultValue = "",
    placeholder = "Buscar produtos...",
    autoFocus = false
}: SearchBarProps) {
    const [query, setQuery] = useState(defaultValue);
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
            </div>
        </form>
    );
}
