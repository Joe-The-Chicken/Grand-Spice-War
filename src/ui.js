import { canvas, ctx } from "./config.js";
import { assets } from "./assets.js";

const size = canvas.width * 1/4;

export function drawUI() {
    drawImage(assets.ui.hud1, { anchor: { x: 0.5, y: 0 } }, size, size * 0.25);
    drawImage(assets.ui.hud2, { anchor: { x: 0.5, y: 1 } }, size * 2, size * 0.25);
    drawImage(assets.ui.hud3, { pos: {x: size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25);
    drawImage(assets.ui.hud3, { pos: {x: -size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25);
}

export const UIBoundsY = size * 0.25;

function drawImage(img, {pos = { x: 0, y: 0 }, anchor = { x: 0, y: 0 }}, w, h) {
    let x = pos.x + (anchor.x * canvas.width - w * anchor.x);
    let y = pos.y + (anchor.y * canvas.height - h * anchor.y);
    ctx.drawImage(img, x, y, w, h);
}