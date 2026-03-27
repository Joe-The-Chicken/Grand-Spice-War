import { TILE_W, TILE_H, IMAGE_H, offsetX, offsetY } from "./config.js";

export function cartToIso(x, y) {
    return {
        x: (x - y) * (TILE_W / 2),
        y: (x + y) * (TILE_H / 2)
    };
}

export function isoToCart(screenX, screenY) {
    screenX -= offsetX;
    screenY -= offsetY;

    // adjust for bottom-anchored tiles
    screenY += (IMAGE_H - TILE_H);

    const x = (screenX / (TILE_W / 2) + screenY / (TILE_H / 2)) / 2;
    const y = (screenY / (TILE_H / 2) - screenX / (TILE_W / 2)) / 2;

    return {
        x: Math.floor(x),
        y: Math.floor(y)
    };
}