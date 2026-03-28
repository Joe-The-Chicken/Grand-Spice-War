import { canvas, ctx } from "./config.js";
import { assets } from "./assets.js";
import { selectedBuild, setSelectedBuild, cameraX, cameraY } from "./input.js";
import { zoom } from "./config.js";

const size = canvas.width * 1/4;
export const UIBoundsY = size * 0.25;

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
    constructor(img, {pos = { x: 0, y: 0 }, anchor = { x: 0, y: 0 }} = {}, w, h) {
        this.img = img;
        this.pos = pos;
        this.anchor = anchor;
        this.w = w;
        this.h = h;
        this.hitbox = new Hitbox(
            pos.x + (anchor.x * canvas.width - w * anchor.x),
            pos.y + (anchor.y * canvas.height - h * anchor.y),
            w,
            h
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
        ctx.drawImage(this.img, this.hitbox.x, this.hitbox.y, this.w, this.h);
    }

    checkHover() {
        return this.hitbox.contains(mx, my);
    }
}

class UIImage {
    constructor(img, {pos = { x: 0, y: 0 }, anchor = { x: 0, y: 0 }} = {}, w, h) {
        this.img = img;
        this.pos = pos;
        this.anchor = anchor;
        this.w = w;
        this.h = h;
        this.hitbox = new Hitbox(
            pos.x + (anchor.x * canvas.width - w * anchor.x),
            pos.y + (anchor.y * canvas.height - h * anchor.y),
            w,
            h
        );
    }

    draw() {
        ctx.drawImage(this.img, this.hitbox.x, this.hitbox.y, this.w, this.h);
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
}

let UI = [];
UI.push(new UIImage(assets.ui.hud1, { anchor: { x: 0.5, y: 0 } }, size, size * 0.25));
UI.push(new UIImage(assets.ui.hud2, { anchor: { x: 0.5, y: 1 } }, size * 2, size * 0.25));

UI.push(new UIButton(assets.ui.hud3, { pos: {x: size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: 6 * size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: 11 * size / 16, y: 0}, anchor: { x: 0, y: 1 } }, size * 0.25, size * 0.25));

UI.push(new UIButton(assets.ui.hud3, { pos: {x: -size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: -6 * size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25));
UI.push(new UIButton(assets.ui.hud3, { pos: {x: -11 * size / 16, y: 0}, anchor: { x: 1, y: 1 } }, size * 0.25, size * 0.25));

UI.push(new UIText("SPICETOWN", { pos: { x: 0, y: 2 * size / 64 }, anchor: { x: 0.5, y: 0 } }, `${3 * size / 32}px Tiny5`));
UI.push(new UIText("- SPICETOWN -", { pos: { x: 0, y: 9 * size / 64 }, anchor: { x: 0.5, y: 0 } }, `${3 * size / 64}px Tiny5`));


UI[2].attachEvent(() => {
    if(selectedBuild) {
        setSelectedBuild();
    } else {
        setSelectedBuild("house1");
    }
});

UI[3].attachEvent(() => {
    if(selectedBuild) {
        setSelectedBuild();
    } else {
        setSelectedBuild("house2");
    }
});

UI[4].attachEvent(() => {
    if(selectedBuild) {
        setSelectedBuild();
    } else {
        setSelectedBuild("house3");
    }
});

UI[5].attachEvent(() => {
    if(selectedBuild) {
        setSelectedBuild();
    } else {
        setSelectedBuild("dock1");
    }
});

UI[6].attachEvent(() => {
    if(selectedBuild) {
        setSelectedBuild();
    } else {
        setSelectedBuild("lighthouse1");
    }
});

UI[7].attachEvent(() => {
    if(selectedBuild) {
        setSelectedBuild();
    } else {
        setSelectedBuild("");
    }
});

function updateTexts() {
    const centerScreenX = 0;
    const centerScreenY = (canvas.height / 3);

    const worldX = 2 * (centerScreenX + cameraX) / zoom;
    const worldY = 2 * (centerScreenY + cameraY) / zoom;

    UI[8].setText(Math.round(worldX) + ", " + Math.round(512 - worldY));
}

export function drawUI() {
    updateTexts();
    for(let element of UI) {
        element.draw();
    }
}

canvas.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
});