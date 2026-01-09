'use client';

import { useEffect, useRef, useState } from 'react';
import { generateSketchRectPath } from '@/lib/sketch-path';
import { cn } from '@/lib/utils';

export interface SketchFrameProps {
    children: React.ReactNode;
    className?: string;
    thickness?: number; // Espessura da borda em px
    roughness?: number; // 0-1, imperfeição
    padding?: number; // Padding interno em px
    seed?: number; // Seed para reproduzibilidade
}

/**
 * Componente wrapper que renderiza borda SVG com imperfeição controlada
 * Visual "Puro Suco Indie": traço preto imperfeito, fundo branco
 */
export function SketchFrame({
    children,
    className,
    thickness = 2,
    roughness = 0.3,
    padding = 16,
    seed,
}: SketchFrameProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [path, setPath] = useState('');

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                setDimensions({ width: offsetWidth, height: offsetHeight });
            }
        };

        updateDimensions();

        const resizeObserver = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (dimensions.width > 0 && dimensions.height > 0) {
            const generatedPath = generateSketchRectPath({
                width: dimensions.width,
                height: dimensions.height,
                roughness,
                seed: seed ?? Math.random() * 1000,
            });
            setPath(generatedPath);
        }
    }, [dimensions, roughness, seed]);

    return (
        <div ref={containerRef} className={cn('relative bg-white', className)}>
            {/* SVG Border */}
            {path && (
                <svg
                    className="absolute inset-0 pointer-events-none"
                    width={dimensions.width}
                    height={dimensions.height}
                    style={{ overflow: 'visible' }}
                >
                    <path
                        d={path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={thickness}
                        className="text-gray-900"
                    />
                </svg>
            )}

            {/* Content */}
            <div style={{ padding: `${padding}px` }}>{children}</div>
        </div>
    );
}
