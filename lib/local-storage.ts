export function addRecentProduct(productId: string) {
    if (typeof window === "undefined") return;

    try {
        const recent = getRecentProducts();
        const filtered = recent.filter((id) => id !== productId);
        const updated = [productId, ...filtered].slice(0, 10);
        localStorage.setItem("cupomprime_recent", JSON.stringify(updated));
    } catch (error) {
        console.error("Error saving recent product:", error);
    }
}

export function getRecentProducts(): string[] {
    if (typeof window === "undefined") return [];

    try {
        const stored = localStorage.getItem("cupomprime_recent");
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error reading recent products:", error);
        return [];
    }
}

export function clearRecentProducts() {
    if (typeof window === "undefined") return;

    try {
        localStorage.removeItem("cupomprime_recent");
    } catch (error) {
        console.error("Error clearing recent products:", error);
    }
}
