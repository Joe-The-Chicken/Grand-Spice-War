import { draw } from "./src/render.js";
import { canvas, updateScale } from "./src/config.js";
import { initWorld } from "./src/world.js";
import { setupInput } from "./src/input.js";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

updateScale();
initWorld(Math.random() * 1234128);
setupInput(canvas);

function loop() {
    draw();
    requestAnimationFrame(loop);
}

loop();