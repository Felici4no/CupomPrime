"use client";

import type { SortOption } from "@/types";
import { trackEvent } from "@/lib/analytics";
import { ArrowUpDown } from "lucide-react";

interface SortSelectProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "relevance", label: "Relevância" },
    { value: "lowest_price", label: "Menor Preço" },
    { value: "biggest_drop", label: "Maior Queda" },
    { value: "best_status", label: "Melhor Status" },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
    const handleChange = (newValue: SortOption) => {
        onChange(newValue);
        trackEvent("sort_change", { value: newValue });
    };

    return (
        <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <select
                value={value}
                onChange={(e) => handleChange(e.target.value as SortOption)}
                className="bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
