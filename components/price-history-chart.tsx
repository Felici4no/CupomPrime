"use client";

import { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PriceHistoryPoint, TimeWindow } from "@/types";
import { cn } from "@/lib/utils";

interface PriceHistoryChartProps {
    history: PriceHistoryPoint[];
}

const TIME_WINDOWS: { value: TimeWindow; label: string; days: number }[] = [
    { value: "7d", label: "7 dias", days: 7 },
    { value: "30d", label: "30 dias", days: 30 },
    { value: "90d", label: "90 dias", days: 90 },
    { value: "180d", label: "180 dias", days: 180 },
    { value: "365d", label: "1 ano", days: 365 },
];

const STORE_COLORS: Record<string, string> = {
    AMAZON: "#FF9900",
    MERCADO_LIVRE: "#FFE600",
    MAGALU: "#0086FF",
};

export function PriceHistoryChart({ history }: PriceHistoryChartProps) {
    const [timeWindow, setTimeWindow] = useState<TimeWindow>("90d");

    // Filter data by time window
    const filteredHistory = history.filter((point) => {
        const days = TIME_WINDOWS.find((w) => w.value === timeWindow)?.days || 90;
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return new Date(point.collected_at) >= cutoffDate;
    });

    // Transform data for Recharts
    const chartData = filteredHistory.reduce((acc, point) => {
        const date = formatDate(point.collected_at);
        const existing = acc.find((item) => item.date === date);

        if (existing) {
            existing[point.store] = point.price;
        } else {
            acc.push({
                date,
                fullDate: point.collected_at,
                [point.store]: point.price,
            });
        }

        return acc;
    }, [] as any[]);

    // Get unique stores
    const stores = Array.from(new Set(history.map((p) => p.store)));

    // Find min and max prices
    const allPrices = filteredHistory.map((p) => p.price);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">Histórico de Preços</h3>
                <div className="flex gap-2">
                    {TIME_WINDOWS.map((window) => (
                        <button
                            key={window.value}
                            onClick={() => setTimeWindow(window.value)}
                            className={cn(
                                "px-3 py-1 text-sm rounded-md transition-colors",
                                timeWindow === window.value
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-muted/80"
                            )}
                        >
                            {window.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
                <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            className="text-muted-foreground"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            className="text-muted-foreground"
                            tickFormatter={(value) => formatCurrency(value)}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (!active || !payload || payload.length === 0) return null;

                                return (
                                    <div className="bg-popover border rounded-lg p-3 shadow-lg">
                                        <p className="text-sm font-medium mb-2">
                                            {payload[0]?.payload?.date}
                                        </p>
                                        {payload.map((entry: any) => (
                                            <div key={entry.name} className="flex items-center gap-2 text-sm">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: entry.color }}
                                                />
                                                <span className="text-muted-foreground">{entry.name}:</span>
                                                <span className="font-medium">{formatCurrency(entry.value)}</span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            }}
                        />
                        <Legend />
                        {stores.map((store) => (
                            <Line
                                key={store}
                                type="monotone"
                                dataKey={store}
                                stroke={STORE_COLORS[store] || "#888"}
                                strokeWidth={2}
                                dot={false}
                                name={store.replace("_", " ")}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div>
                        <p className="text-sm text-muted-foreground">Menor preço</p>
                        <p className="text-lg font-bold text-excellent">{formatCurrency(minPrice)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Maior preço</p>
                        <p className="text-lg font-bold text-expensive">{formatCurrency(maxPrice)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
