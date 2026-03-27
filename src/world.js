import { MAP_W, MAP_H } from "./config.js";
import { makeNoise2D } from "./noise.js";

export let world = [];

let rand = null;
let heightmap1 = makeNoise2D(randInt(1, 99999999), 0.01);
let heightmap2 = makeNoise2D(randInt(1, 99999999), 0.03);
let heightmap3 = makeNoise2D(randInt(1, 99999999), 0.09);
let heightmap = function(x,y) {
    return (6*heightmap1(x,y) + 3*heightmap2(x,y) + heightmap3(x,y)) / 10;
}

let biomemap1 = makeNoise2D(randInt(1, 99999999), 0.01);
let biomemap2 = makeNoise2D(randInt(1, 99999999), 0.05);
let biomemap3 = makeNoise2D(randInt(1, 99999999), 0.15);
let biomemap = function(x,y) {
    return (3*biomemap1(x,y) + 2*biomemap2(x,y) + biomemap3(x,y)) / 6;
}

export function initWorld(seed) {
    initRandom(seed);
    initGrid();
}

// == INIT FUNCTIONS ==
function initRandom(seed) {
    // Force seed into 32-bit unsigned int
    let s = seed >>> 0;

    rand = function () {
        s += 0x6D2B79F5;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function initGrid() {
    world = [];
    for (let y = 0; y < MAP_H; y++) {
        world[y] = [];
        for (let x = 0; x < MAP_W; x++) {
            world[y][x] = {
                height: heightmap(x, y),
                tile: "",
                build: "",
            };
        }
    }
    
    for (let y = 0; y < MAP_H; y++) {
        for (let x = 0; x < MAP_W; x++) {
            const h = world[y][x].height;

            if (h < 0) {
                if(h < -0.07) {
                    if(h < -0.13) {
                        world[y][x].tile = "water_darker";
                    } else {
                        world[y][x].tile = "water_dark";
                    }
                } else {
                    world[y][x].tile = "water";
                }
            } else {
                const isShore = isAdjacentToWater(x, y);
                if(isShore) {
                    world[y][x].tile = "sand";
                } else {
                    world[y][x].tile = "grass";
                    if(biomemap(x,y) > 0) {
                        world[y][x].build = "nature" + Math.ceil(Math.random() * 6);
                    } else if(Math.random() > 0.9 && biomemap(x,y) > -0.2) {
                        world[y][x].build = "nature" + (4 + Math.ceil(Math.random() * 2));
                    }
                }
            }
        }
    }
}

function isAdjacentToWater(x, y) {
    const dirs = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue;

        if (heightmap(nx, ny) < 0) {
            return true;
        }
    }

    return false;
}

function randRange(min, max) {
    return min + Math.random() * (max - min);
}

function randInt(min, max) {
    return Math.floor(randRange(min, max + 1));
}