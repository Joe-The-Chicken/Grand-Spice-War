class Perlin {
    constructor(seed = 0) {
        this.permutation = new Uint8Array(512);
        this.p = new Uint8Array(256);

        // Seeded random
        let random = this.mulberry32(seed);

        for (let i = 0; i < 256; i++) {
            this.p[i] = i;
        }

        // Shuffle permutation
        for (let i = 255; i > 0; i--) {
            let j = Math.floor(random() * (i + 1));
            [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
        }

        // Duplicate
        for (let i = 0; i < 512; i++) {
            this.permutation[i] = this.p[i & 255];
        }
    }

    // Seeded RNG
    mulberry32(a) {
        return function () {
            let t = a += 0x6D2B79F5;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        }
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t, a, b) {
        return a + t * (b - a);
    }

    grad(hash, x, y) {
        const h = hash & 3;
        const u = h < 2 ? x : y;
        const v = h < 2 ? y : x;
        return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    }

    noise(x, y) {
        let X = Math.floor(x) & 255;
        let Y = Math.floor(y) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);

        let u = this.fade(x);
        let v = this.fade(y);

        let A = this.permutation[X] + Y;
        let B = this.permutation[X + 1] + Y;

        return this.lerp(v,
            this.lerp(u,
                this.grad(this.permutation[A], x, y),
                this.grad(this.permutation[B], x - 1, y)
            ),
            this.lerp(u,
                this.grad(this.permutation[A + 1], x, y - 1),
                this.grad(this.permutation[B + 1], x - 1, y - 1)
            )
        );
    }

    // Optional: normalized (0 → 1)
    noise2D(x, y) {
        return (this.noise(x, y) + 1) / 2;
    }
}

export default Perlin;