import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { StatusPill } from "./status-pill";
import { Card } from "./ui/card";
import type { SearchResult } from "@/types";

interface ProductCardProps {
    product: SearchResult;
}

/**
 * Card de resultado de busca
 * Visual "Puro Suco Indie": borda sketch, sem sombras, sem transições fancy
 */
export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/produto/${product.id}`}
            className="group block"
        >
            <Card className="hover:opacity-90 transition-opacity">
                <div className="aspect-square relative bg-gray-100 mb-4">
                    <Image
                        src={product.image_url}
                        alt={product.normalized_title}
                        fill
                        className="object-cover"
                    />
                </div>

                <h3 className="font-semibold line-clamp-2 mb-2 text-gray-900">
                    {product.normalized_title}
                </h3>

                {product.brand && (
                    <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                )}

                <div className="flex items-center justify-between mb-2">
                    <div>
                        <p className="text-xs text-gray-600 mb-1">A partir de</p>
                        <p className="text-xl font-bold font-mono tabular-nums">
                            {formatCurrency(product.price_summary.min_price)}
                        </p>
                    </div>
                    <StatusPill status={product.price_summary.overall_status} />
                </div>

                {product.price_summary.max_price > product.price_summary.min_price && (
                    <p className="text-xs text-gray-600">
                        até {formatCurrency(product.price_summary.max_price)}
                    </p>
                )}
            </Card>
        </Link>
    );
}

