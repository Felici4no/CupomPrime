import type { Config } from "tailwindcss";

/**
 * Puro Suco Indie - Tailwind Config
 * Paleta minimalista: branco, preto, cinzas, cores de status
 */
const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Base colors (CSS variables)
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },

                // Status colors - usar APENAS para informação (status, alertas, erros)
                // NUNCA como enfeite
                excellent: "#16a34a", // green-600
                good: "#2563eb", // blue-600
                neutral: "#6b7280", // gray-500
                expensive: "#dc2626", // red-600
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    'Oxygen',
                    'Ubuntu',
                    'Cantarell',
                    '"Fira Sans"',
                    '"Droid Sans"',
                    '"Helvetica Neue"',
                    'sans-serif',
                ],
                mono: [
                    '"SF Mono"',
                    'Monaco',
                    '"Cascadia Code"',
                    '"Roboto Mono"',
                    'Consolas',
                    '"Courier New"',
                    'monospace',
                ],
            },
        },
    },
    plugins: [],
};

export default config;
