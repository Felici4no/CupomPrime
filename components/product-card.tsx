import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { StatusPill } from "./status-pill";
import type { SearchResult } from "@/types";

interface ProductCardProps {
    product: SearchResult;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/produto/${product.id}`}
            className="group block bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all"
        >
            <div className="aspect-square relative bg-muted">
                <Image
                    src={product.image_url}
                    alt={product.normalized_title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {product.normalized_title}
                </h3>

                {product.brand && (
                    <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                )}

                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-xs text-muted-foreground">A partir de</p>
                        <p className="text-xl font-bold">
                            {formatCurrency(product.price_summary.min_price)}
                        </p>
                    </div>
                    <StatusPill status={product.price_summary.overall_status} />
                </div>

                {product.price_summary.max_price > product.price_summary.min_price && (
                    <p className="text-xs text-muted-foreground">
                        até {formatCurrency(product.price_summary.max_price)}
                    </p>
                )}
            </div>
        </Link>
    );
}
