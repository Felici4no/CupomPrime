"use client";

import { useState } from "react";
import type { FilterOptions, StoreType, PriceStatus } from "@/types";
import { trackEvent } from "@/lib/analytics";
import { X } from "lucide-react";

interface FiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    onClose?: () => void;
}

const STORES: { value: StoreType; label: string }[] = [
    { value: "AMAZON", label: "Amazon" },
    { value: "MERCADO_LIVRE", label: "Mercado Livre" },
    { value: "MAGALU", label: "Magazine Luiza" },
];

const STATUSES: { value: PriceStatus; label: string }[] = [
    { value: "EXCELLENT", label: "Excelente" },
    { value: "GOOD", label: "Bom" },
    { value: "NEUTRAL", label: "Neutro" },
    { value: "EXPENSIVE", label: "Caro" },
];

export function Filters({ filters, onFiltersChange, onClose }: FiltersProps) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleStoreToggle = (store: StoreType) => {
        const newStores = localFilters.stores.includes(store)
            ? localFilters.stores.filter((s) => s !== store)
            : [...localFilters.stores, store];

        const newFilters = { ...localFilters, stores: newStores };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
        trackEvent("filter_change", { type: "store", value: store });
    };

    const handleStatusToggle = (status: PriceStatus) => {
        const currentStatuses = localFilters.status || [];
        const newStatuses = currentStatuses.includes(status)
            ? currentStatuses.filter((s) => s !== status)
            : [...currentStatuses, status];

        const newFilters = { ...localFilters, status: newStatuses };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
        trackEvent("filter_change", { type: "status", value: status });
    };

    const handleRecentDropToggle = () => {
        const newFilters = { ...localFilters, recentDropOnly: !localFilters.recentDropOnly };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
        trackEvent("filter_change", { type: "recent_drop", value: !localFilters.recentDropOnly });
    };

    const handleClearFilters = () => {
        const newFilters: FilterOptions = {
            stores: [],
            status: [],
            recentDropOnly: false,
        };
        setLocalFilters(newFilters);
        onFiltersChange(newFilters);
        trackEvent("filter_change", { type: "clear" });
    };

    return (
        <div className="bg-card border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filtros</h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleClearFilters}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Limpar
                    </button>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="md:hidden p-1 hover:bg-muted rounded"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {/* Stores */}
                <div>
                    <h4 className="text-sm font-medium mb-3">Lojas</h4>
                    <div className="space-y-2">
                        {STORES.map((store) => (
                            <label
                                key={store.value}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={localFilters.stores.includes(store.value)}
                                    onChange={() => handleStoreToggle(store.value)}
                                    className="rounded border-input text-primary focus:ring-2 focus:ring-ring"
                                />
                                <span className="text-sm">{store.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Status */}
                <div>
                    <h4 className="text-sm font-medium mb-3">Status de Preço</h4>
                    <div className="space-y-2">
                        {STATUSES.map((status) => (
                            <label
                                key={status.value}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={localFilters.status?.includes(status.value) || false}
                                    onChange={() => handleStatusToggle(status.value)}
                                    className="rounded border-input text-primary focus:ring-2 focus:ring-ring"
                                />
                                <span className="text-sm">{status.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Recent Drop */}
                <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={localFilters.recentDropOnly || false}
                            onChange={handleRecentDropToggle}
                            className="rounded border-input text-primary focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-sm">Apenas com queda recente</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
