import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SketchDivider } from "@/components/ui/sketch-divider";
import { Card } from "@/components/ui/card";
import { Clock, TrendingDown, Shield, ExternalLink } from "lucide-react";

export const metadata = {
    title: "Como Funciona - Cupom Prime",
    description: "Entenda como o Cupom Prime compara preços, coleta dados e ajuda você a economizar",
};

/**
 * Como Funciona Page
 * Visual "Puro Suco Indie": texto direto, sem copy publicitária, transparência radical
 */
export default function ComoFuncionaPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <div className="flex-1">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h1>
                    <p className="text-lg text-gray-600 mb-12">
                        Transparência total. Dados reais. Sem promessas.
                    </p>

                    <SketchDivider />

                    {/* Coleta de Preços */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Clock className="h-6 w-6 text-gray-900" />
                            <h2 className="text-2xl font-bold text-gray-900">Coleta de Preços</h2>
                        </div>
                        <Card>
                            <p className="text-gray-900 mb-3">
                                Monitoramos preços em 3 e-commerces: <strong>Amazon Brasil</strong>, <strong>Mercado Livre</strong> e <strong>Magazine Luiza</strong>.
                            </p>
                            <p className="text-gray-600 text-sm mb-3">
                                Cada preço tem timestamp exato (DD/MM/AAAA às HH:mm). Sempre mostramos "Coletado em" ao lado do preço.
                            </p>
                            <p className="text-gray-600 text-sm">
                                <strong className="text-gray-900">Importante:</strong> Preços podem mudar no checkout. Sempre confira no site da loja.
                            </p>
                        </Card>
                    </section>

                    {/* Histórico e Análise */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingDown className="h-6 w-6 text-gray-900" />
                            <h2 className="text-2xl font-bold text-gray-900">Histórico e Análise</h2>
                        </div>
                        <Card>
                            <p className="text-gray-900 mb-3">
                                Mantemos histórico completo de preços para cada produto.
                            </p>
                            <p className="text-gray-600 text-sm mb-3">
                                Percentuais de variação comparam o preço atual com:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600 mb-3">
                                <li><strong className="text-gray-900">Média dos últimos 90 dias:</strong> mostra se o preço está acima ou abaixo do normal</li>
                                <li><strong className="text-gray-900">Menor preço histórico:</strong> indica o quanto você está pagando a mais ou a menos</li>
                                <li><strong className="text-gray-900">Última coleta:</strong> revela se o preço subiu ou caiu recentemente</li>
                            </ul>
                            <p className="text-gray-600 text-sm mb-3">
                                Classificação de ofertas:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
                                <li><strong className="text-excellent">EXCELENTE:</strong> preço próximo ou abaixo do menor histórico</li>
                                <li><strong className="text-good">BOM:</strong> preço abaixo da média dos últimos 90 dias</li>
                                <li><strong className="text-neutral">NEUTRO:</strong> preço dentro da faixa normal de variação</li>
                                <li><strong className="text-expensive">CARO:</strong> preço acima da média histórica</li>
                            </ul>
                        </Card>
                    </section>

                    {/* Timestamps */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="h-6 w-6 text-gray-900" />
                            <h2 className="text-2xl font-bold text-gray-900">Transparência nos Dados</h2>
                        </div>
                        <Card>
                            <p className="text-gray-900 mb-3">
                                Cada preço mostra <strong>quando foi coletado</strong> (ex: "Coletado em 01/01/2026 às 14:30").
                            </p>
                            <p className="text-gray-600 text-sm">
                                Preços podem mudar a qualquer momento. Sempre verifique o valor final no site da loja antes de comprar.
                            </p>
                        </Card>
                    </section>

                    {/* Afiliados */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <ExternalLink className="h-6 w-6 text-gray-900" />
                            <h2 className="text-2xl font-bold text-gray-900">Modelo de Afiliados</h2>
                        </div>
                        <Card>
                            <p className="text-gray-900 mb-3">
                                Cupom Prime é <strong>gratuito</strong>. Nos sustentamos através de comissões de afiliados.
                            </p>
                            <p className="text-gray-600 text-sm mb-3">
                                Quando você clica em "Comprar" e realiza uma compra, podemos receber uma pequena comissão da loja. <strong className="text-gray-900">Isso não afeta o preço que você paga</strong> — o valor é exatamente o mesmo.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Links de compra abrem em nova aba com <code className="bg-gray-100 px-1 py-0.5 text-xs font-mono">rel="nofollow sponsored"</code>.
                            </p>
                        </Card>
                    </section>

                    <SketchDivider />

                    {/* Disclaimer */}
                    <Card className="border-l-4 border-l-gray-900">
                        <p className="text-sm text-gray-600">
                            <strong className="text-gray-900">Importante:</strong> Cupom Prime não vende produtos diretamente. Somos um comparador de preços. Todas as compras são realizadas nos sites das lojas parceiras. Não nos responsabilizamos por alterações de preço, disponibilidade ou políticas de cada loja.
                        </p>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}

