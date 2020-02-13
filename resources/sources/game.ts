import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Container = PIXI.Container;
import Sound = createjs.Sound;
import { Field } from "./field.js";
import { Switcher } from "./switcher.js";
import { MenuButton } from "./button.js";
declare let TweenMax: any;
declare let TimelineMax: any;

let IDLE: number = 0;
let INGAME: number = 1;
let GAMEOVER: number = 2;

export class Game extends Container {
    public static WIDTH: number = 720;
    public static HEIGHT: number = 1280;
    public static RES: any;

    public static SELECT_SOUND: any = "Select";
    public static UNSELECT_SOUND: any = "Unselect"
    public static DESTROY_SOUND: any = "Destroy"
    public static PRESS_SOUND: any = "Press"
    public static AMBIENT_SOUND: any = "Ambient";

    private _field: Field;
    private _backgroundSprite: Sprite;
    private _soundSwitcher: Switcher;
    private _restartButton: MenuButton;
    private _timer: any;
    private _time: number;
    private _timeToPlay: number = 180;
    private _combo: number;
    private _comboText: Text;
    private _score: number;
    private _scoreText: Text;
    private _timerText: Text;
    private _state: number;

    public get state(): number {
        return this._state;
    }

    constructor(resources: any) {
        super();
        Game.RES = resources;
        this._score = 0;
        this._combo = 0;

        this._state = IDLE;

        this._backgroundSprite = new Sprite(Game.RES.background.texture);
        this._backgroundSprite.width = Game.WIDTH;
        this._backgroundSprite.height = Game.HEIGHT;
        this._backgroundSprite.alpha = 0.6;

        this.on("eventStartTimer", this.startTimer);
        this.on("eventComboEnd", this.comboEnd);
        this.on("eventComboUp", this.comboUp);

        this._field = new Field();

        this._scoreText = new Text(this._score.toString());
        this._scoreText.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });
        this._scoreText.anchor.set(0.5);
        this._scoreText.position.set(Game.WIDTH / 2, 300);

        this._comboText = new Text("x1");
        this._comboText.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5,
        });
        this._comboText.anchor.set(0.5);
        this._comboText.position.set(Game.WIDTH / 2, Game.HEIGHT - 120);
        this._comboText.alpha = 0;

        this._timerText = new Text("-:--");
        this._timerText.style = new TextStyle({
            fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
            dropShadow: true,
            dropShadowDistance: 6,
            dropShadowBlur: 5
        });
        this._timerText.anchor.set(0.5);
        this._timerText.position.set(Game.WIDTH * 0.8, 150);

        this._soundSwitcher = new Switcher(Game.RES.soundSwitcherOn.texture, Game.RES.soundSwitcherOff.texture);
        this._soundSwitcher.position.set(Game.WIDTH * 0.2, 140);
        this._soundSwitcher.scale.set(0.8);

        this._restartButton = new MenuButton("RESTART");
        this._restartButton.on('click', function (): void {
            let game: Game = new Game(Game.RES);
            this.parent.addChild(game);
            this.destroy();
        }.bind(this));

        Sound.registerSound("/resources/assets/sounds/ambient.mp3", Game.AMBIENT_SOUND);
        Sound.registerSound("/resources/assets/sounds/select.mp3", Game.SELECT_SOUND);
        Sound.registerSound("/resources/assets/sounds/unselect.mp3", Game.UNSELECT_SOUND);
        Sound.registerSound("/resources/assets/sounds/destroy.mp3", Game.DESTROY_SOUND);
        Sound.registerSound("/resources/assets/sounds/press.mp3", Game.PRESS_SOUND);
        Sound.on("fileload", this.eventLoad, Game.AMBIENT_SOUND);

        this.addChild(this._backgroundSprite);
        this.addChild(this._field);
        this.addChild(this._comboText);
        this.addChild(this._timerText);
        this.addChild(this._soundSwitcher);


        // Задержка падения шариков после начала игры
        let tl = new TimelineMax({
            repeat: 1, repeatDelay: 0.2, onComplete: function (): void {
                this.addChild(this._scoreText);
                this._field.generateField();
            }.bind(this)
        });
    }

    private comboEnd(): void {
        this._combo = 0;
        TweenMax.to(this._comboText, 0.5, { alpha: 0 });

        if (this._state == GAMEOVER) {
            this.endGame();
        }
    }

    private comboUp(): void {
        if (this._combo == 0) {
            TweenMax.to(this._comboText, 0.2, { alpha: 1 });
        } else {
            TweenMax.fromTo(this._comboText.scale, 1, { x: 1, y: 1 }, { x: 0.75, y: 0.75 })
        }
        this._combo += 1;
        this._comboText.text = "x" + this._combo.toString();
        this._score += 50 * this._combo;
        this._scoreText.text = this._score.toString();
    }

    // Обработчик проигрывания фоновой музыки
    public eventLoad(): void {
        createjs.Sound.play(Game.AMBIENT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.5);
    }

    // Старт таймера ограничения времени игры
    public startTimer(): void {
        this._time = this._timeToPlay;
        this._state = INGAME;
        this.setTimerText();
        this._timer = new TimelineMax({ repeat: this._timeToPlay, repeatDelay: 1, onComplete: this.onTimerEnd.bind(this), onRepeat: this.onTimerTick.bind(this) })
    }

    // Установка времени на таймере
    private setTimerText(): void {
        let sec = this._time % 60;
        let min = (this._time - sec) / 60;
        let keyChar = (sec < 10) ? "0" : "";
        this._timerText.text = min.toString() + ":" + keyChar + sec.toString();
    }

    // Обработчик обновления таймера
    private onTimerTick(): void {
        this._time -= 1;
        this.setTimerText();
    }

    // Перерисовка текстового поля после окончания таймера
    private onTimerEnd(): void {
        this._time = 0;
        this.setTimerText();
        this._state = GAMEOVER;
        // not in combo
        if (this._combo == 0) {
            this.endGame();
        }
    }

    private endGame(): void {
        this._field.switchInteractive(false);

        TweenMax.to(this._field, 2, { alpha: 0 });
        TweenMax.to(this._scoreText, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.45 });
        TweenMax.to(this._scoreText.scale, 2, { x: 1.5, y: 1.5 });
        this.addChild(this._restartButton);
        this._restartButton.sprite.interactive = false;

        let tl = new TimelineMax({
            onComplete: function (): void {
                this._restartButton.sprite.interactive = true;
            }.bind(this)
        });
        tl.fromTo(this._restartButton, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT - 300, alpha: 0 },
            { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.55, alpha: 1 });
    }
}