import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./field.js";
import { Game } from "./game.js";
import { Button } from "./button.js";

declare let TweenLite: any; // https://greensock.com/forums/topic/15365-not-able-to-move-div-in-angular-2/

export class Tile extends Container {

    // Params
    private background: Sprite;
    private item: Sprite;
    public type: number;
    public highlighted: boolean;
    private state: number;

    // Game res array
    private itemTextures: Texture[] = [
        null,
        Game.RES.redBall.texture,
        Game.RES.orangeBall.texture,
        Game.RES.greenBall.texture,
        Game.RES.dkBlueBall.texture,
        Game.RES.blueBall.texture,
        Game.RES.purpleBall.texture,
    ];

    private fieldTextures: Texture[] = [
        Game.RES.field.texture,
        Game.RES.fieldHighlighted.texture
    ];

    private States = {
        "IDLE": 1,
        "SELECTED": 2,
        "DISABLED": 3
    }


    protected pressedAlpha: number = 0.4;
    protected isOver: boolean = true;
    protected isDown: boolean = false;

    private _state: number;
    private _field: Field;
    public pos = {
        "x": 0,
        "y": 0
    }

    private setState(state: any):void
    {
        this._state = state;
    }
    
    constructor (field: Field, type: number, pos: number[]) {
        super();
      
        this.background = new Sprite(Game.RES.field.texture);
        this.addChild(this.background);

        this.pos.x = pos[0];
        this.pos.y = pos[1];
        this.item = new Sprite();
        this.item.scale.set(0.8);
        this.item.anchor.set(0.5);
        this.item.position.set(75 / 2, 75 / 2);
        this.item.interactive = true;
        this.item.buttonMode = true;

        this._field = field;

        this.setState(this.States.IDLE);

        this.item.on("pointerover", function (): void {
        if (this._state == this.States.IDLE)
            this.item.alpha = 0.75;
        }.bind(this));
        
        this.item.on("pointerout", function (): void {
            if (this._state == this.States.IDLE)
            this.item.alpha = 1;
        }.bind(this));        
        
        this.item.on("pointerdown", function (): void {
            if (this._state == this.States.IDLE)
            this.select();
            else if (this._state == this.States.SELECTED)
            this.deselect();
        }.bind(this));
        
        this.item.on("pointerup", function (): void {
            
        }.bind(this));
        
        this.item.on("pointerupoutside", function (): void {
            if (this._state == this.States.SELECTED)
            this.deselect();
        }.bind(this));
        
        this.setType(type);
        
        this.addChild(this.item);
            
    }
        
    public select()
    {
        if(this._field.selectedTile == null)
        {
            TweenLite.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: this.pressedAlpha});
            this._field.selectedTile = this;
            this.setState(this.States.SELECTED);
            // this.item.alpha = this.pressedAlpha;
            this._field.highlightNeighbours(this);
            createjs.Sound.play(Game.selectSound, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.35);

            
        }
        else
        {
            this.swap();
        }
    }

    public deselect()
    {
        if (this._field.selectedTile == this)
        {
            this._field.selectedTile = null;
        }
        this._field.unHighlightNeighbours(this);
        this.setState(this.States.IDLE);
        // this.item.alpha = 1;
        TweenLite.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: 1 });
        createjs.Sound.play(Game.unselectSound, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.35);
    }


    public swap() {
        if (this.highlighted) {
            this._field.switchInteractive(false);
            this._field.unHighlightNeighbours(this._field.selectedTile);
            var y1 = (this._field.selectedTile.pos.x - this.pos.x) * 75;
            var x1 = (this._field.selectedTile.pos.y - this.pos.y) * 75;

            this._field.selectedTile.item.alpha = 1;
            this.item.alpha = 1;

            TweenLite.to(this.item, 0.75, { x: this.item.x + x1, y: this.item.y + y1});
            TweenLite.to(this._field.selectedTile.item, 0.75, { x: this.item.x - x1, y: this.item.y - y1});

            console.log("Swapped");

            setTimeout(function () {
                let temp = this.type;
                this.setType(this._field.selectedTile.type);
                this._field.selectedTile.setType(temp);
                TweenLite.set(this.item, {x: 37.5, y: 37.5});
                TweenLite.set(this._field.selectedTile.item, { x: 37.5, y: 37.5});
                this._field.selectedTile.deselect();

                var matches = this._field.findMatches();

                this._field.animateDestroy(matches);

            }.bind(this), 800);
        } else
            console.log("Can't swap");
    }
        

    public setType(t: number, fall: number = 0, mult: number = 1)
    {
        if (fall > 0){
            TweenLite.fromTo(this.item, fall, { y: this.item.y - 75 * mult }, { y: this.item.y});
            this.type = t;
            this.item.texture = this.itemTextures[this.type];
            this.item.alpha = 1;
        } else {            
            this.type = t;
            this.item.texture = this.itemTextures[this.type];
            this.item.alpha = 1;
        }
    }

    public highlight()
    {
        if (this.background.texture == this.fieldTextures[0]) {
            this.background.texture = this.fieldTextures[1];
        }
        this.highlighted = true;
        
    }
    
    public unHighlight() {
        if (this.background.texture == this.fieldTextures[1]){
            this.background.texture = this.fieldTextures[0];
        }
        this.highlighted = false;
    }

    public switchInteractive (interactive: boolean)
    {
        this.item.interactive = interactive;
        this.item.buttonMode = interactive;
    }
}