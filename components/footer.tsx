import Link from "next/link";
import { SketchDivider } from "./ui/sketch-divider";

/**
 * Footer principal
 * Visual "Puro Suco Indie": texto direto, sem enfeites, aviso de afiliados transparente
 */
export function Footer() {
    return (
        <footer className="bg-white mt-auto">
            <SketchDivider className="my-0" />
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Cupom Prime</h3>
                        <p className="text-sm text-gray-600">
                            Comparador de preços com histórico e análise transparente.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/como-funciona" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Como Funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="/termos" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Termos de Uso
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacidade" className="text-gray-600 hover:text-gray-900 transition-colors">
                                    Política de Privacidade
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3 text-gray-900">Afiliados</h3>
                        <p className="text-sm text-gray-600">
                            Links de afiliados. Comissão por compras, sem custo adicional.
                        </p>
                    </div>
                </div>

                <SketchDivider />

                <div className="text-center text-sm text-gray-600">
                    <p>&copy; {new Date().getFullYear()} Cupom Prime</p>
                </div>
            </div>
        </footer>
    );
}

