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

// misc
assets.misc.cursor = loadImage("assets/misc/cursor.png");

// ground
assets.tile.void = loadImage("assets/tile/tile_0.png");
assets.tile.grass = loadImage("assets/tile/tile_1.png");
assets.tile.dirt = loadImage("assets/tile/tile_2.png");
assets.tile.sand = loadImage("assets/tile/tile_3.png");
assets.tile.stone = loadImage("assets/tile/tile_4.png");
assets.tile.water = loadImage("assets/tile/tile_5.png");
assets.tile.water_dark = loadImage("assets/tile/tile_6.png");
assets.tile.water_darker = loadImage("assets/tile/tile_7.png");

// builds
assets.build.nature1 = loadImage("assets/nature/nature_1.png");
assets.build.nature2 = loadImage("assets/nature/nature_2.png");
assets.build.nature3 = loadImage("assets/nature/nature_3.png");
assets.build.nature4 = loadImage("assets/nature/nature_4.png");
assets.build.nature5 = loadImage("assets/nature/nature_5.png");
assets.build.nature6 = loadImage("assets/nature/nature_6.png");

assets.build.house1 = loadImage("assets/build/build_1.png");
assets.build.house2 = loadImage("assets/build/build_2.png");
assets.build.house3 = loadImage("assets/build/build_3.png");
assets.build.house4 = loadImage("assets/build/build_4.png");
assets.build.house5 = loadImage("assets/build/build_5.png");
assets.build.house6 = loadImage("assets/build/build_6.png");

assets.build.dock1 = loadImage("assets/build/build_7.png");
assets.build.lighthouse1_0 = loadImage("assets/build/build_8-0.png");
assets.build.lighthouse1_1 = loadImage("assets/build/build_8-1.png");
assets.build.lighthouse1_2 = loadImage("assets/build/build_8-2.png");
assets.build.lighthouse1_3 = loadImage("assets/build/build_8-3.png");

// ui
assets.ui.hud1 = loadImage("assets/ui/ui_1.png");
assets.ui.hud2 = loadImage("assets/ui/ui_2.png");
assets.ui.hud3 = loadImage("assets/ui/ui_3.png");