import { cn, getStatusBgColor, getStatusColor, getStatusLabel } from "@/lib/utils";
import type { PriceStatus } from "@/types";

interface StatusPillProps {
    status: PriceStatus;
    className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                getStatusBgColor(status),
                getStatusColor(status),
                className
            )}
        >
            {getStatusLabel(status)}
        </span>
    );
}
