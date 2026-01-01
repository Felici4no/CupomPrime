import { ExternalLink, Clock } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusPill } from "./status-pill";
import { PriceDeltaBadge } from "./price-delta-badge";
import type { ProductOffer } from "@/types";
import { trackEvent } from "@/lib/analytics";

interface OfferCardProps {
    offer: ProductOffer;
    productId: string;
}

export function OfferCard({ offer, productId }: OfferCardProps) {
    const handleAffiliateClick = () => {
        trackEvent("click_affiliate", {
            product_id: productId,
            store: offer.store,
            price: offer.current_price,
        });
    };

    return (
        <div className="bg-card border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-lg mb-1">{offer.store_display_name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Coletado em {formatDateTime(offer.collected_at)}</span>
                    </div>
                </div>
                <StatusPill status={offer.metrics.status} />
            </div>

            <div className="mb-4">
                <p className="text-3xl font-bold">{formatCurrency(offer.current_price)}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <PriceDeltaBadge
                    percentChange={offer.metrics.delta_vs_avg_90d_pct}
                    absoluteChange={offer.metrics.delta_vs_avg_90d_abs}
                    label="vs Média 90d"
                    showAbsolute={false}
                />
                <PriceDeltaBadge
                    percentChange={offer.metrics.delta_vs_min_365d_pct}
                    absoluteChange={offer.metrics.delta_vs_min_365d_abs}
                    label="vs Menor"
                    showAbsolute={false}
                />
                <PriceDeltaBadge
                    percentChange={offer.metrics.delta_vs_last_pct}
                    absoluteChange={offer.metrics.delta_vs_last_abs}
                    label="vs Última"
                    showAbsolute={false}
                />
            </div>

            <a
                href={offer.affiliate_url}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                onClick={handleAffiliateClick}
                className="inline-flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
                Comprar
                <ExternalLink className="h-4 w-4" />
            </a>
        </div>
    );
}
