'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { SketchFrame } from './sketch-frame';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    noSketch?: boolean;
    sketchRoughness?: number;
    sketchThickness?: number;
}

/**
 * Card com SketchFrame, fundo branco, sem shadow
 * Visual "Puro Suco Indie": borda sketch imperfeita
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            noSketch = false,
            sketchRoughness = 0.3,
            sketchThickness = 2,
            children,
            ...props
        },
        ref
    ) => {
        if (noSketch) {
            return (
                <div
                    ref={ref}
                    className={cn('bg-white p-4', className)}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        return (
            <SketchFrame
                thickness={sketchThickness}
                roughness={sketchRoughness}
                padding={16}
                className={className}
            >
                <div ref={ref} {...props}>
                    {children}
                </div>
            </SketchFrame>
        );
    }
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 mb-4', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-gray-600', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center mt-4', className)}
        {...props}
    />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
