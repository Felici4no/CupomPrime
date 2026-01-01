import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Clock, TrendingDown, Shield, ExternalLink } from "lucide-react";

export const metadata = {
    title: "Como Funciona - Cupom Prime",
    description: "Entenda como o Cupom Prime compara preços, coleta dados e ajuda você a economizar",
};

export default function ComoFuncionaPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <h1 className="text-4xl font-bold mb-4">Como Funciona</h1>
                    <p className="text-lg text-muted-foreground mb-12">
                        Transparência total sobre como comparamos preços e ajudamos você a economizar
                    </p>

                    {/* Coleta de Preços */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">Coleta de Preços</h2>
                        </div>
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <p>
                                Monitoramos preços em 3 grandes e-commerces brasileiros: <strong>Amazon Brasil</strong>,{" "}
                                <strong>Mercado Livre</strong> e <strong>Magazine Luiza</strong>.
                            </p>
                            <p>
                                Cada preço exibido inclui a <strong>data e hora exata da coleta</strong> (timestamp),
                                garantindo que você saiba exatamente quando aquele valor foi registrado.
                            </p>
                            <p>
                                Os preços são atualizados regularmente, mas podem mudar no checkout. Sempre confira
                                o valor final antes de concluir sua compra.
                            </p>
                        </div>
                    </section>

                    {/* Histórico e Análise */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <TrendingDown className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">Histórico e Análise</h2>
                        </div>
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <p>
                                Mantemos um <strong>histórico completo de preços</strong> para cada produto,
                                permitindo que você visualize tendências e identifique o melhor momento para comprar.
                            </p>
                            <p>
                                Nossos percentuais de variação comparam o preço atual com:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Média dos últimos 90 dias:</strong> mostra se o preço está acima ou abaixo do normal</li>
                                <li><strong>Menor preço histórico:</strong> indica o quanto você está pagando a mais ou a menos</li>
                                <li><strong>Última coleta:</strong> revela se o preço subiu ou caiu recentemente</li>
                            </ul>
                            <p>
                                Com base nesses dados, classificamos cada oferta como:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong className="text-excellent">Excelente:</strong> preço próximo ou abaixo do menor histórico</li>
                                <li><strong className="text-good">Bom:</strong> preço abaixo da média dos últimos 90 dias</li>
                                <li><strong className="text-neutral">Neutro:</strong> preço dentro da faixa normal de variação</li>
                                <li><strong className="text-expensive">Caro:</strong> preço acima da média histórica</li>
                            </ul>
                        </div>
                    </section>

                    {/* Timestamps */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">Transparência nos Dados</h2>
                        </div>
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <p>
                                Cada preço exibido mostra <strong>quando foi coletado</strong> (ex: "Coletado em 01/01/2026 às 14:30").
                                Isso garante que você saiba exatamente a idade da informação.
                            </p>
                            <p>
                                Preços podem mudar a qualquer momento. Por isso, sempre recomendamos verificar o valor
                                final no site da loja antes de finalizar a compra.
                            </p>
                        </div>
                    </section>

                    {/* Afiliados */}
                    <section className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <ExternalLink className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold">Modelo de Afiliados</h2>
                        </div>
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <p>
                                O Cupom Prime é <strong>gratuito para você</strong>. Nos sustentamos através de
                                comissões de afiliados.
                            </p>
                            <p>
                                Quando você clica em "Comprar" e realiza uma compra, podemos receber uma pequena
                                comissão da loja. <strong>Isso não afeta o preço que você paga</strong> — o valor
                                é exatamente o mesmo.
                            </p>
                            <p>
                                Todos os links de compra abrem em uma nova aba e incluem as tags apropriadas
                                (rel="nofollow sponsored") para transparência com mecanismos de busca.
                            </p>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <div className="bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Importante:</strong> O Cupom Prime não vende produtos
                            diretamente. Somos um comparador de preços que facilita sua pesquisa. Todas as compras
                            são realizadas diretamente nos sites das lojas parceiras. Não nos responsabilizamos por
                            alterações de preço, disponibilidade ou políticas de cada loja.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
