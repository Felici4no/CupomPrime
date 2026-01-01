"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/lib/api";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { OfferCard } from "@/components/offer-card";
import { PriceHistoryChart } from "@/components/price-history-chart";
import { AlertForm } from "@/components/alert-form";
import { ProductCard } from "@/components/product-card";
import { OfferCardSkeleton, ChartSkeleton } from "@/components/skeletons";
import { ErrorState } from "@/components/error-state";
import { formatDateTime, getStatusLabel } from "@/lib/utils";
import { getMockSimilarProducts } from "@/lib/mock-data";
import { trackEvent } from "@/lib/analytics";
import { addRecentProduct } from "@/lib/local-storage";
import Image from "next/image";
import { Package, Info } from "lucide-react";

export default function ProductPage({ params }: { params: { id: string } }) {
    const { id } = params;

    const { data: product, isLoading, error, refetch } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductDetail(id),
    });

    useEffect(() => {
        if (product) {
            trackEvent("view_product", {
                product_id: product.id,
                product_name: product.normalized_title,
            });
            addRecentProduct(product.id);
        }
    }, [product]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="aspect-square bg-muted rounded-lg animate-pulse" />
                        <div className="space-y-4">
                            <div className="h-8 bg-muted rounded w-3/4 animate-pulse" />
                            <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                            <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[1, 2, 3].map((i) => (
                            <OfferCardSkeleton key={i} />
                        ))}
                    </div>
                    <ChartSkeleton />
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center p-4">
                    <ErrorState
                        title="Produto não encontrado"
                        message="Não foi possível carregar os detalhes do produto."
                        retry={() => refetch()}
                    />
                </div>
                <Footer />
            </div>
        );
    }

    const similarProducts = getMockSimilarProducts(product.id);

    // Calculate overall status based on offers
    const bestOffer = product.offers.reduce((best, offer) => {
        const statusOrder = { EXCELLENT: 0, GOOD: 1, NEUTRAL: 2, EXPENSIVE: 3 };
        return statusOrder[offer.metrics.status] < statusOrder[best.metrics.status] ? offer : best;
    });

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                            <Image
                                src={product.image_url}
                                alt={product.normalized_title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {product.normalized_title}
                            </h1>

                            {product.brand && (
                                <p className="text-lg text-muted-foreground mb-2">
                                    Marca: {product.brand}
                                </p>
                            )}

                            {product.identifiers?.ean && (
                                <p className="text-sm text-muted-foreground mb-2">
                                    EAN: {product.identifiers.ean}
                                </p>
                            )}

                            {product.identifiers?.sku && (
                                <p className="text-sm text-muted-foreground mb-4">
                                    SKU: {product.identifiers.sku}
                                </p>
                            )}

                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Package className="h-4 w-4" />
                                <span>Última atualização: {formatDateTime(product.last_updated_at)}</span>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-4">
                                <h3 className="font-semibold mb-2">Status Geral</h3>
                                <p className="text-2xl font-bold">
                                    {getStatusLabel(bestOffer.metrics.status)}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    Baseado na análise de {product.offers.length} {product.offers.length === 1 ? "loja" : "lojas"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Offers Section */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Preço Agora</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {product.offers.map((offer) => (
                                <OfferCard key={offer.store} offer={offer} productId={product.id} />
                            ))}
                        </div>
                    </section>

                    {/* History Chart */}
                    <section className="mb-12">
                        <PriceHistoryChart history={product.history} />
                    </section>

                    {/* Analysis Section */}
                    <section className="mb-12">
                        <div className="bg-card border rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Info className="h-5 w-5 text-primary" />
                                <h2 className="text-2xl font-bold">Análise</h2>
                            </div>

                            <div className="prose prose-sm max-w-none">
                                <p className="text-muted-foreground mb-4">
                                    Com base no histórico de preços dos últimos 90 dias, este produto está classificado como{" "}
                                    <strong className="text-foreground">{getStatusLabel(bestOffer.metrics.status)}</strong>.
                                </p>

                                {bestOffer.metrics.status === "EXCELLENT" && (
                                    <p className="text-excellent">
                                        ✓ O preço atual está próximo ou abaixo do menor preço histórico. Este é um excelente momento para comprar!
                                    </p>
                                )}

                                {bestOffer.metrics.status === "GOOD" && (
                                    <p className="text-good">
                                        ✓ O preço está abaixo da média dos últimos 90 dias. É uma boa oportunidade de compra.
                                    </p>
                                )}

                                {bestOffer.metrics.status === "NEUTRAL" && (
                                    <p className="text-neutral">
                                        • O preço está dentro da faixa normal de variação. Não há indicação clara de alta ou baixa.
                                    </p>
                                )}

                                {bestOffer.metrics.status === "EXPENSIVE" && (
                                    <p className="text-expensive">
                                        ⚠ O preço está acima da média histórica. Considere aguardar por uma queda ou criar um alerta.
                                    </p>
                                )}

                                <p className="text-sm text-muted-foreground mt-4">
                                    <strong>Como interpretamos:</strong> Comparamos o preço atual com a média dos últimos 90 dias,
                                    o menor preço histórico e a última coleta. Quanto mais negativo o percentual, melhor o preço.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Alert Form */}
                    <section className="mb-12">
                        <AlertForm productId={product.id} />
                    </section>

                    {/* Similar Products */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Produtos Similares</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {similarProducts.map((similarProduct) => (
                                <ProductCard key={similarProduct.id} product={similarProduct} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
}
