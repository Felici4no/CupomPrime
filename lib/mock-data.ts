import type { SearchResponse, ProductDetail } from "@/types";

export function getMockSearchResults(query: string): SearchResponse {
    return {
        query,
        results: [
            {
                id: "prod_iphone15",
                title: "Apple iPhone 15 128GB Preto",
                normalized_title: "Apple iPhone 15 128GB",
                image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
                brand: "Apple",
                identifiers: {
                    ean: "0195949038488",
                },
                price_summary: {
                    min_price: 4299.00,
                    max_price: 4899.00,
                    currency: "BRL",
                    last_updated_at: "2026-01-01T01:30:00-03:00",
                    overall_status: "GOOD",
                },
            },
            {
                id: "prod_galaxy_s24",
                title: "Samsung Galaxy S24 256GB Violeta",
                normalized_title: "Samsung Galaxy S24 256GB",
                image_url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
                brand: "Samsung",
                identifiers: {
                    ean: "8806095258",
                },
                price_summary: {
                    min_price: 3799.00,
                    max_price: 4299.00,
                    currency: "BRL",
                    last_updated_at: "2026-01-01T00:45:00-03:00",
                    overall_status: "EXCELLENT",
                },
            },
            {
                id: "prod_airpods_pro",
                title: "Apple AirPods Pro 2ª Geração",
                normalized_title: "Apple AirPods Pro 2ª Geração",
                image_url: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
                brand: "Apple",
                identifiers: {
                    ean: "0194253398905",
                },
                price_summary: {
                    min_price: 1899.00,
                    max_price: 2199.00,
                    currency: "BRL",
                    last_updated_at: "2026-01-01T02:00:00-03:00",
                    overall_status: "NEUTRAL",
                },
            },
        ],
    };
}

export function getMockProductDetail(id: string): ProductDetail {
    const baseDate = new Date("2026-01-01T02:00:00-03:00");

    // Generate history for the last 90 days
    const history = [];
    for (let i = 90; i >= 0; i--) {
        const date = new Date(baseDate);
        date.setDate(date.getDate() - i);

        // Simulate price variations for each store
        const stores = ["AMAZON", "MERCADO_LIVRE", "MAGALU"] as const;
        stores.forEach((store) => {
            const basePrice = store === "AMAZON" ? 4299 : store === "MERCADO_LIVRE" ? 4499 : 4599;
            const variation = Math.sin(i / 10) * 200 + Math.random() * 100;
            history.push({
                store,
                price: Math.round((basePrice + variation) * 100) / 100,
                collected_at: date.toISOString(),
            });
        });
    }

    return {
        id,
        normalized_title: "Apple iPhone 15 128GB",
        image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
        brand: "Apple",
        identifiers: {
            ean: "0195949038488",
            sku: "IPHONE15-128-BLK",
        },
        last_updated_at: baseDate.toISOString(),
        offers: [
            {
                store: "AMAZON",
                store_display_name: "Amazon",
                current_price: 4299.00,
                currency: "BRL",
                collected_at: baseDate.toISOString(),
                affiliate_url: "https://amazon.com.br/...",
                metrics: {
                    avg_90d: 4600.00,
                    min_365d: 3999.00,
                    last_price: 4499.00,
                    delta_vs_avg_90d_pct: -6.54,
                    delta_vs_min_365d_pct: 7.50,
                    delta_vs_last_pct: -4.44,
                    delta_vs_avg_90d_abs: -301.00,
                    delta_vs_min_365d_abs: 300.00,
                    delta_vs_last_abs: -200.00,
                    status: "GOOD",
                },
            },
            {
                store: "MERCADO_LIVRE",
                store_display_name: "Mercado Livre",
                current_price: 4499.00,
                currency: "BRL",
                collected_at: baseDate.toISOString(),
                affiliate_url: "https://mercadolivre.com.br/...",
                metrics: {
                    avg_90d: 4650.00,
                    min_365d: 4199.00,
                    last_price: 4599.00,
                    delta_vs_avg_90d_pct: -3.25,
                    delta_vs_min_365d_pct: 7.14,
                    delta_vs_last_pct: -2.17,
                    delta_vs_avg_90d_abs: -151.00,
                    delta_vs_min_365d_abs: 300.00,
                    delta_vs_last_abs: -100.00,
                    status: "NEUTRAL",
                },
            },
            {
                store: "MAGALU",
                store_display_name: "Magazine Luiza",
                current_price: 4899.00,
                currency: "BRL",
                collected_at: baseDate.toISOString(),
                affiliate_url: "https://magazineluiza.com.br/...",
                metrics: {
                    avg_90d: 4750.00,
                    min_365d: 4299.00,
                    last_price: 4799.00,
                    delta_vs_avg_90d_pct: 3.14,
                    delta_vs_min_365d_pct: 13.96,
                    delta_vs_last_pct: 2.08,
                    delta_vs_avg_90d_abs: 149.00,
                    delta_vs_min_365d_abs: 600.00,
                    delta_vs_last_abs: 100.00,
                    status: "EXPENSIVE",
                },
            },
        ],
        history,
    };
}

