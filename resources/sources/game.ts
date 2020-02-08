import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Container = PIXI.Container;
import Sound = createjs.Sound;
import { Field } from "./field.js";
import { Switcher } from "./switcher.js"
import { MenuButton } from "./button.js"
declare let TweenLite: any;

export class Game extends Container {

    // Params
    public static WIDTH: number = 720;
    public static HEIGHT: number = 1280;
    public static MULT: number;
    public static SCORE: number;
    public static RES: any;

    private FIELD: Field;
    private backgroundSprite: Sprite;
    public static SCORE_TEXT: Text;
    public static MULT_TEXT: Text;
    public static TIMER_TEXT: Text;
    public soundSwitcher: Switcher;
    public restartButton: MenuButton;

    private _time: number;

    public static selectSound: any = "Select";
    public static unselectSound: any = "Unselect"
    public static destroySound: any = "Destroy"
    public static pressSound: any = "Press"
    public static ambientSound: any = "Ambient";

    public static GAMEOVER: boolean;

    constructor(resources: any) {
        super();
        // Res from main loader
        Game.RES = resources;
        Game.SCORE = 0;
        Game.GAMEOVER = false;
        Game.MULT = 0;
        // Game.timer = new ///...
        // Background draw
        this.backgroundSprite = new Sprite(Game.RES.background.texture);
        this.backgroundSprite.width = Game.WIDTH;
        this.backgroundSprite.height = Game.HEIGHT;
        this.backgroundSprite.alpha = 0.6;
        
        this.FIELD = new Field();
        
        Game.SCORE_TEXT = new Text(Game.SCORE.toString());
        Game.SCORE_TEXT.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });
        Game.SCORE_TEXT.anchor.set(0.5);
        Game.SCORE_TEXT.position.set(Game.WIDTH / 2, 300);

        Game.MULT_TEXT = new Text("x1");
        Game.MULT_TEXT.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });
        Game.MULT_TEXT.anchor.set(0.5);
        Game.MULT_TEXT.position.set(Game.WIDTH / 2, Game.HEIGHT - 120);
        Game.MULT_TEXT.alpha = 0;
        
        Game.TIMER_TEXT = new Text("-:--");
        Game.TIMER_TEXT.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });
        Game.TIMER_TEXT.anchor.set(0.5);
        Game.TIMER_TEXT.position.set(Game.WIDTH * 0.8, 150);
        
        this.soundSwitcher = new Switcher(Game.RES.soundSwitcherOn.texture, Game.RES.soundSwitcherOff.texture);
        this.soundSwitcher.position.set(Game.WIDTH * 0.2, 140);
        this.soundSwitcher.scale.set(0.8);

        this.restartButton = new MenuButton("RESTART");
        // this.restartButton.position.set(Game.WIDTH * 0.5, Game.HEIGHT * 0.65);
        this.restartButton.on('click', function() {
            let game: Game = new Game(Game.RES);
            this.parent.addChild(game);
            this.destroy();
        }.bind(this));

        
        this.addChild(this.backgroundSprite);
        this.addChild(Game.SCORE_TEXT);
        this.addChild(Game.MULT_TEXT);
        this.addChild(Game.TIMER_TEXT);
        
        Sound.registerSound("/resources/assets/sounds/ambient.mp3", Game.ambientSound);
        Sound.registerSound("/resources/assets/sounds/select.mp3", Game.selectSound);
        Sound.registerSound("/resources/assets/sounds/unselect.mp3", Game.unselectSound);
        Sound.registerSound("/resources/assets/sounds/destroy.mp3", Game.destroySound);
        Sound.registerSound("/resources/assets/sounds/press.mp3", Game.pressSound);
        Sound.on("fileload", this.eventLoad, Game.ambientSound);
        this.addChild(this.FIELD);
        this.addChild(this.soundSwitcher);

        setTimeout(function () {
            this.addChild(Game.SCORE_TEXT);
            this.FIELD.destroyField();
            this.FIELD.generateField();
        }.bind(this), 200);
    }

    public startTimer()
    {
        this._time = 301;
        setInterval(function () {
            this.timerUpdate();
        }.bind(this), 1000);
        this.timerUpdate();
    }

    public eventKeyboardInput(event: KeyboardEvent): void {
        // public dropTiles() {
    }

    public eventLoad() {
        createjs.Sound.play(Game.ambientSound, createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.5);
    }

    public timerUpdate()
    {
        this._time -= 1;
        if (this._time == 0)
        {
            this.FIELD.switchInteractive(false);
            TweenLite.to(this.FIELD, 2, {alpha: 0});
            TweenLite.to(Game.SCORE_TEXT, 2, {x: Game.WIDTH/2, y: Game.HEIGHT * 0.45});
            TweenLite.to(Game.SCORE_TEXT.scale, 2, {x: 1.5, y: 1.5});
            Game.GAMEOVER = true;
            this.addChild(this.restartButton);
            this.restartButton.sprite.interactive = false;
            TweenLite.fromTo(this.restartButton, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT - 300, alpha: 0}, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.55, alpha: 1} );
            Game.WIDTH * 0.5, Game.HEIGHT * 0.65

            setTimeout(function () {
                this.restartButton.sprite.interactive = true;
            }.bind(this), 2000);
        }
        if (this._time < 0) return;
        
        var sec = this._time % 60;
        var min = (this._time - sec) / 60;

        var kostil = (sec < 10) ? "0" : "";
        
        Game.TIMER_TEXT.text = min.toString() + ":" + kostil + sec.toString(); 

    }
}