import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PriceStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
}

export function formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function formatPercentage(value: number, showSign: boolean = true): string {
    const formatted = new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
    }).format(value / 100);

    if (showSign && value > 0) {
        return `+${formatted}`;
    }

    return formatted;
}

export function getStatusColor(status: PriceStatus): string {
    switch (status) {
        case "EXCELLENT":
            return "text-excellent border-excellent";
        case "GOOD":
            return "text-good border-good";
        case "NEUTRAL":
            return "text-neutral border-neutral";
        case "EXPENSIVE":
            return "text-expensive border-expensive";
        default:
            return "text-gray-600 border-gray-600";
    }
}

export function getStatusLabel(status: PriceStatus): string {
    switch (status) {
        case "EXCELLENT":
            return "Excelente";
        case "GOOD":
            return "Bom";
        case "NEUTRAL":
            return "Neutro";
        case "EXPENSIVE":
            return "Caro";
        default:
            return "Desconhecido";
    }
}

export function getStoreLogoUrl(store: string): string {
    // In production, these would be actual logo URLs
    const logos: Record<string, string> = {
        AMAZON: "/logos/amazon.svg",
        MERCADO_LIVRE: "/logos/mercadolivre.svg",
        MAGALU: "/logos/magalu.svg",
    };
    return logos[store] || "";
}
