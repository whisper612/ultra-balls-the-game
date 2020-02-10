import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./field.js";
import { Game } from "./game.js";
import { Button } from "./button.js";

declare let TweenLite: any; // https://greensock.com/forums/topic/15365-not-able-to-move-div-in-angular-2/

export class Tile extends Container {
    private item: Sprite;
    private background: Sprite;
    private itemTextures: Texture[] = [
        // Пустая клетка
        null,
        Game.RES.redBall.texture,
        Game.RES.orangeBall.texture,
        Game.RES.greenBall.texture,
        Game.RES.dkBlueBall.texture,
        Game.RES.blueBall.texture,
        Game.RES.purpleBall.texture,
        Game.RES.whiteBall.texture,
    ];
    private fieldTextures: Texture[] = [
        Game.RES.field.texture,
        Game.RES.fieldHighlighted.texture
    ];
    
    protected pressedAlpha: number = 0.4;
    protected isOver: boolean = true;
    protected isDown: boolean = false;
    
    private state: number;
    private _field: Field; 
    private States = {
        "IDLE": 1,
        "SELECTED": 2,
        "DISABLED": 3
    }

    public pos = {
        "x": 0,
        "y": 0
    }
    public type: number;
    public highlighted: boolean;

    private setState(state: any):void {
        this.state = state;
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
            if (this.state == this.States.IDLE) {
                this.item.alpha = 0.75;
            }
        }.bind(this));
        
        this.item.on("pointerout", function (): void {
            if (this.state == this.States.IDLE) {
                this.item.alpha = 1;
            }
        }.bind(this));        
        
        this.item.on("pointerdown", function (): void {
            if (this.state == this.States.IDLE) {
                this.select();
            } else {
                if (this.state == this.States.SELECTED) {
                    this.deselect();                    
                }
            }
        }.bind(this));
        
        this.item.on("pointerupoutside", function (): void {
            if (this.state == this.States.SELECTED) {
                this.deselect();
            }
        }.bind(this));
        
        this.setType(type);
        this.addChild(this.item);
    }
        
    // Выбор шарика
    public select() {
        if(this._field.selectedTile == null) {
            TweenLite.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: this.pressedAlpha});
            this._field.selectedTile = this;
            this.setState(this.States.SELECTED);
            this._field.highlightNeighbours(this);
            createjs.Sound.play(Game.selectSound, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
        } else {
            this.swap();
        }
    }

    // Отмена выбора шарика
    public deselect(playSound: boolean = true) {
        if (this._field.selectedTile == this) {
            this._field.selectedTile = null;
        }
        this._field.unHighlightNeighbours(this);
        this.setState(this.States.IDLE);
        TweenLite.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: 1 });
        if (playSound) {
            createjs.Sound.play(Game.unselectSound, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
        }
    }

    // Смена позиций двух шариков между друг другом
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

            setTimeout(function () {
                let temp = this.type;
                this.setType(this._field.selectedTile.type);
                this._field.selectedTile.setType(temp);
                TweenLite.set(this.item, {x: 37.5, y: 37.5});
                TweenLite.set(this._field.selectedTile.item, { x: 37.5, y: 37.5});
                this._field.selectedTile.deselect(false);

                var matches = this._field.findMatches();

                this._field.animateDestroy(matches);

            }.bind(this), 800);
        }
    }
        
    // Установка типа шарика
    public setType(t: number, fall: number = 0, mult: number = 1) {
        if (fall > 0) {
            TweenLite.fromTo(this.item, fall, { y: this.item.y - 75 * mult }, { y: this.item.y});
        } 
        this.type = t;
        this.item.texture = this.itemTextures[this.type];
        this.item.alpha = 1;
        this.item.rotation = 0;
        this.item.scale.set(0.8);
    }

    // Подсветка клетки
    public highlight() {
        if (this.background.texture == this.fieldTextures[0]) {
            this.background.texture = this.fieldTextures[1];
        }
        this.highlighted = true;
    }
    
    // Отмена подсветки клетки
    public unHighlight() {
        if (this.background.texture == this.fieldTextures[1]){
            this.background.texture = this.fieldTextures[0];
        }
        this.highlighted = false;
    }

    // Переключатель воздействия на элементы пользователем
    public switchInteractive (interactive: boolean) {
        this.item.interactive = interactive;
        this.item.buttonMode = interactive;
    }
}