'use client';

import { useEffect, useRef, useState } from 'react';
import { generateSketchLinePath } from '@/lib/sketch-path';
import { cn } from '@/lib/utils';

export interface SketchDividerProps {
    className?: string;
    thickness?: number;
    roughness?: number;
    seed?: number;
}

/**
 * Linha horizontal "torta" com leve variação via SVG path
 * Visual "Puro Suco Indie": traço imperfeito
 */
export function SketchDivider({
    className,
    thickness = 1.5,
    roughness = 0.3,
    seed,
}: SketchDividerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [path, setPath] = useState('');

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (width > 0) {
            const generatedPath = generateSketchLinePath(
                width,
                roughness,
                seed ?? Math.random() * 1000
            );
            setPath(generatedPath);
        }
    }, [width, roughness, seed]);

    return (
        <div ref={containerRef} className={cn('w-full h-[2px] my-4', className)}>
            {path && (
                <svg width={width} height="2" className="overflow-visible">
                    <path
                        d={path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={thickness}
                        className="text-gray-900"
                    />
                </svg>
            )}
        </div>
    );
}
