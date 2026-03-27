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
    ui: {},
};

// dependencies
assets.misc.cursor = loadImage("assets/cursor.png");

// ground
assets.tile.grass = loadImage("assets/tile_1.png");
assets.tile.stone = loadImage("assets/tile_2.png");
assets.tile.water = loadImage("assets/tile_3.png");
assets.tile.sand = loadImage("assets/tile_4.png");
assets.tile.water_dark = loadImage("assets/tile_7.png");
assets.tile.water_darker = loadImage("assets/tile_6.png");


// builds
assets.build.nature1 = loadImage("assets/nature_1.png");
assets.build.nature2 = loadImage("assets/nature_2.png");
assets.build.nature3 = loadImage("assets/nature_3.png");
assets.build.nature4 = loadImage("assets/nature_4.png");
assets.build.nature5 = loadImage("assets/nature_5.png");
assets.build.nature6 = loadImage("assets/nature_6.png");

assets.build.house1 = loadImage("assets/build_1.png");
assets.build.house2 = loadImage("assets/build_2.png");
assets.build.house3 = loadImage("assets/build_3.png");
assets.build.house4 = loadImage("assets/build_4.png");
assets.build.house5 = loadImage("assets/build_5.png");
assets.build.house6 = loadImage("assets/build_6.png");
assets.build.dock1 = loadImage("assets/build_7.png");

// ui
assets.ui.hud1 = loadImage("assets/ui_1.png");
assets.ui.hud2 = loadImage("assets/ui_2.png");
assets.ui.hud3 = loadImage("assets/ui_3.png");