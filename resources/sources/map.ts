import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import { LvlButton, MenuButton } from "./button.js";
import { Game } from "./game.js";

export class Map extends Container {

    private buttons: LvlButton[];
    private back: MenuButton;

    constructor(game: Game) {
        super();
        this.buttons = new Array<LvlButton>(10);

        for (let i = 0; i < this.buttons.length; i++) {
            let element = this.buttons[i];
            element = new LvlButton((i + 1).toString());
            element.scale.set(1.25, 1.25);
            element.position.set(200 + i * 75 - (i % 2) * 75, (i % 2) * 125 + 375);
            element.on('click', function () {
                console.log("Loading level: " + (i + 1).toString());
                game.showField(i);
            }.bind(this));
            this.addChild(element);
        }

        this.back = new MenuButton("Menu");
        this.back.position.set(512, 900);
        this.back.on('click', function() {
            game.backToMenu();
        }.bind(this));
        this.addChild(this.back);

        this.on('added', function() {
            this.redraw()
        }.bind(this));
    }

    public redraw() {
        // for (let i = 0; i < this.buttons.length; i++) {
        //     if (this.buttons[i])
        //         this.buttons[i].setNormalStyle();
        // }

        this.back.reset();
    }

}