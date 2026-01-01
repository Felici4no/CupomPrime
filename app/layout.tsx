import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cupom Prime - Comparador de Preços Inteligente",
    description: "Compare preços em tempo real na Amazon, Mercado Livre e Magazine Luiza. Histórico de preços, análise de tendências e alertas personalizados.",
    keywords: ["comparador de preços", "cupom", "desconto", "amazon", "mercado livre", "magazine luiza"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
