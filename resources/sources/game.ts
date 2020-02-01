import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import { Menu } from "./menu.js";
import { Map } from "./map.js";
import { Field } from "./field.js";

export class Game extends Container {

    // Params
    public static WIDTH: number = 1024;
    public static HEIGHT: number = 1024;
    public static RES: any; 

    private MENU: Menu;
    private MAP: Map;
    private FIELD: Field;
    private backgroundSprite: Sprite;

    constructor(resources: any) {
        super();
        Game.RES = resources;
        this.MENU = new Menu(this);
        this.MAP = new Map(this);
        this.FIELD = new Field(this);

        this.backgroundSprite = new Sprite(Game.RES.background.texture);
        this.backgroundSprite.width = Game.WIDTH;
        this.backgroundSprite.height = Game.HEIGHT;

        this.addChild(this.backgroundSprite);
        this.addChild(this.MENU);
    }

    public showMap()
    {
        this.removeChild(this.MENU);
        this.addChild(this.MAP);
    }
    
    public backToMenu()
    {
        this.removeChild(this.MAP);
        this.addChild(this.MENU);
    }
    
    public showField(index: number)
    {
        this.removeChild(this.MAP);
        this.FIELD.loadLevel(index);
        this.addChild(this.FIELD);
    }
}