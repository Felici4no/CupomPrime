export function ProductCardSkeleton() {
    return (
        <div className="bg-card border rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex items-center justify-between">
                    <div className="h-6 bg-muted rounded w-24" />
                    <div className="h-5 bg-muted rounded w-16" />
                </div>
            </div>
        </div>
    );
}

export function OfferCardSkeleton() {
    return (
        <div className="bg-card border rounded-lg p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                    <div className="h-5 bg-muted rounded w-32" />
                    <div className="h-3 bg-muted rounded w-40" />
                </div>
                <div className="h-5 bg-muted rounded w-16" />
            </div>
            <div className="h-8 bg-muted rounded w-32 mb-4" />
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-12 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
            </div>
            <div className="h-10 bg-muted rounded" />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="w-full h-80 bg-muted rounded-lg animate-pulse" />
    );
}
