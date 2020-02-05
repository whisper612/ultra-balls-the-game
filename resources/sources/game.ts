import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Container = PIXI.Container;
import { Field } from "./field.js";

export class Game extends Container {

    // Params
    public static WIDTH: number = 1024;
    public static HEIGHT: number = 1024;
    public static SCORE: number = 0;
    public static RES: any; 

    private FIELD: Field;
    private backgroundSprite: Sprite;
    public static SCORE_TEXT: Text;

    constructor(resources: any) {
        super();
        // Res from main loader
        Game.RES = resources;

        // Bacground draw
        this.backgroundSprite = new Sprite(Game.RES.background.texture);
        this.backgroundSprite.width = Game.WIDTH;
        this.backgroundSprite.height = Game.HEIGHT;

        this.FIELD = new Field();

        Game.SCORE_TEXT = new Text(Game.SCORE.toString());
        Game.SCORE_TEXT.anchor.set(0.5);
        Game.SCORE_TEXT.position.set(Game.WIDTH/2, 100);
        
        this.addChild(this.backgroundSprite);
        this.addChild(Game.SCORE_TEXT);
        this.addChild(this.FIELD);
    }

    public eventKeyboardInput(event: KeyboardEvent): void {
        if (event.keyCode == 32 && event.type == 'keydown') {
            this.FIELD.destroyMatches(this.FIELD.findMatches());
        }
        if (event.keyCode == 17 && event.type == 'keydown') {
            this.FIELD.dropTiles();
        }
        // public dropTiles() {


        
    }
}