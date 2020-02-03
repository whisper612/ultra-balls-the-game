import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./field.js";
import { Game } from "./game.js";

export class Tile extends Container {

    private background: Sprite;
    private item: Sprite;
    public type: number;
    private state: number;

    private itemTextures: Texture[] = [
        Game.RES.redBall.texture,
        Game.RES.orangeBall.texture,
        Game.RES.greenBall.texture,
        Game.RES.dkBlueBall.texture,
        Game.RES.blueBall.texture,
        Game.RES.purpleBall.texture,
    ];

    protected pressedAlpha: number = 0.4; 

    constructor (type: number) {
        super();
      
        this.background = new Sprite(Game.RES.field.texture);
        this.addChild(this.background);

        this.item = new Sprite();
        this.item.scale.set(0.8);
        this.item.anchor.set(0.5);
        this.item.position.set(75 / 2, 75 / 2);
        this.item.interactive = true;
        this.item.buttonMode = true;

        this.item.on("mouseover", function () {
            this.item.alpha = 0.75;
        }.bind(this));
        
        this.item.on("mouseout", function () {
            this.item.alpha = 1;
        }.bind(this));

        this.item.on("mousedown", function () {
            this.item.alpha = this.pressedAlpha;
        }.bind(this));

        this.item.texture = this.itemTextures[type];

        this.addChild(this.item);

    }
}