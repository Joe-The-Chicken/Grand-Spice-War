import { draw } from "./src/render.js";
import { drawUI } from "./src/ui.js";
import { canvas, updateScale } from "./src/config.js";
import { initWorld } from "./src/world.js";
import { cameraX, cameraY, setupInput, updateCamera } from "./src/input.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

updateScale();
initWorld(Math.random() * 1234128);
setupInput(canvas);

let lastTime = performance.now();

function loop(now) {
    const dt = now - lastTime;
    lastTime = now;

    updateCamera(dt);
    draw(cameraX, cameraY);
    drawUI();
    requestAnimationFrame(loop);
}

loop(lastTime);