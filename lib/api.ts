import type {
    SearchResponse,
    ProductDetail,
    AlertRequest,
    AlertResponse,
    RefreshResponse,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Check if API is available
const isApiAvailable = () => {
    return API_BASE_URL && API_BASE_URL !== "";
};

export async function searchProducts(query: string): Promise<SearchResponse> {
    if (!isApiAvailable()) {
        // Return mock data
        const { getMockSearchResults } = await import("@/lib/mock-data");
        return getMockSearchResults(query);
    }

    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error("Falha ao buscar produtos");
    }

    return response.json();
}

export async function getProductDetail(id: string): Promise<ProductDetail> {
    if (!isApiAvailable()) {
        // Return mock data
        const { getMockProductDetail } = await import("@/lib/mock-data");
        return getMockProductDetail(id);
    }

    const response = await fetch(`${API_BASE_URL}/product/${id}`);

    if (!response.ok) {
        throw new Error("Falha ao carregar detalhes do produto");
    }

    return response.json();
}

export async function createAlert(data: AlertRequest): Promise<AlertResponse> {
    if (!isApiAvailable()) {
        // Simulate success
        return { ok: true };
    }

    const response = await fetch(`${API_BASE_URL}/alerts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Falha ao criar alerta");
    }

    return response.json();
}

export async function refreshProduct(id: string): Promise<RefreshResponse> {
    if (!isApiAvailable()) {
        // Simulate success
        return { ok: true, queued: true };
    }

    const response = await fetch(`${API_BASE_URL}/refresh/${id}`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Falha ao atualizar produto");
    }

    return response.json();
}
