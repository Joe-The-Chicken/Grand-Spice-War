import { canvas, IMAGE_W, IMAGE_H, TILE_W, TILE_H, MAP_W, MAP_H, MIN_SCALE, MAX_SCALE } from "./config.js";
import { isoToCart } from "./iso.js";
import { zoom, setZoom, updateScale } from "./config.js";
import { world } from "./world.js";

export let mouseX = 0;
export let mouseY = 0;
export let hoverTile = null;

export function setupInput() {
    function updateCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY - IMAGE_H + TILE_H;

        const tile = isoToCart(mouseX, mouseY);

        if (tile.x >= 0 && tile.y >= 0 && tile.x < MAP_W && tile.y < MAP_H) {
            hoverTile = tile;
        } else {
            hoverTile = null;
        }
    }

    function updateZoom(e) {
        e.preventDefault();

        let z = zoom;

        const zoomSpeed = 1.1;

        if (e.deltaY < 0) {
            z *= zoomSpeed;
        } else {
            z /= zoomSpeed;
        }

        // clamp zoom
        setZoom(Math.max(MAX_SCALE, Math.min(MIN_SCALE, z)));
    }

    canvas.addEventListener("mousemove", (e) => {
        updateCursor(e);
    });

    canvas.addEventListener("click", () => {
        if (hoverTile) {
            world[hoverTile.y][hoverTile.x].build = "house1";
        }
    });

    canvas.addEventListener("wheel", (e) => {
        updateZoom(e);
        updateCursor(e);
        updateScale();
    });
}

