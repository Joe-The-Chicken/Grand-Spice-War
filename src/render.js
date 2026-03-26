import { canvas, ctx, IMAGE_W, IMAGE_H, TILE_W, TILE_H, MAP_W, MAP_H, offsetX, offsetY } from "./config.js";
import { hoverTile } from "./input.js";
import { assets } from "./assets.js";
import { cartToIso, isoToCart } from "./iso.js"
import { world } from "./world.js";

function getVisibleBounds() {
    const corners = [
        isoToCart(0, 0),
        isoToCart(canvas.width, 0),
        isoToCart(0, canvas.height),
        isoToCart(canvas.width, canvas.height)
    ];

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let c of corners) {
        minX = Math.min(minX, c.x);
        maxX = Math.max(maxX, c.x);
        minY = Math.min(minY, c.y);
        maxY = Math.max(maxY, c.y);
    }

    return {
        minX: Math.max(0, Math.floor(minX) - 2),
        maxX: Math.min(MAP_W, Math.ceil(maxX) + 2),
        minY: Math.max(0, Math.floor(minY) - 2),
        maxY: Math.min(MAP_H, Math.ceil(maxY) + 2)
    };
}

export function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bounds = getVisibleBounds();

    // layer -1 - ground
    for (let y = bounds.minY; y < bounds.maxY; y++) {
        for (let x = bounds.minX; x < bounds.maxX; x++) {
            const iso = cartToIso(x, y);

            const drawX = iso.x + offsetX - IMAGE_W / 2;
            const drawY = iso.y + offsetY - IMAGE_H;

            ctx.drawImage(
                assets.tile[world[y][x].tile],
                drawX,
                drawY + TILE_H,
                IMAGE_W,
                IMAGE_H
            );
        }
    }

    // layer 0 - cursor
    if (hoverTile) {
        const iso = cartToIso(hoverTile.x, hoverTile.y);
        const drawX = iso.x + offsetX - IMAGE_W / 2;
        const drawY = iso.y + offsetY - IMAGE_H;

        ctx.drawImage(assets.misc.cursor, drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
    }

    // layer -1 - ground
    for (let y = bounds.minY; y < bounds.maxY; y++) {
        for (let x = bounds.minX; x < bounds.maxX; x++) {
            const iso = cartToIso(x, y);

            const drawX = iso.x + offsetX - IMAGE_W / 2;
            const drawY = iso.y + offsetY - IMAGE_H;

            if (world[y][x].build !== "") {
                ctx.drawImage(
                    assets.build[world[y][x].build],
                    drawX,
                    drawY + TILE_H,
                    IMAGE_W,
                    IMAGE_H
                );
            }
        }
    }
}