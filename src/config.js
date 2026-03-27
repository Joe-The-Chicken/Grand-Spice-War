export const canvas = document.getElementById("viewport");
export const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

export let TILE_W, TILE_H, IMAGE_W, IMAGE_H;

export let zoom = 36;
export const MAX_SCALE = 32;
export const MIN_SCALE = 196;

export const setZoom = function(a) {zoom = a;}

export const MAP_W = 1024;
export const MAP_H = 1024;

export const updateScale = function() {
    TILE_W = 1 * zoom;
    TILE_H = 0.5 * zoom;
    IMAGE_W = 1 * zoom;
    IMAGE_H = 3 * zoom;
}

export const offsetX = canvas.width / 2;
export const offsetY = 100;