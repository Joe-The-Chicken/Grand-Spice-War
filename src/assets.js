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

assets.build.castle = loadImage("assets/build/castle_1.png");

// === Tiles ===
assets.tile.void = loadImage("assets/tile/tile_0.png");
assets.tile.grass = loadImage("assets/tile/tile_1.png");
assets.tile.dirt = loadImage("assets/tile/tile_2.png");
assets.tile.sand = loadImage("assets/tile/tile_3.png");
assets.tile.stone = loadImage("assets/tile/tile_4.png");
assets.tile.water = loadImage("assets/tile/tile_5.png");
assets.tile.water_dark = loadImage("assets/tile/tile_6.png");
assets.tile.water_darker = loadImage("assets/tile/tile_7.png");

// === Nature ===
assets.build.nature1 = loadImage("assets/nature/nature_1.png");
assets.build.nature2 = loadImage("assets/nature/nature_2.png");
assets.build.nature3 = loadImage("assets/nature/nature_3.png");
assets.build.nature4 = loadImage("assets/nature/nature_4.png");
assets.build.nature5 = loadImage("assets/nature/nature_5.png");
assets.build.nature6 = loadImage("assets/nature/nature_6.png");

// === Houses ===
assets.build.house1_0 = loadImage("assets/build/build_1-0.png");
assets.build.house1_1 = loadImage("assets/build/build_1-1.png");
assets.build.house1_2 = loadImage("assets/build/build_1-2.png");
assets.build.house1_3 = loadImage("assets/build/build_1-3.png");

assets.build.house2_0 = loadImage("assets/build/build_2-0.png");
assets.build.house2_1 = loadImage("assets/build/build_2-1.png");
assets.build.house2_2 = loadImage("assets/build/build_2-2.png");
assets.build.house2_3 = loadImage("assets/build/build_2-3.png");

assets.build.house3_0 = loadImage("assets/build/build_3-0.png");
assets.build.house3_1 = loadImage("assets/build/build_3-1.png");
assets.build.house3_2 = loadImage("assets/build/build_3-2.png");
assets.build.house3_3 = loadImage("assets/build/build_3-3.png");

assets.build.house4_0 = loadImage("assets/build/build_4-0.png");
assets.build.house4_1 = loadImage("assets/build/build_4-1.png");
assets.build.house4_2 = loadImage("assets/build/build_4-2.png");
assets.build.house4_3 = loadImage("assets/build/build_4-3.png");

assets.build.house5_0 = loadImage("assets/build/build_5-0.png");
assets.build.house5_1 = loadImage("assets/build/build_5-1.png");
assets.build.house5_2 = loadImage("assets/build/build_5-2.png");
assets.build.house5_3 = loadImage("assets/build/build_5-3.png");

assets.build.house6_0 = loadImage("assets/build/build_6-0.png");
assets.build.house6_1 = loadImage("assets/build/build_6-1.png");
assets.build.house6_2 = loadImage("assets/build/build_6-2.png");
assets.build.house6_3 = loadImage("assets/build/build_6-3.png");

// === Docks ===
assets.build.dock1_0 = loadImage("assets/build/build_7-0.png");
assets.build.dock1_1 = loadImage("assets/build/build_7-1.png");
assets.build.dock1_2 = loadImage("assets/build/build_7-2.png");
assets.build.dock1_3 = loadImage("assets/build/build_7-3.png");

// === Lighthouses ===
assets.build.lighthouse1_0 = loadImage("assets/build/build_8-0.png");
assets.build.lighthouse1_1 = loadImage("assets/build/build_8-1.png");
assets.build.lighthouse1_2 = loadImage("assets/build/build_8-2.png");
assets.build.lighthouse1_3 = loadImage("assets/build/build_8-3.png");

assets.build.rig1 = loadImage("assets/build/build_9.png");

assets.build.security1 = loadImage("assets/build/build_10.png");
assets.build.security2 = loadImage("assets/build/build_11.png");

// === UI ===
assets.ui.hud1 = loadImage("assets/ui/ui_1.png");
assets.ui.hud2 = loadImage("assets/ui/ui_2.png");
assets.ui.hud3 = loadImage("assets/ui/ui_3.png");
assets.ui.hud4 = loadImage("assets/ui/ui_4.png");
assets.ui.hud5 = loadImage("assets/ui/ui_5.png");

assets.misc.font1 = new FontFace("Tiny5", "url(assets/misc/Tiny5-Regular.ttf)");

assets.misc.font1.load().then((font) => {
    document.fonts.add(font);
});

// === ASSET DATA ===
export const assetData = {
    misc: {},
    tile: {},
    build: {},
    ui: {},
}

class Build {
    constructor({ cost = 0, shore = false, canRotate = true, surfaces = ["grass", "sand"], menuScale = 4 }) {
        this.cost = cost;
        this.canRotate = canRotate;
        this.shore = shore; // has to be built neighboring a shore tile (rot matters)
        this.surfaces = surfaces;
        this.menuScale = menuScale;
    }
}

// Set data
assetData.build.nature1 = new Build({ cost: 0, canRotate: false });
assetData.build.nature2 = new Build({ cost: 0, canRotate: false });
assetData.build.nature3 = new Build({ cost: 0, canRotate: false });
assetData.build.nature4 = new Build({ cost: 0, canRotate: false });
assetData.build.nature5 = new Build({ cost: 0, canRotate: false });
assetData.build.nature6 = new Build({ cost: 0, canRotate: false });

assetData.build.house1 = new Build({ cost: 100 });
assetData.build.house2 = new Build({ cost: 150 });
assetData.build.house3 = new Build({ cost: 200 });
assetData.build.house4 = new Build({ cost: 250 });
assetData.build.house5 = new Build({ cost: 300 });
assetData.build.house6 = new Build({ cost: 350 });

assetData.build.dock1 = new Build({ cost: 500, shore: true, surfaces: ["water", "water_dark", "water_darker"] });

assetData.build.lighthouse1 = new Build({ cost: 800 });

assetData.build.rig1 = new Build({ cost: 500, canRotate: false, surfaces: ["water_darker"] });

assetData.build.security1 = new Build({ cost: 200, canRotate: false });
assetData.build.security2 = new Build({ cost: 300, canRotate: false });