import { canvas, IMAGE_W, IMAGE_H, TILE_W, TILE_H, MAP_W, MAP_H, MIN_SCALE, MAX_SCALE } from "./config.js";
import { isoToCart } from "./iso.js";
import { zoom, setZoom, updateScale } from "./config.js";
import { world } from "./world.js";
import { UIBoundsY } from "./ui.js";

export let mouseX = 0;
export let mouseY = 0;
export let hoverTile = null;
export let cameraX = 0;
export let cameraY = (0.5 * MAP_H) * (0.5 * zoom);
console.log(cameraY);

const keysPressed = {};
const cameraSpeed = 5;

export function setupInput() {
    function updateCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY - IMAGE_H / 2;

        const tile = isoToCart(mouseX + cameraX, mouseY + cameraY);

        if (tile.x >= 0 && tile.y >= 0 && tile.x < MAP_W && tile.y < MAP_H && e.clientY < canvas.height - UIBoundsY && e.clientY > UIBoundsY) {
            hoverTile = tile;
        } else {
            hoverTile = null;
        }
    }

    function updateZoom(e) {
        e.preventDefault();

        const zoomSpeed = 1.1;
        const oldZoom = zoom;
        let newZoom = zoom;

        if (e.deltaY < 0) newZoom *= zoomSpeed;
        else newZoom /= zoomSpeed;

        newZoom = Math.max(MAX_SCALE, Math.min(MIN_SCALE, newZoom));

        const centerScreenX = 0;
        const centerScreenY = (canvas.height / 3);

        // Get the world point at screen center before zoom
        const worldX = (centerScreenX + cameraX) / oldZoom;
        const worldY = (centerScreenY + cameraY) / oldZoom;

        setZoom(newZoom);

        // Adjust camera so world point stays at screen center after zoom
        cameraX = worldX * newZoom - centerScreenX;
        cameraY = worldY * newZoom - centerScreenY;

        updateScale();
    }

    function handleKeyDown(e) {
        keysPressed[e.key.toLowerCase()] = true;
    }

    function handleKeyUp(e) {
        keysPressed[e.key.toLowerCase()] = false;
    }

    canvas.addEventListener("mousemove", (e) => {
        updateCursor(e);
    });

    canvas.addEventListener("click", () => {
        if (hoverTile) {
            let tile = world[hoverTile.y][hoverTile.x];
            if (tile.tile == "grass") {
                tile.build = "house" + Math.ceil(Math.random() * 6);
            } else if (tile.tile == "sand") {
                tile.build = "dock1";
            }
        }
    });

    canvas.addEventListener("wheel", (e) => {
        updateZoom(e);
        updateCursor(e);
        updateScale();
    });

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}

export function updateCamera(dt) {
    let cs;

    dt = dt / 16;

    if(keysPressed['shift']) {
        cs = cameraSpeed * 2 * dt;
    } else {
        cs = cameraSpeed * dt;
    }

    if (keysPressed['w'] || keysPressed['arrowup']) {
        cameraY -= cs;
    }
    if (keysPressed['s'] || keysPressed['arrowdown']) {
        cameraY += cs;
    }
    if (keysPressed['a'] || keysPressed['arrowleft']) {
        cameraX -= cs;
    }
    if (keysPressed['d'] || keysPressed['arrowright']) {
        cameraX += cs;
    }
}