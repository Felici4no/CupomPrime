/**
 * Gera SVG paths com imperfeição controlada (jitter) para o visual "Puro Suco Indie"
 */

export interface SketchPathOptions {
    width: number;
    height: number;
    roughness?: number; // 0-1, quanto maior mais "torto"
    seed?: number; // Para reproduzibilidade
}

/**
 * Gera um path SVG para um retângulo com bordas imperfeitas
 */
export function generateSketchRectPath({
    width,
    height,
    roughness = 0.3,
    seed = 0,
}: SketchPathOptions): string {
    const r = roughness;
    const seededRandom = (index: number) => {
        const x = Math.sin(seed + index) * 10000;
        return x - Math.floor(x);
    };

    // Gera pontos com jitter ao longo das bordas
    const jitter = (base: number, index: number, axis: 'x' | 'y') => {
        const maxJitter = axis === 'x' ? width * r * 0.02 : height * r * 0.02;
        return base + (seededRandom(index) - 0.5) * maxJitter;
    };

    // Top edge (esquerda para direita)
    const topPoints = 8;
    const topPath = Array.from({ length: topPoints }, (_, i) => {
        const x = jitter((width / (topPoints - 1)) * i, i, 'x');
        const y = jitter(0, i + 100, 'y');
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    // Right edge (cima para baixo)
    const rightPoints = 8;
    const rightPath = Array.from({ length: rightPoints }, (_, i) => {
        const x = jitter(width, i + 200, 'x');
        const y = jitter((height / (rightPoints - 1)) * i, i + 200, 'y');
        return `L ${x} ${y}`;
    }).join(' ');

    // Bottom edge (direita para esquerda)
    const bottomPoints = 8;
    const bottomPath = Array.from({ length: bottomPoints }, (_, i) => {
        const x = jitter(width - (width / (bottomPoints - 1)) * i, i + 300, 'x');
        const y = jitter(height, i + 300, 'y');
        return `L ${x} ${y}`;
    }).join(' ');

    // Left edge (baixo para cima)
    const leftPoints = 8;
    const leftPath = Array.from({ length: leftPoints }, (_, i) => {
        const x = jitter(0, i + 400, 'x');
        const y = jitter(height - (height / (leftPoints - 1)) * i, i + 400, 'y');
        return `L ${x} ${y}`;
    }).join(' ');

    return `${topPath} ${rightPath} ${bottomPath} ${leftPath} Z`;
}

/**
 * Gera um path SVG para uma linha horizontal imperfeita
 */
export function generateSketchLinePath(
    width: number,
    roughness: number = 0.3,
    seed: number = 0
): string {
    const points = 12;
    const r = roughness;

    const seededRandom = (index: number) => {
        const x = Math.sin(seed + index) * 10000;
        return x - Math.floor(x);
    };

    const jitter = (base: number, index: number) => {
        const maxJitter = width * r * 0.01;
        return base + (seededRandom(index) - 0.5) * maxJitter;
    };

    return Array.from({ length: points }, (_, i) => {
        const x = (width / (points - 1)) * i;
        const y = jitter(0, i);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
}
