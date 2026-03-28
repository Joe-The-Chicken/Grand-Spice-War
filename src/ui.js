import { canvas, ctx } from "./config.js";
import { assets, assetData } from "./assets.js";
import { selectedBuild, setSelectedBuild, cameraX, cameraY } from "./input.js";
import { zoom } from "./config.js";
import uiData from "./uiData.js";
import { hasCastle } from "./input.js";

const size = canvas.width * 1/4;
export const UIBoundsY = size * 0.25;
export let UIHover = false;

let mx = 0;
let my = 0;

class Hitbox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(px, py) {
        return px >= this.x && px <= this.x + this.w && py >= this.y && py <= this.y + this.h;
    }
}

class UIButton {
    constructor(img, {pos = { x: 0, y: 0 }, anchor = { x: 0, y: 0 }} = {}, w, h, event) {
        this.img = img;
        this.pos = pos;
        this.anchor = anchor;
        this.w = w;
        this.h = h;

        if(event) {
            canvas.addEventListener("click", (e) => {
                if (this.checkHover()) {
                    event();
                }
            });
        }
    }

    getHitbox() {
        return new Hitbox(
            this.pos.x + (this.anchor.x * canvas.width - this.w * this.anchor.x),
            this.pos.y + (this.anchor.y * canvas.height - this.h * this.anchor.y),
            this.w,
            this.h
        );
    }

    attachEvent(handler) {
        canvas.addEventListener("click", (e) => {
            if (this.checkHover()) {
                handler();
            }
        });
    }

    draw() {
        ctx.drawImage(this.img, this.getHitbox().x, this.getHitbox().y, this.w, this.h);
    }

    checkHover() {
        return this.getHitbox().contains(mx, my);
    }
}

class UIImage {
    constructor({img, getImg}, {pos = { x: 0, y: 0 }, anchor = { x: 0, y: 0 }} = {}, w, h) {
        if(img) {
            this.imgType = "static";
            this.img = img;
        } else {
            this.imgType = "variable";
            this.img = () => getImg();
        }

        this.pos = pos;
        this.anchor = anchor;
        this.w = w;
        this.h = h;
    }

    getHitbox() {
        return new Hitbox(
            this.pos.x + (this.anchor.x * canvas.width - this.w * this.anchor.x),
            this.pos.y + (this.anchor.y * canvas.height - this.h * this.anchor.y),
            this.w,
            this.h
        );
    }

    draw() {
        ctx.drawImage(this.imgType == "variable" ? this.img() : this.img, this.getHitbox().x, this.getHitbox().y, this.w, this.h);
    }

    checkHover() {
        return this.getHitbox().contains(mx, my);
    }
}

class UIText {
    constructor(text, {pos = { x: 0, y: 0 }, anchor = { x: 0, y: 0 }} = {}, font = "16px Tiny5") {
        this.text = text;
        this.pos = pos;
        this.anchor = anchor;
        this.font = font;
    }

    draw() {
        ctx.font = this.font;
        ctx.fillStyle = "white";

        const metrics = ctx.measureText(this.text);
        const textWidth = metrics.width;
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        // Apply anchor (like your buttons do)
        const x = this.pos.x + (this.anchor.x * canvas.width - textWidth * this.anchor.x);
        const y = this.pos.y + (this.anchor.y * canvas.height + textHeight * (1 - this.anchor.y));

        ctx.fillText(this.text, x, y);
    }

    setText(newText) {
        this.text = newText;
    }

    checkHover() {
        return false;
    }
}

let UI = [];
let ActiveUI = [];
let ActiveUI_ID = 0;
let ActiveUI_State = [];

UI.push(new UIImage({img: assets.ui.hud1}, { anchor: { x: 0.5, y: 0 } }, size, size * 0.25));
UI.push(new UIImage({img: assets.ui.hud2}, { anchor: { x: 0.5, y: 1 } }, size * 2, size * 0.25));

