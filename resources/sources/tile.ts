import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./field.js";
import { Game } from "./game.js";

export class Tile extends Container {

    private background: Sprite;
    private item: Sprite;
    private type: number;
    private state: number;

    private itemTextures: Texture[] = [
        Game.RES.redBall.texture,
        Game.RES.orangeBall.texture,
        Game.RES.greenBall.texture,
        Game.RES.dkBlueBall.texture,
        Game.RES.blueBall.texture,
        Game.RES.purpleBall.texture,
    ];

    constructor (type: number) {
        super();
      
        this.background = new Sprite(Game.RES.field.texture);
        this.addChild(this.background);

        this.item = new Sprite(Game.RES.redBall.texture);
        this.item.scale.set(0.8);
        this.item.anchor.set(0.5);
        this.item.position.set(75 / 2, 75 / 2);
        
        console.log(type);
        this.item.texture = this.itemTextures[type];

        this.addChild(this.item);

    }
}