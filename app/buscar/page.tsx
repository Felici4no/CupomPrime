"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/lib/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ProductCard } from "@/components/product-card";
import { Filters } from "@/components/filters";
import { SortSelect } from "@/components/sort-select";
import { ProductCardSkeleton } from "@/components/skeletons";
import { ErrorState } from "@/components/error-state";
import type { FilterOptions, SortOption, SearchResult } from "@/types";
import { trackEvent } from "@/lib/analytics";
import { Filter, X } from "lucide-react";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [filters, setFilters] = useState<FilterOptions>({
        stores: [],
        status: [],
        recentDropOnly: false,
    });
    const [sortBy, setSortBy] = useState<SortOption>("relevance");
    const [showFilters, setShowFilters] = useState(false);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["search", query],
        queryFn: () => searchProducts(query),
        enabled: !!query,
    });

    useEffect(() => {
        if (query) {
            trackEvent("search", { query });
        }
    }, [query]);

    // Apply filters and sorting
    const filteredResults = data?.results.filter((product) => {
        // Filter by stores
        if (filters.stores.length > 0) {
            // In a real app, we'd check if product has offers from selected stores
            // For now, we'll just show all products
        }

        // Filter by status
        if (filters.status && filters.status.length > 0) {
            if (!filters.status.includes(product.price_summary.overall_status)) {
                return false;
            }
        }

        // Filter by recent drop
        if (filters.recentDropOnly) {
            // In a real app, we'd check if there was a recent price drop
            // For now, we'll show products with EXCELLENT or GOOD status
            if (!["EXCELLENT", "GOOD"].includes(product.price_summary.overall_status)) {
                return false;
            }
        }

        return true;
    }) || [];

    // Sort results
    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case "lowest_price":
                return a.price_summary.min_price - b.price_summary.min_price;
            case "biggest_drop":
                // Mock: prioritize EXCELLENT status
                const statusOrder = { EXCELLENT: 0, GOOD: 1, NEUTRAL: 2, EXPENSIVE: 3 };
                return statusOrder[a.price_summary.overall_status] - statusOrder[b.price_summary.overall_status];
            case "best_status":
                return statusOrder[a.price_summary.overall_status] - statusOrder[b.price_summary.overall_status];
            default:
                return 0; // relevance (keep original order)
        }
    });

    if (!query) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold mb-4">Buscar Produtos</h1>
                        <p className="text-muted-foreground mb-6">
                            Digite o nome do produto que você procura
                        </p>
                        <SearchBar autoFocus />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <SearchBar defaultValue={query} />
                    </div>

                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">
                                Resultados para "{query}"
                            </h1>
                            {!isLoading && (
                                <p className="text-muted-foreground">
                                    {sortedResults.length} {sortedResults.length === 1 ? "produto encontrado" : "produtos encontrados"}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <SortSelect value={sortBy} onChange={setSortBy} />
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                            >
                                <Filter className="h-4 w-4" />
                                Filtros
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Filters Sidebar */}
                        <aside className={`${showFilters ? "block" : "hidden"} md:block`}>
                            <Filters
                                filters={filters}
                                onFiltersChange={setFilters}
                                onClose={() => setShowFilters(false)}
                            />
                        </aside>

                        {/* Results Grid */}
                        <div className="md:col-span-3">
                            {isLoading && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <ProductCardSkeleton key={i} />
                                    ))}
                                </div>
                            )}

                            {error && (
                                <ErrorState
                                    title="Erro ao buscar produtos"
                                    message="Não foi possível carregar os resultados. Tente novamente."
                                    retry={() => refetch()}
                                />
                            )}

                            {!isLoading && !error && sortedResults.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-lg font-medium mb-2">Nenhum produto encontrado</p>
                                    <p className="text-muted-foreground">
                                        Tente buscar com outros termos ou ajuste os filtros
                                    </p>
                                </div>
                            )}

                            {!isLoading && !error && sortedResults.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sortedResults.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Mobile Filters Modal Overlay */}
            {showFilters && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setShowFilters(false)}
                />
            )}
        </div>
    );
}

const statusOrder: Record<string, number> = { EXCELLENT: 0, GOOD: 1, NEUTRAL: 2, EXPENSIVE: 3 };
