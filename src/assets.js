function loadImage(src) {
    let img = new Image();
    img.src = src;
    return img;
}

// === LOAD IMAGES ===
export const assets = {
    misc: {},
    tile: {},
    build: {},
};

// dependencies
assets.misc.cursor = loadImage("assets/cursor.png");

// ground
assets.tile.grass = loadImage("assets/tile_1.png");
assets.tile.stone = loadImage("assets/tile_2.png");
assets.tile.water = loadImage("assets/tile_3.png");
assets.tile.sand = loadImage("assets/tile_4.png");

// builds
assets.build.house1 = loadImage("assets/build_1.png");
