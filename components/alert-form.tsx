"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { createAlert } from "@/lib/api";
import type { AlertRequest } from "@/types";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/use-toast";
import { Bell } from "lucide-react";

interface AlertFormProps {
    productId: string;
}

export function AlertForm({ productId }: AlertFormProps) {
    const [targetType, setTargetType] = useState<"PRICE" | "PCT_BELOW_AVG90">("PRICE");
    const [targetValue, setTargetValue] = useState("");
    const [channel, setChannel] = useState<"EMAIL" | "WHATSAPP">("EMAIL");
    const [destination, setDestination] = useState("");

    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: (data: AlertRequest) => createAlert(data),
        onSuccess: () => {
            toast({
                title: "Alerta criado!",
                description: "Você será notificado quando o preço atingir o valor desejado.",
            });
            trackEvent("create_alert", {
                product_id: productId,
                target_type: targetType,
                channel,
            });
            // Reset form
            setTargetValue("");
            setDestination("");
        },
        onError: () => {
            toast({
                title: "Erro ao criar alerta",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!targetValue || !destination) {
            toast({
                title: "Campos obrigatórios",
                description: "Preencha todos os campos para criar o alerta.",
                variant: "destructive",
            });
            return;
        }

        mutation.mutate({
            product_id: productId,
            target_type: targetType,
            target_value: parseFloat(targetValue),
            channel,
            destination,
        });
    };

    return (
        <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Criar Alerta de Preço</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Tipo de Alerta
                    </label>
                    <select
                        value={targetType}
                        onChange={(e) => setTargetType(e.target.value as "PRICE" | "PCT_BELOW_AVG90")}
                        className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="PRICE">Preço específico</option>
                        <option value="PCT_BELOW_AVG90">% abaixo da média 90 dias</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        {targetType === "PRICE" ? "Preço alvo (R$)" : "Percentual (%)"}
                    </label>
                    <input
                        type="number"
                        step={targetType === "PRICE" ? "0.01" : "1"}
                        value={targetValue}
                        onChange={(e) => setTargetValue(e.target.value)}
                        placeholder={targetType === "PRICE" ? "3999.00" : "10"}
                        className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Canal de Notificação
                    </label>
                    <select
                        value={channel}
                        onChange={(e) => setChannel(e.target.value as "EMAIL" | "WHATSAPP")}
                        className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        <option value="EMAIL">Email</option>
                        <option value="WHATSAPP">WhatsApp</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        {channel === "EMAIL" ? "Email" : "WhatsApp"}
                    </label>
                    <input
                        type={channel === "EMAIL" ? "email" : "tel"}
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder={channel === "EMAIL" ? "seu@email.com" : "+55 11 99999-9999"}
                        className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? "Criando..." : "Criar Alerta"}
                </button>
            </form>
        </div>
    );
}
