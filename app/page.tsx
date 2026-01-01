import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ProductCard } from "@/components/product-card";
import { TrendingDown, Clock } from "lucide-react";
import { getMockHighlights } from "@/lib/mock-data";

export default function HomePage() {
    const highlights = getMockHighlights();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <TrendingDown className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl md:text-5xl font-bold">Cupom Prime</h1>
                        </div>
                        <p className="text-lg md:text-xl text-muted-foreground mb-8">
                            Compare preços em tempo real. Histórico completo. Análise transparente.
                        </p>
                        <SearchBar placeholder="Buscar produtos (ex: iPhone 15, Galaxy S24...)" autoFocus />
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingDown className="h-6 w-6 text-excellent" />
                        <h2 className="text-2xl md:text-3xl font-bold">Destaques de Hoje</h2>
                    </div>
                    <p className="text-muted-foreground mb-8">
                        Produtos com os melhores preços agora
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highlights.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Products Section */}
            <section className="py-12 md:py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl md:text-3xl font-bold">Monitorados Recentemente</h2>
                    </div>
                    <p className="text-muted-foreground mb-8">
                        Seus últimos produtos visualizados
                    </p>
                    <RecentProducts />
                </div>
            </section>

            <Footer />
        </div>
    );
}

// Client component for recent products (uses localStorage)
function RecentProducts() {
    "use client";

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
                    <div key={i} className="bg-card border rounded-lg overflow-hidden animate-pulse">
                        <div className="aspect-square bg-muted" />
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-muted rounded w-3/4" />
                            <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
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

// Add React import at the top
import * as React from "react";
