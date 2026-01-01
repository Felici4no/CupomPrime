import Link from "next/link";
import { TrendingDown } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <TrendingDown className="h-6 w-6 text-primary" />
                    <span>Cupom Prime</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Início
                    </Link>
                    <Link href="/como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
                        Como Funciona
                    </Link>
                </nav>
            </div>
        </header>
    );
}
