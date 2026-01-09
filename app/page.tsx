import * as React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SearchBar } from "@/components/search-bar";
import { ProductCard } from "@/components/product-card";
import { RecentProducts } from "@/components/recent-products";
import { SketchDivider } from "@/components/ui/sketch-divider";
import { TrendingDown, Clock } from "lucide-react";
import { getMockHighlights } from "@/lib/mock-data";

/**
 * Home Page
 * Visual "Puro Suco Indie": branco sólido, sem gradientes, foco no conteúdo
 */
export default function HomePage() {
    const highlights = getMockHighlights();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <TrendingDown className="h-8 w-8 text-gray-900" />
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Cupom Prime</h1>
                        </div>
                        <p className="text-lg md:text-xl text-gray-600 mb-8">
                            Compare preços em tempo real. Histórico completo. Análise transparente.
                        </p>
                        <SearchBar placeholder="Buscar produtos (ex: iPhone 15, Galaxy S24...)" autoFocus />
                    </div>
                </div>
            </section>

            <SketchDivider />

            {/* Highlights Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingDown className="h-6 w-6 text-excellent" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Destaques de Hoje</h2>
                    </div>
                    <p className="text-gray-600 mb-8">
                        Produtos com os melhores preços agora
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highlights.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <SketchDivider />

            {/* Recent Products Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <Clock className="h-6 w-6 text-gray-900" />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Monitorados Recentemente</h2>
                    </div>
                    <p className="text-gray-600 mb-8">
                        Seus últimos produtos visualizados
                    </p>
                    <RecentProducts />
                </div>
            </section>

            <Footer />
        </div>
    );
}

