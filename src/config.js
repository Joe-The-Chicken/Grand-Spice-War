export const canvas = document.getElementById("viewport");
export const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export let TILE_W, TILE_H, IMAGE_W, IMAGE_H;

export let zoom = 64;
export const MAX_SCALE = 8;
export const MIN_SCALE = 128;

export const setZoom = function(a) {zoom = a;}

export const MAP_W = 128;
export const MAP_H = 128;

export const updateScale = function() {
    TILE_W = 1 * zoom;
    TILE_H = 0.5 * zoom;
    IMAGE_W = 1 * zoom;
    IMAGE_H = 2 * zoom;
}

export const offsetX = canvas.width / 2;
export const offsetY = 100;