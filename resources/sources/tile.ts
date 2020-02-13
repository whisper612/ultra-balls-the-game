import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./field.js";
import { Game } from "./game.js";
import { Button } from "./button.js";

let IDLE: number = 0;
let SELECTED: number = 1;

declare let TweenMax: any;
declare let TimelineMax: any;

export class Tile extends Container {
    public item: Sprite;
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
    private _state: number;

    protected pressedAlpha: number = 0.3;
    protected isOver: boolean = true;
    protected isDown: boolean = false;

    public pos = {
        "x": 0,
        "y": 0
    }
    public type: number;
    public highlighted: boolean;

    private setState(state: any): void {
        this._state = state;
    }

    constructor(field: Field, type: number, pos: number[]) {
        super();

        this._background = new Sprite(Game.RES.field.texture);
        this.addChild(this._background);

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

    // Выбор шарика
    public select(): void {
        if (this._field.selectedTile == null) {
            TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: this.pressedAlpha });
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
        TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: 1 });
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

    // 3) Убрать выделение с клеток, вместо этого чётко выделять выбранный шар можно начать с этого он хочет чтоб не клетка светилась а шарик ? Да, чтобы не было подсказок ваще принял.  можем функционал подсказок оставть в коде, но просто не юзать. двруг пригодится потом ++
    // Первый шар можно выбрать всегда, если клик происходит в клетку, куда поставить шар нельзя, то выбор сбрасывается. При первом выбранном шаре можно переключиться на любой другой, который дальше соседней клетки.
    // Вот тут сложно но ща поясню. Чё он хочет. Корч. 
    // 1)При нажатии на шар, он выделяется в любом случае, но только он.
    // 2)При клике в соседнюю клетку, он свапнется только в случае верной комбинации, если !комбинации, то прозойдёт анпик шарик
    // 3)При клике дальше соседней клетки  i+2 должен происходить репик на кликнутый шар
    // Как-то так
    // понял, есть идея как подсвечивать шарики.энивей надо зарезать до 75 мы же скейлим на 0.8 да, знаю. но это ты сам протом сможешь сделать, а это залуп,

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