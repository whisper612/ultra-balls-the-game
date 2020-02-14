import Sprite = PIXI.Sprite;
import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
import { Field } from "./field.js";
import { Game } from "./game.js";
import { Button } from "./button.js";
import { filters } from "pixi.js";

let IDLE: number = 0;
let SELECTED: number = 1;

declare let TweenMax: any;
declare let TimelineMax: any;

export class Tile extends Container {
    public item: Sprite;
    public type: number;
    public highlighted: boolean;
    public pos = {
        "x": 0,
        "y": 0
    }

    private _state: number;
    private _animFilters: ColorMatrixFilter;
    private _selectLight: Graphics;
    private _background: Sprite;
    private _field: Field;
    private _itemTextures: Texture[] = [
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
    private _fieldTextures: Texture[] = [
        Game.RES.field.texture,
        Game.RES.fieldHighlighted.texture
    ];

    protected pressedAlpha: number = 0.3;
    protected isOver: boolean = true;
    protected isDown: boolean = false;

    private setState(state: any): void {
        this._state = state;
    }

    constructor(field: Field, type: number, pos: number[]) {
        super();

        this._animFilters = new ColorMatrixFilter()

        this._background = new Sprite(Game.RES.field.texture);
        this.addChild(this._background);

        this._selectLight = new Graphics();
        this._selectLight.position.x = 0;
        this._selectLight.position.y = 0;
        this._selectLight.lineStyle(0);
        this._selectLight.beginFill(0xffffff, 0.5);
        this._selectLight.drawCircle(0, 0, 30);
        this._selectLight.scale.set(0.8);
        this._selectLight.filters = [this._animFilters];

        this.pos.x = pos[0];
        this.pos.y = pos[1];
        this.item = new Sprite();
        this.item.scale.set(0.8);
        this.item.anchor.set(0.5);
        this.item.position.set(75 / 2, 75 / 2);
        this.item.interactive = true;
        this.item.buttonMode = true;

        this._field = field;

        this.setState(IDLE);

        this.item.on("pointerover", function (): void {
            if (this._state == IDLE) {
                this.item.alpha = 0.75;
            }
        }.bind(this));

        this.item.on("pointerout", function (): void {
            if (this._state == IDLE) {
                this.item.alpha = 1;
            }
        }.bind(this));

        this.item.on("pointerdown", function (): void {
            if (this._state == IDLE) {
                this.select();
            } else {
                if (this._state == SELECTED) {
                    this.deselect();
                }
            }
        }.bind(this));
        this.item.on("pointerupoutside", function (): void {
            if (this._state == SELECTED) {
                this.deselect();
            }
        }.bind(this));

        this.setType(type);
        this.addChild(this.item);
    }

    // Анимация выбранного шарика
    public selectAnimate(count: number): void {

        this._selectLight.scale.x = 1 + Math.sin(count) * 0.05;
        this._selectLight.scale.y = 1 + Math.cos(count) * 0.05;

        count += 0.07;

        this._animFilters.matrix[1] = Math.sin(count) * 3;
        this._animFilters.matrix[2] = Math.cos(count);
        this._animFilters.matrix[3] = Math.cos(count) * 1.5;
        this._animFilters.matrix[4] = Math.sin(count / 3) * 2;
        this._animFilters.matrix[5] = Math.sin(count / 2);
        this._animFilters.matrix[6] = Math.sin(count / 4);

        requestAnimationFrame(this.selectAnimate.bind(this, count));
    }

    // Выбор шарика
    public select(): void {
        if (this._field.selectedTile == null) {
            this.item.addChild(this._selectLight);
            TweenMax.fromTo(this.item.scale, 0.3, { x: 0.8, y: 0.8 }, { x: 0.92, y: 0.92 });
            requestAnimationFrame(this.selectAnimate.bind(this, 0));
            this._field.selectedTile = this;
            this.setState(SELECTED);
            this._field.highlightNeighbours(this, true);
            createjs.Sound.play(Game.SELECT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
        } else {
            if (this.highlighted) {
                this.swap();
            } else {
                let temp = !this._field.areNeighbours(this);
                this._field.selectedTile.deselect();
                if (temp) {
                    this.select();
                }
            }
        }
    }

    // Отмена выбора шарика
    public deselect(playSound: boolean = true): void {
        if (this._field.selectedTile == this) {
            this._field.selectedTile = null;
        }
        this._field.unHighlightNeighbours(this);
        this.setState(IDLE);
        cancelAnimationFrame(0);
        this.item.removeChild(this._selectLight);
        TweenMax.fromTo(this.item.scale, 0.3, { x: 0.92, y: 0.92 }, { x: 0.8, y: 0.8 });
        if (playSound) {
            createjs.Sound.play(Game.UNSELECT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
        }
    }

    // Смена позиций двух шариков между друг другом
    public swap(): void {
        this._field.switchInteractive(false);
        this._field.unHighlightNeighbours(this._field.selectedTile);
        let y1 = (this._field.selectedTile.pos.x - this.pos.x) * 75;
        let x1 = (this._field.selectedTile.pos.y - this.pos.y) * 75;

        this._field.selectedTile.item.alpha = 1;
        this.item.alpha = 1;

        var game: Game = this.parent.parent as Game;

        let tl = new TimelineMax({
            repeat: 1, repeatDelay: 0.8, onComplete: function (): void {
                if (game.state != 2) {
                    let temp = this.type;
                    this.setType(this._field.selectedTile.type);
                    this._field.selectedTile.setType(temp);
                    TweenMax.set(this.item, { x: 37.5, y: 37.5 });
                    TweenMax.set(this._field.selectedTile.item, { x: 37.5, y: 37.5 });
                    this._field.selectedTile.deselect(false);

                    let matches = this._field.findMatches();

                    this._field.animateDestroy(matches);
                }
            }.bind(this)
        });

        TweenMax.to(this.item, 0.75, { x: this.item.x + x1, y: this.item.y + y1 });
        TweenMax.to(this._field.selectedTile.item, 0.75, { x: this.item.x - x1, y: this.item.y - y1 });
    }

    // Установка типа шарика
    public setType(t: number, fall: number = 0, mult: number = 1): void {
        if (fall > 0) {
            TweenMax.fromTo(this.item, fall, { y: this.item.y - 75 * mult }, { y: this.item.y });
        }
        this.type = t;
        this.item.texture = this._itemTextures[this.type];
        this.item.alpha = 1;
        this.item.rotation = 0;
        this.item.scale.set(0.8);
    }

    // Подсветка клетки
    public highlight(hide: boolean = false): void {
        if (this._background.texture == this._fieldTextures[0] && !hide) {
            this._background.texture = this._fieldTextures[1];
        }
        this.highlighted = true;
    }

    // Отмена подсветки клетки
    public unHighlight(): void {
        if (this._background.texture == this._fieldTextures[1]) {
            this._background.texture = this._fieldTextures[0];
        }
        this.highlighted = false;
    }

    // Переключатель воздействия на элементы пользователем
    public switchInteractive(interactive: boolean): void {
        this.item.interactive = interactive;
        this.item.buttonMode = interactive;
    }
}