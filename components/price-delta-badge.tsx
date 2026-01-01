import { formatPercentage, formatCurrency, cn } from "@/lib/utils";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

interface PriceDeltaBadgeProps {
    percentChange: number;
    absoluteChange: number;
    label: string;
    showAbsolute?: boolean;
    className?: string;
}

export function PriceDeltaBadge({
    percentChange,
    absoluteChange,
    label,
    showAbsolute = true,
    className,
}: PriceDeltaBadgeProps) {
    const isNegative = percentChange < 0;
    const isNeutral = Math.abs(percentChange) < 0.5;

    const Icon = isNeutral ? Minus : isNegative ? TrendingDown : TrendingUp;
    const colorClass = isNeutral
        ? "text-muted-foreground"
        : isNegative
            ? "text-excellent"
            : "text-expensive";

    return (
        <div className={cn("flex flex-col gap-0.5", className)}>
            <span className="text-xs text-muted-foreground">{label}</span>
            <div className={cn("flex items-center gap-1 font-medium", colorClass)}>
                <Icon className="h-3.5 w-3.5" />
                <span className="text-sm">
                    {formatPercentage(percentChange)}
                    {showAbsolute && (
                        <span className="text-xs ml-1">
                            ({isNegative ? "" : "+"}{formatCurrency(absoluteChange)})
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
}