export function getMockHighlights() {
    return [
        {
            id: "prod_galaxy_s24",
            title: "Samsung Galaxy S24 256GB",
            normalized_title: "Samsung Galaxy S24 256GB",
            image_url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
            brand: "Samsung",
            price_summary: {
                min_price: 3799.00,
                max_price: 4299.00,
                currency: "BRL",
                last_updated_at: "2026-01-01T00:45:00-03:00",
                overall_status: "EXCELLENT" as const,
            },
        },
        {
            id: "prod_airpods_pro",
            title: "Apple AirPods Pro 2ª Geração",
            normalized_title: "Apple AirPods Pro 2ª Geração",
            image_url: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop",
            brand: "Apple",
            price_summary: {
                min_price: 1899.00,
                max_price: 2199.00,
                currency: "BRL",
                last_updated_at: "2026-01-01T02:00:00-03:00",
                overall_status: "GOOD" as const,
            },
        },
        {
            id: "prod_watch_ultra",
            title: "Apple Watch Ultra 2",
            normalized_title: "Apple Watch Ultra 2",
            image_url: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
            brand: "Apple",
            price_summary: {
                min_price: 7999.00,
                max_price: 8499.00,
                currency: "BRL",
                last_updated_at: "2026-01-01T01:15:00-03:00",
                overall_status: "EXCELLENT" as const,
            },
        },
    ];
}

export function getMockSimilarProducts(productId: string) {
    return [
        {
            id: "prod_iphone15_pro",
            title: "Apple iPhone 15 Pro 256GB",
            normalized_title: "Apple iPhone 15 Pro 256GB",
            image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
            brand: "Apple",
            price_summary: {
                min_price: 6999.00,
                max_price: 7499.00,
                currency: "BRL",
                last_updated_at: "2026-01-01T01:45:00-03:00",
                overall_status: "NEUTRAL" as const,
            },
        },
        {
            id: "prod_iphone14",
            title: "Apple iPhone 14 128GB",
            normalized_title: "Apple iPhone 14 128GB",
            image_url: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400&h=400&fit=crop",
            brand: "Apple",
            price_summary: {
                min_price: 3499.00,
                max_price: 3999.00,
                currency: "BRL",
                last_updated_at: "2026-01-01T00:30:00-03:00",
                overall_status: "GOOD" as const,
            },
        },
        {
            id: "prod_galaxy_s24_plus",
            title: "Samsung Galaxy S24+ 512GB",
            normalized_title: "Samsung Galaxy S24+ 512GB",
            image_url: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
            brand: "Samsung",
            price_summary: {
                min_price: 5299.00,
                max_price: 5799.00,
                currency: "BRL",
                last_updated_at: "2026-01-01T01:00:00-03:00",
                overall_status: "EXCELLENT" as const,
            },
        },
    ];
}
