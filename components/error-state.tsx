import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    message?: string;
    retry?: () => void;
}

export function ErrorState({
    title = "Algo deu errado",
    message = "Não foi possível carregar os dados. Tente novamente.",
    retry,
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
            {retry && (
                <button
                    onClick={retry}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                    Tentar Novamente
                </button>
            )}
        </div>
    );
}
