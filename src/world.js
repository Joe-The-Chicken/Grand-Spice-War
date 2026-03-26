import { MAP_W, MAP_H } from "./config.js";
import Perlin from "./perlin.js";

export let world = [];

function shift(a) {
    return (Math.pow(a,1.123123) * 32.3412675) % 1;
}

function noise(x, y, scale, seed) {
    let p = new Perlin(seed);
    return parseFloat(p.noise(x * scale, y * scale).toFixed(2));
}

export function initWorld(seed) {
    const heightScale = 0.1;

    for (let y = 0; y < MAP_H; y++) {
        world[y] = [];
        for (let x = 0; x < MAP_W; x++) {
            let height = 0.5 * noise(x + 1, y + 1, heightScale, shift(shift(seed))) + noise(x + 1, y + 1, 0.25 * heightScale, shift(shift(seed)));
            let temperature = 0.5 * noise(x + 1, y + 1, heightScale, shift(seed)) + noise(x + 1, y + 1, 0.25 * heightScale, shift(seed));

            let tile = "";

            if (height < 0) {
                tile = "water";
            } else if (height < 0.1) {
                tile = "sand"; // beach
            } else if (height < 0.7) {
                tile = "grass";
            } else {
                tile = "stone"; // mountains
            }

            if (tile === "grass" && temperature > 0.3) {
                tile = "sand";
            }

            world[y][x] = {
                build: "",
                tile: tile
            };
        }
    }
}