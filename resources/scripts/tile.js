var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./game.js"], function (require, exports, game_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Container = PIXI.Container;
    var IDLE = 0;
    var SELECTED = 1;
    var Tile = /** @class */ (function (_super) {
        __extends(Tile, _super);
        function Tile(field, type, pos) {
            var _this = _super.call(this) || this;
            _this._itemTextures = [
                // Пустая клетка
                null,
                game_js_1.Game.RES.redBall.texture,
                game_js_1.Game.RES.orangeBall.texture,
                game_js_1.Game.RES.greenBall.texture,
                game_js_1.Game.RES.dkBlueBall.texture,
                game_js_1.Game.RES.blueBall.texture,
                game_js_1.Game.RES.purpleBall.texture,
                game_js_1.Game.RES.whiteBall.texture,
            ];
            _this._fieldTextures = [
                game_js_1.Game.RES.field.texture,
                game_js_1.Game.RES.fieldHighlighted.texture
            ];
            _this.pressedAlpha = 0.4;
            _this.isOver = true;
            _this.isDown = false;
            _this.pos = {
                "x": 0,
                "y": 0
            };
            _this._background = new Sprite(game_js_1.Game.RES.field.texture);
            _this.addChild(_this._background);
            _this.pos.x = pos[0];
            _this.pos.y = pos[1];
            _this.item = new Sprite();
            _this.item.scale.set(0.8);
            _this.item.anchor.set(0.5);
            _this.item.position.set(75 / 2, 75 / 2);
            _this.item.interactive = true;
            _this.item.buttonMode = true;
            _this._field = field;
            _this.setState(IDLE);
            _this.item.on("pointerover", function () {
                if (this._state == IDLE) {
                    this.item.alpha = 0.75;
                }
            }.bind(_this));
            _this.item.on("pointerout", function () {
                if (this._state == IDLE) {
                    this.item.alpha = 1;
                }
            }.bind(_this));
            _this.item.on("pointerdown", function () {
                if (this._state == IDLE) {
                    this.select();
                }
                else {
                    if (this._state == SELECTED) {
                        this.deselect();
                    }
                }
            }.bind(_this));
            _this.item.on("pointerupoutside", function () {
                if (this._state == SELECTED) {
                    this.deselect();
                }
            }.bind(_this));
            _this.setType(type);
            _this.addChild(_this.item);
            return _this;
        }
        Tile.prototype.setState = function (state) {
            this._state = state;
        };
        // Выбор шарика
        Tile.prototype.select = function () {
            if (this._field.selectedTile == null) {
                TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: this.pressedAlpha });
                this._field.selectedTile = this;
                this.setState(SELECTED);
                this._field.highlightNeighbours(this);
                createjs.Sound.play(game_js_1.Game.SELECT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
            }
            else {
                this.swap();
            }
        };
        // Отмена выбора шарика
        Tile.prototype.deselect = function (playSound) {
            if (playSound === void 0) { playSound = true; }
            if (this._field.selectedTile == this) {
                this._field.selectedTile = null;
            }
            this._field.unHighlightNeighbours(this);
            this.setState(IDLE);
            TweenMax.fromTo(this.item, 0.3, { alpha: this.item.alpha }, { alpha: 1 });
            if (playSound) {
                createjs.Sound.play(game_js_1.Game.UNSELECT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
            }
        };
        // Смена позиций двух шариков между друг другом
        Tile.prototype.swap = function () {
            if (this.highlighted) {
                this._field.switchInteractive(false);
                this._field.unHighlightNeighbours(this._field.selectedTile);
                var y1 = (this._field.selectedTile.pos.x - this.pos.x) * 75;
                var x1 = (this._field.selectedTile.pos.y - this.pos.y) * 75;
                this._field.selectedTile.item.alpha = 1;
                this.item.alpha = 1;
                var game = this.parent.parent; // this.parent.parent будет объект типа PIXI.DisplayObject потому что гейм это контейнер, а контейнер это PIXI.DisplayObject
                // по правилам ооп когда достаешь родителя, то его тип будет самый старший из иерархии типов объекта
                // т.е. гейм у нас |
                // PIXI.DisplayObject > PIXI.Container > Gamne
                // this.parent.parent as Game
                // тут мы просим компилятора поверить нам, что тот PIXI.DisplayObject имеет итерацию класса Game
                var tl = new TimelineMax({
                    repeat: 1, repeatDelay: 0.8, onComplete: function () {
                        if (game.state != 2) {
                            var temp = this.type;
                            this.setType(this._field.selectedTile.type);
                            this._field.selectedTile.setType(temp);
                            TweenMax.set(this.item, { x: 37.5, y: 37.5 });
                            TweenMax.set(this._field.selectedTile.item, { x: 37.5, y: 37.5 });
                            this._field.selectedTile.deselect(false);
                            var matches = this._field.findMatches();
                            this._field.animateDestroy(matches);
                        }
                    }.bind(this)
                });
                TweenMax.to(this.item, 0.75, { x: this.item.x + x1, y: this.item.y + y1 });
                TweenMax.to(this._field.selectedTile.item, 0.75, { x: this.item.x - x1, y: this.item.y - y1 });
            }
        };
        // Установка типа шарика
        Tile.prototype.setType = function (t, fall, mult) {
            if (fall === void 0) { fall = 0; }
            if (mult === void 0) { mult = 1; }
            if (fall > 0) {
                TweenMax.fromTo(this.item, fall, { y: this.item.y - 75 * mult }, { y: this.item.y });
            }
            this.type = t;
            this.item.texture = this._itemTextures[this.type];
            this.item.alpha = 1;
            this.item.rotation = 0;
            this.item.scale.set(0.8);
        };
        // Подсветка клетки
        Tile.prototype.highlight = function () {
            if (this._background.texture == this._fieldTextures[0]) {
                this._background.texture = this._fieldTextures[1];
            }
            this.highlighted = true;
        };
        // Отмена подсветки клетки
        Tile.prototype.unHighlight = function () {
            if (this._background.texture == this._fieldTextures[1]) {
                this._background.texture = this._fieldTextures[0];
            }
            this.highlighted = false;
        };
        // Переключатель воздействия на элементы пользователем
        Tile.prototype.switchInteractive = function (interactive) {
            this.item.interactive = interactive;
            this.item.buttonMode = interactive;
        };
        return Tile;
    }(Container));
    exports.Tile = Tile;
});
//# sourceMappingURL=tile.js.map