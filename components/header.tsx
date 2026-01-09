import Link from "next/link";
import { TrendingDown } from "lucide-react";
import { SketchDivider } from "./ui/sketch-divider";

/**
 * Header principal
 * Visual "Puro Suco Indie": logo tipográfico, sem blur, sem gradientes
 */
export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
                    <TrendingDown className="h-6 w-6" />
                    <span>Cupom Prime</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity">
                        Início
                    </Link>
                    <Link href="/como-funciona" className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity">
                        Como Funciona
                    </Link>
                </nav>
            </div>
            <SketchDivider className="my-0" />
        </header>
    );
}

