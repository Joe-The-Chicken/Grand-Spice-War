export function makeNoise2D(seed, scale) {
    const perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 0; i < 256; i++) {
        const j = (seed = (seed * 16807) % 2147483647) % 256;
        [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

    // Gradient vectors for smoother interpolation
    const grad = [
        [1, 1], [-1, 1], [1, -1], [-1, -1],
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    function fade(t) { 
        // Smoother fade curve (quintic polynomial)
        return t * t * t * (t * (t * 6 - 15) + 10); 
    }

    function lerp(a, b, t) { 
        return a + t * (b - a); 
    }

    function dotProduct(g, x, y) {
        return g[0] * x + g[1] * y;
    }

    return function noise2D(x, y) {
        const x1 = x * scale;
        const y1 = y * scale;
        
        const xi = Math.floor(x1) & 255;
        const yi = Math.floor(y1) & 255;

        const xf = x1 - Math.floor(x1);
        const yf = y1 - Math.floor(y1);

        // Get gradient indices
        const g00 = perm[xi + perm[yi]] % 8;
        const g10 = perm[xi + 1 + perm[yi]] % 8;
        const g01 = perm[xi + perm[yi + 1]] % 8;
        const g11 = perm[xi + 1 + perm[yi + 1]] % 8;

        // Calculate dot products
        const d00 = dotProduct(grad[g00], xf, yf);
        const d10 = dotProduct(grad[g10], xf - 1, yf);
        const d01 = dotProduct(grad[g01], xf, yf - 1);
        const d11 = dotProduct(grad[g11], xf - 1, yf - 1);

        const u = fade(xf);
        const v = fade(yf);

        const top = lerp(d00, d10, u);
        const bottom = lerp(d01, d11, u);

        return lerp(top, bottom, v);
    };
}
