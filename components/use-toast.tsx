"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    onClose: () => void;
}

export function Toast({ id, title, description, variant = "default", onClose }: ToastProps) {
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={cn(
                "pointer-events-auto w-full max-w-sm rounded-lg border p-4 shadow-lg",
                variant === "destructive"
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-card text-card-foreground"
            )}
        >
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    {title && <div className="font-semibold text-sm mb-1">{title}</div>}
                    {description && <div className="text-sm opacity-90">{description}</div>}
                </div>
                <button
                    onClick={onClose}
                    className="rounded-md p-1 hover:bg-background/20 transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export function Toaster() {
    const { toasts } = useToastState();

    return (
        <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 pointer-events-none">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    );
}

// Toast state management
type ToastState = Omit<ToastProps, "onClose">;

const toastListeners = new Set<(toasts: ToastState[]) => void>();
let toastsState: ToastState[] = [];

function updateToasts(toasts: ToastState[]) {
    toastsState = toasts;
    toastListeners.forEach((listener) => listener(toasts));
}

export function toast(props: Omit<ToastState, "id">) {
    const id = Math.random().toString(36).substring(7);
    const newToast = { ...props, id };
    updateToasts([...toastsState, newToast]);
    return id;
}

function removeToast(id: string) {
    updateToasts(toastsState.filter((t) => t.id !== id));
}

function useToastState() {
    const [toasts, setToasts] = React.useState<ToastState[]>(toastsState);

    React.useEffect(() => {
        toastListeners.add(setToasts);
        return () => {
            toastListeners.delete(setToasts);
        };
    }, []);

    return {
        toasts: toasts.map((t) => ({
            ...t,
            onClose: () => removeToast(t.id),
        })),
    };
}

export function useToast() {
    return {
        toast,
    };
}
