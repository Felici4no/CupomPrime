import { cn, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { PriceStatus } from "@/types";

interface StatusPillProps {
    status: PriceStatus;
    className?: string;
}

/**
 * Selo de status (EXCELENTE/BOM/NEUTRO/CARO)
 * Visual "Puro Suco Indie": cor APENAS no texto e sublinhado (informação), sem background colorido
 */
export function StatusPill({ status, className }: StatusPillProps) {
    const colorClass = getStatusColor(status);

    return (
        <span
            className={cn(
                "inline-flex items-center text-xs font-medium uppercase tracking-wide",
                "border-b-2",
                colorClass,
                className
            )}
        >
            {getStatusLabel(status)}
        </span>
    );
}

