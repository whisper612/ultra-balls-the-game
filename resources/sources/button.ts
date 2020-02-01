import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import { Game } from "./game.js";

export class Button extends Container {

    private sprite: Sprite;
    private normalTexture: Texture;
    private pressTexture: Texture;
    protected text: Text;
    protected pressedAlpha: number = 0.4; 

    constructor(_norm : Texture, _pressed: Texture, _text: string, 
        _fonstSize: number, _fill: string , _align: string) {
        super();
        this.sprite = new Sprite();
        this.setAnchor(0.5, 0.5);
        this.sprite.interactive = true;
        this.sprite.buttonMode = true;
        this.normalTexture = _norm;
        this.pressTexture = _pressed;

        this.text = new Text(_text);
        this.text.anchor.set(0.5, 0.5);
        this.text.position.set(0, this.sprite.height / 2);
        this.text.style = new TextStyle({ fontSize: _fonstSize, fontFamily: "Sans", fill: _fill, align: _align, fontWeight: "400", 
                                        dropShadow: false});
        this.setShadowEffects();
        this.sprite.on("mouseover", function() {
            this.setPressStyle();
        }.bind(this));
        this.sprite.on("mouseout", function () {
            if (this.alpha == 1)
            {
                this.setNormalStyle();
            }
        }.bind(this));

        this.sprite.on("mousedown", function () {
            this.alpha = this.pressedAlpha;
        }.bind(this));
        
        this.sprite.on("mouseupoutside", function () {
            this.alpha = 1;
            if (this.sprite.texture == this.pressTexture)
            {
                this.setNormalStyle()
            }
        }.bind(this));

        this.sprite.on("mouseup", function () {
            this.sprite.interactive = false;
            this.emit("click");
            setTimeout(function() {
                this.alpha = 1;
                this.sprite.interactive = true;
            }.bind(this), 50);
        }.bind(this));
        

        this.sprite.texture = this.normalTexture;
        this.addChild(this.sprite);
        this.addChild(this.text);
    }

    public setAnchor(x:number, y:number) {
        this.sprite.anchor.set(x, y);
    }

    public setNormalStyle()
    {
        this.sprite.texture = this.normalTexture;
        this.text.style.fontWeight = "400";
        this.text.style.dropShadow = false;
    }

    public setPressStyle()
    {
        this.sprite.texture = this.pressTexture;
        this.text.style.fontWeight = "500";
        this.text.style.dropShadow = true;
    }

    public setShadowEffects()
    {
        this.text.style.dropShadowDistance = 6;
        this.text.style.dropShadowBlur = 5;
    }

    public reset()
    {
        this.setNormalStyle();
        this.sprite.interactive = true;
        this.alpha = 1;
    }
}

export class LvlButton extends Button {
    constructor(text: string, _fonstSize: number = 36, 
                _fill: string = '#00ccff', _align: string = "center") {
        super(Game.RES.lvlNormal.texture, Game.RES.lvlPress.texture, text, 
                _fonstSize, _fill, _align);
    }

    public setShadowEffects()
    {
        this.text.style.dropShadowDistance = 2;
        this.text.style.dropShadowBlur = 3;
    }
}

export class MenuButton extends Button {
    constructor(text: string, _fonstSize: number = 48, 
        _fill: string = '#00ccff', _align: string = "center") {
        super(Game.RES.menuButtonNormal.texture, Game.RES.menuButtonPress.texture, text, 
                _fonstSize, _fill, _align);
    }
}