import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Container = PIXI.Container;
import Sound = createjs.Sound;
import { Field } from "./field.js";
import { MenuButton } from "./button.js"

export class Game extends Container {

    // Params
    public static WIDTH: number = 720;
    public static HEIGHT: number = 1280;
    public static SCORE: number = 0;
    public static RES: any;

    private FIELD: Field;
    private backgroundSprite: Sprite;
    public static SCORE_TEXT: Text;
    public startButton: MenuButton;
    public settingsButton: MenuButton;

    public static selectSound: any = "Select";
    public static unselectSound: any = "Unselect"
    public static destroySound: any = "Destroy"
    public static pressSound: any = "Press"
    public static ambientSound: any = "Ambient";
    

    constructor(resources: any) {
        super();
        // Res from main loader
        Game.RES = resources;

        // Background draw
        this.backgroundSprite = new Sprite(Game.RES.background.texture);
        this.backgroundSprite.width = Game.WIDTH;
        this.backgroundSprite.height = Game.HEIGHT;

        this.FIELD = new Field();

        Game.SCORE_TEXT = new Text(Game.SCORE.toString());
        Game.SCORE_TEXT.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });
        Game.SCORE_TEXT.anchor.set(0.5);
        Game.SCORE_TEXT.position.set(Game.WIDTH / 2, 250);

        this.startButton = new MenuButton("Start");
        this.startButton.position.set(Game.WIDTH / 4, 1100);
        
        this.settingsButton = new MenuButton("Settings");
        this.settingsButton.position.set(Game.WIDTH * 0.75, 1100);
        
        this.addChild(this.backgroundSprite);
        this.addChild(Game.SCORE_TEXT);
        this.addChild(this.startButton);
        this.addChild(this.settingsButton);

        Sound.on("fileload", this.eventLoad, this);
        Sound.registerSound("/resources/assets/sounds/select.mp3", Game.selectSound);
        Sound.registerSound("/resources/assets/sounds/unselect.mp3", Game.unselectSound);
        Sound.registerSound("/resources/assets/sounds/destroy.mp3", Game.destroySound);
        Sound.registerSound("/resources/assets/sounds/press.mp3", Game.pressSound);
        Sound.registerSound("/resources/assets/sounds/ambient.mp3", Game.ambientSound);
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

    public eventLoad() {
        createjs.Sound.play(Game.ambientSound, createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.2);
    }
}