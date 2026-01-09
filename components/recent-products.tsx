"use client";

import * as React from "react";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./skeletons";

/**
 * Recent Products Component (Client)
 * Usa localStorage para mostrar produtos visualizados recentemente
 */
export function RecentProducts() {
    const [recentIds, setRecentIds] = React.useState<string[]>([]);
    const [products, setProducts] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        import("@/lib/local-storage").then(({ getRecentProducts }) => {
            const ids = getRecentProducts();
            setRecentIds(ids);

            if (ids.length > 0) {
                // Fetch products
                import("@/lib/api").then(({ getProductDetail }) => {
                    Promise.all(ids.slice(0, 6).map((id) => getProductDetail(id)))
                        .then((details) => {
                            setProducts(
                                details.map((d) => ({
                                    id: d.id,
                                    normalized_title: d.normalized_title,
                                    image_url: d.image_url,
                                    brand: d.brand,
                                    price_summary: {
                                        min_price: Math.min(...d.offers.map((o) => o.current_price)),
                                        max_price: Math.max(...d.offers.map((o) => o.current_price)),
                                        currency: "BRL",
                                        last_updated_at: d.last_updated_at,
                                        overall_status: d.offers[0]?.metrics.status || "NEUTRAL",
                                    },
                                }))
                            );
                        })
                        .finally(() => setIsLoading(false));
                });
            } else {
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-gray-600">
                <p>Nenhum produto visualizado recentemente.</p>
                <p className="text-sm mt-2">Use a busca acima para começar a explorar!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
