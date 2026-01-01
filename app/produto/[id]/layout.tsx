import type { Metadata } from "next";
import { getProductDetail } from "@/lib/api";

type Props = {
    params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const product = await getProductDetail(params.id);

        const minPrice = Math.min(...product.offers.map((o) => o.current_price));
        const description = `Compare preços do ${product.normalized_title}. A partir de R$ ${minPrice.toFixed(2)} em ${product.offers.length} lojas. Histórico completo e análise de preços.`;

        return {
            title: `${product.normalized_title} - Cupom Prime`,
            description,
            openGraph: {
                title: product.normalized_title,
                description,
                images: [product.image_url],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: product.normalized_title,
                description,
                images: [product.image_url],
            },
        };
    } catch (error) {
        return {
            title: "Produto - Cupom Prime",
            description: "Compare preços e veja o histórico completo",
        };
    }
}

export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
