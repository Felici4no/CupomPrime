'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { SketchFrame } from './sketch-frame';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-white text-gray-900 hover:opacity-80',
                primary: 'bg-gray-900 text-white hover:opacity-90',
                ghost: 'bg-transparent hover:bg-gray-100',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-12 px-6 text-base',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    noSketch?: boolean; // Permite desabilitar sketch frame se necessário
}

/**
 * Botão com SketchFrame (borda imperfeita)
 * Visual "Puro Suco Indie": fundo branco, borda sketch preta, hover com leve alteração de opacidade
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, noSketch = false, children, ...props }, ref) => {
        const buttonContent = (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );

        if (noSketch || variant === 'ghost') {
            return buttonContent;
        }

        return (
            <SketchFrame
                thickness={2}
                roughness={0.25}
                padding={0}
                className="inline-block"
            >
                {buttonContent}
            </SketchFrame>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
