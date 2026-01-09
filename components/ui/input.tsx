'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { SketchFrame } from './sketch-frame';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    noSketch?: boolean;
}

/**
 * Input com SketchFrame, foco com traço colorido no underline
 * Visual "Puro Suco Indie": borda sketch, fundo branco
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, noSketch = false, ...props }, ref) => {
        const inputElement = (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400',
                    'focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-b-gray-900',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                ref={ref}
                {...props}
            />
        );

        if (noSketch) {
            return inputElement;
        }

        return (
            <SketchFrame thickness={2} roughness={0.25} padding={0}>
                {inputElement}
            </SketchFrame>
        );
    }
);

Input.displayName = 'Input';

export { Input };
