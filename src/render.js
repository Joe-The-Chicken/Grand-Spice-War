import { canvas, ctx, IMAGE_W, IMAGE_H, TILE_W, TILE_H, MAP_W, MAP_H, offsetX, offsetY, zoom } from "./config.js";
import { hoverTile, cameraX, cameraY, selectedBuild, selectedRot, hasCastle } from "./input.js";
import { assetData, assets } from "./assets.js";
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

    if(world[y][x].tile.startsWith("water")) {
        drawY += waves[x];
    }
    
    if(!selectedBuild && hasCastle) {
        ctx.drawImage(assets.misc.cursor, drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
    }
}

function renderAt(x,y,cx,cy) {
    const iso = cartToIso(x, y);

    let drawX = iso.x + offsetX - IMAGE_W / 2 - cx;
    let drawY = iso.y + offsetY - IMAGE_H - cy;

    if(x >= MAP_W || y >= MAP_H) {
        ctx.drawImage(assets.tile.void, drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
        return;
    }
    
    if(world[y][x].tile.startsWith("water")) {
        drawY += waves[x];
    }
    
    ctx.drawImage(assets.tile[world[y][x].tile], drawX, drawY + 2 * TILE_H, IMAGE_W, IMAGE_H);

    if(world[y][x].tile == "water") {
        drawY -= waves[x];
    }

    if(world[y][x].hasCastle) {
        const iso2 = cartToIso(x, y);
        let dx = iso2.x + offsetX - IMAGE_W - cx;
        let dy = iso2.y + offsetY - 3.5 * IMAGE_W - cy + TILE_H;
        ctx.drawImage(assets.build.castle, dx, dy, IMAGE_W * 2, IMAGE_W * 4);
    }

    if(world[y][x].build && world[y][x].build != "" && !bordersCastle(x,y)) {
        if(assetData.build[world[y][x].build].canRotate) {
            ctx.drawImage(assets.build[world[y][x].build + "_" + world[y][x].buildRot], drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
        } else {
            ctx.drawImage(assets.build[world[y][x].build], drawX, drawY + 2 * TILE_H, IMAGE_W, IMAGE_H);
        }
    }

    if(!hasCastle && hoverTile && hoverTile.x == x && hoverTile.y == y) {
        const iso2 = cartToIso(x, y);
        let dx = iso2.x + offsetX - IMAGE_W - cx;
        let dy = iso2.y + offsetY - 3.5 * IMAGE_W - cy + TILE_H;

        ctx.globalAlpha = 0.75;
        ctx.drawImage(assets.build.castle, dx, dy, IMAGE_W * 2, IMAGE_W * 4);
        ctx.globalAlpha = 1;
    } else if(hoverTile && hoverTile.x == x && hoverTile.y == y && selectedBuild && assetData.build[selectedBuild].surfaces.includes(world[hoverTile.y][hoverTile.x].tile)) {
        let buildName = selectedBuild;
        if(assetData.build[selectedBuild].canRotate) {
            buildName += "_" + selectedRot;
        }

        ctx.globalAlpha = 0.75;
        ctx.drawImage(assets.build[buildName], drawX, drawY + TILE_H, IMAGE_W, IMAGE_H);
        ctx.globalAlpha = 1;
    }
}

function calcWave(now) {
    let a = [];
    for(let x = 0; x < MAP_W; x++) {
        a.push(zoom / 16 * Math.round(1 * Math.sin((now + 0.5 * (x))) + 1));
    }
    return a;
}

function bordersCastle(x, y) {
    const dirs = [
        [0,0],[1,0],[1,1],[0,1]
    ];

    for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue;

        if (world[ny][nx].hasCastle) {
            return true;
        }
    }

    return false;
}