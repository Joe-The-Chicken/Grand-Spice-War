import { canvas, ctx, IMAGE_W, IMAGE_H, TILE_W, TILE_H, MAP_W, MAP_H, offsetX, offsetY, zoom } from "./config.js";
import { hoverTile, cameraX, cameraY } from "./input.js";
import { assets } from "./assets.js";
import { cartToIso, isoToCart } from "./iso.js"
import { world } from "./world.js";
import { makeNoise2D } from "./noise.js";

let waves;

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

    const minSum = bounds.minX + bounds.minY;
    const maxSum = bounds.maxX + bounds.maxY;

    waves = calcWave(now);

    for (let i = minSum; i <= maxSum; i++) {
        const startX = Math.max(bounds.minX, i - bounds.maxY);
        const endX = Math.min(bounds.maxX, i - bounds.minY);

        for (let x = startX; x <= endX; x++) {
            renderAt(x, i - x, cx, cy);
        }
    }

    if (!hoverTile) return;

    const iso = cartToIso(hoverTile.x, hoverTile.y);

    let drawX = iso.x + offsetX - IMAGE_W / 2 - cx;
    let drawY = iso.y + offsetY - IMAGE_H - cy;

    let x = hoverTile.x;
    let y = hoverTile.y;

    if(!world[y][x].tile) return;

    if(zoom > 32) {
        if(world[y][x].tile.startsWith("water")) {
            drawY += waves[x];
        }
    }
    
    ctx.drawImage(assets.misc.cursor, drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
}

function renderAt(x,y,cx,cy) {
    const iso = cartToIso(x, y);

    let drawX = iso.x + offsetX - IMAGE_W / 2 - cx;
    let drawY = iso.y + offsetY - IMAGE_H - cy;

    if(x >= MAP_W || y >= MAP_H) {
        ctx.drawImage(assets.tile.void, drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
        return;
    }
    
    if(zoom > 32) {
        if(world[y][x].tile.startsWith("water")) {
            drawY += waves[x];
        }
    }

    
    ctx.drawImage(assets.tile[world[y][x].tile], drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);

    if(world[y][x].build && world[y][x].build != "") {
        ctx.drawImage(assets.build[world[y][x].build], drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
    }
}

function calcWave(now) {
    let a = [];
    for(let x = 0; x < MAP_W; x++) {
        a.push(zoom / 16 * Math.round(1.5 * Math.sin((now + 0.5 * (x))) + 0.5));
    }
    return a;
}