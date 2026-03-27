import { canvas, ctx, IMAGE_W, IMAGE_H, TILE_W, TILE_H, MAP_W, MAP_H, offsetX, offsetY, zoom } from "./config.js";
import { hoverTile, cameraX, cameraY } from "./input.js";
import { assets } from "./assets.js";
import { cartToIso, isoToCart } from "./iso.js"
import { world } from "./world.js";
import { makeNoise2D } from "./noise.js";

function getVisibleBounds(cx, cy) {
    const corners = [
        isoToCart(0 + cx, 0 + cy),
        isoToCart(canvas.width + cx, 0 + cy),
        isoToCart(0 + cx, canvas.height + cy),
        isoToCart(canvas.width + cx, canvas.height + cy)
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
        minX: Math.max(0, Math.floor(minX) - 4),
        maxX: Math.min(MAP_W, Math.ceil(maxX) + 4),
        minY: Math.max(0, Math.floor(minY) - 4),
        maxY: Math.min(MAP_H, Math.ceil(maxY) + 4)
    };
}

export function draw(cx, cy) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bounds = getVisibleBounds(cx, cy);
    const now = Date.now() / 250;

    // layer -1 - ground
    for (let y = bounds.minY; y < bounds.maxY; y++) {
        for (let x = bounds.minX; x < bounds.maxX; x++) {
            const iso = cartToIso(x, y);

            let drawX = iso.x + offsetX - IMAGE_W / 2 - cx;
            let drawY = iso.y + offsetY - IMAGE_H - cy;
            
            if(zoom > 32) {
                if(world[y][x].tile == "water" || world[y][x].tile == "water_dark" || world[y][x].tile == "water_darker") {
                    drawY += zoom / 16 * (Math.round(2 * Math.sin((now + 0.5 * (x)))));
                }
            }

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
        let drawX = iso.x + offsetX - IMAGE_W / 2 - cx;
        let drawY = iso.y + offsetY - IMAGE_H - cy;
        let x = hoverTile.x;
        let y = hoverTile.y;

        if(zoom > 32) {
            if(world[y][x].tile == "water" || world[y][x].tile == "water_dark" || world[y][x].tile == "water_darker") {
                drawY += zoom / 16 * (Math.round(1 * Math.sin((now + 0.5 * (x)))));
            }
        }

        ctx.drawImage(assets.misc.cursor, drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
    }

    // layer 1 - buildings
    for (let y = bounds.minY; y < bounds.maxY; y++) {
        for (let x = bounds.minX; x < bounds.maxX; x++) {
            const iso = cartToIso(x, y);

            const drawX = iso.x + offsetX - IMAGE_W / 2 - cx;
            const drawY = iso.y + offsetY - IMAGE_H - cy;

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