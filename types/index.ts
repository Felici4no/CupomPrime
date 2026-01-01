// API Response Types
export type StoreType = "AMAZON" | "MERCADO_LIVRE" | "MAGALU";

export type PriceStatus = "EXCELLENT" | "GOOD" | "NEUTRAL" | "EXPENSIVE";

export interface ProductIdentifiers {
    ean?: string;
    sku?: string;
    gtin?: string;
}

export interface PriceSummary {
    min_price: number;
    max_price: number;
    currency: string;
    last_updated_at: string;
    overall_status: PriceStatus;
}

export interface SearchResult {
    id: string;
    title: string;
    normalized_title: string;
    image_url: string;
    brand?: string;
    identifiers?: ProductIdentifiers;
    price_summary: PriceSummary;
}

export interface SearchResponse {
    query: string;
    results: SearchResult[];
}

export interface PriceMetrics {
    avg_90d: number;
    min_365d: number;
    last_price: number;
    delta_vs_avg_90d_pct: number;
    delta_vs_min_365d_pct: number;
    delta_vs_last_pct: number;
    delta_vs_avg_90d_abs: number;
    delta_vs_min_365d_abs: number;
    delta_vs_last_abs: number;
    status: PriceStatus;
}

export interface ProductOffer {
    store: StoreType;
    store_display_name: string;
    current_price: number;
    currency: string;
    collected_at: string;
    affiliate_url: string;
    metrics: PriceMetrics;
}

export interface PriceHistoryPoint {
    store: StoreType;
    price: number;
    collected_at: string;
}

export interface ProductDetail {
    id: string;
    normalized_title: string;
    image_url: string;
    brand?: string;
    identifiers?: ProductIdentifiers;
    last_updated_at: string;
    offers: ProductOffer[];
    history: PriceHistoryPoint[];
}

export interface AlertRequest {
    product_id: string;
    target_type: "PRICE" | "PCT_BELOW_AVG90";
    target_value: number;
    channel: "EMAIL" | "WHATSAPP";
    destination: string;
}

export interface AlertResponse {
    ok: boolean;
}

export interface RefreshResponse {
    ok: boolean;
    queued: boolean;
}

// UI Types
export interface FilterOptions {
    stores: StoreType[];
    minPrice?: number;
    maxPrice?: number;
    status?: PriceStatus[];
    recentDropOnly?: boolean;
}

export type SortOption = "relevance" | "lowest_price" | "biggest_drop" | "best_status";

export type TimeWindow = "7d" | "30d" | "90d" | "180d" | "365d";
