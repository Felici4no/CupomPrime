import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/50 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold mb-3">Cupom Prime</h3>
                        <p className="text-sm text-muted-foreground">
                            Comparador de preços inteligente com histórico e análise de tendências.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Como Funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Política de Privacidade
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">Aviso</h3>
                        <p className="text-sm text-muted-foreground">
                            Este site contém links de afiliados. Podemos receber comissão por compras realizadas através destes links, sem custo adicional para você.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Cupom Prime. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