UI.push(new UIButton(assets.ui.hud3, { pos: {x: size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: 6 * size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: 11 * size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25));

UI.push(new UIButton(assets.ui.hud3, { pos: {x: -size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: -6 * size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: -11 * size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25));

UI.push(new UIText("SPICETOWN", { pos: { x: 0, y: 2 * size / 64 }, anchor: { x: 0.5, y: 0 } }, `${3 * size / 32}px Tiny5`));
UI.push(new UIText("- SPICETOWN -", { pos: { x: 0, y: 9 * size / 64 }, anchor: { x: 0.5, y: 0 } }, `${3 * size / 64}px Tiny5`));

function createMenu(id, x, anchor_x) {
    if (ActiveUI_ID === id) {
        ActiveUI_ID = 0;
        ActiveUI = [];
        ActiveUI_State = [];
        return;
    }

    ActiveUI = [];
    ActiveUI_State = [];

    const data = uiData[id];

    for (let i = 0; i < data.length; i++) {
        ActiveUI_State[i] = 0;

        ActiveUI.push({
            button: new UIButton(
                (i === data.length - 1 ? assets.ui.hud4 : assets.ui.hud5),
                { pos: { x: x, y: -4 * (i + 1) * size / 16 + size / 64 }, anchor: { x: anchor_x, y: 1 } },
                size * 0.25,
                size * 0.25,
                () => {
                    const state = Math.floor(ActiveUI_State[i]);
                    data[i][state].action();
                }
            ),

            image: new UIImage(
                {
                    getImg: () => {
                        const state = Math.floor(ActiveUI_State[i]);
                        return data[i][state].image();
                    }
                },
                { pos: { x: x - size / 16 + size / 8, y: -4 * (i + 1) * size / 16 + size / 64 - size / 16 + 5 * size / 32 }, anchor: { x: anchor_x, y: 1 } },
                size / 32 * data[i][0].data().menuScale,
                3 * size / 32 * data[i][0].data().menuScale
            )
        });
    }

    ActiveUI_ID = id;
}


UI[2].attachEvent(() => {
    createMenu(1, size / 16, 0);
});

UI[3].attachEvent(() => {
    createMenu(2, 6 * size / 16, 0);
});

UI[4].attachEvent(() => {
    createMenu(3, 11 * size / 16, 0);
});

UI[5].attachEvent(() => {
    createMenu(4, -size / 16, 1);
});

UI[6].attachEvent(() => {
    createMenu(5, -6 * size / 16, 1);
});

UI[7].attachEvent(() => {
    createMenu(6, -11 * size / 16, 1);
});

function updateTexts() {
    const centerScreenX = 0;
    const centerScreenY = (canvas.height / 3);

    const worldX = 2 * (centerScreenX + cameraX) / zoom;
    const worldY = 2 * (centerScreenY + cameraY) / zoom;

    UI[8].setText(Math.round(worldX) + ", " + Math.round(512 - worldY));
}

export function drawUI() {
    if(!hasCastle) return;
    
    UIHover = false;

    updateTexts();
    for(let element of ActiveUI) {
        element.button.draw();
        element.image.draw();
        if(element.button.checkHover()) {
            UIHover = true;
        }
    }
    for(let element of UI) {
        element.draw();
        if(element.checkHover()) {
            UIHover = true;
        }
    }
}

canvas.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
});

canvas.addEventListener("wheel", (e) => {
    const data = uiData[ActiveUI_ID];

    for (let i = 0; i < ActiveUI.length; i++) {
        const item = ActiveUI[i];

        if (item.button.checkHover()) {
            ActiveUI_State[i] -= e.deltaX / 30;

            const max = data[i].length;
            if (ActiveUI_State[i] < 0) ActiveUI_State[i] = max - 1;
            if (ActiveUI_State[i] >= max) ActiveUI_State[i] = 0;
        }
    }
});