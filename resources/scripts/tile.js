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
    var Graphics = PIXI.Graphics;
    var Container = PIXI.Container;
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var ColorMatrixFilter = PIXI.filters.ColorMatrixFilter;
    var IDLE = 0;
    var SELECTED = 1;
    var Tile = /** @class */ (function (_super) {
        __extends(Tile, _super);
        function Tile(field, type, pos) {
            var _this = _super.call(this) || this;
            _this.pos = {
                "x": 0,
                "y": 0
            };
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
            _this.pressedAlpha = 0.3;
            _this.isOver = true;
            _this.isDown = false;
            _this._animFilters = new ColorMatrixFilter();
            _this._background = new Sprite(game_js_1.Game.RES.field.texture);
            _this.addChild(_this._background);
            _this._selectLight = new Graphics();
            _this._selectLight.position.x = 0;
            _this._selectLight.position.y = 0;
            _this._selectLight.lineStyle(0);
            _this._selectLight.beginFill(0xffffff, 0.5);
            _this._selectLight.drawCircle(0, 0, 30);
            _this._selectLight.scale.set(0.8);
            _this._selectLight.filters = [_this._animFilters];
            _this.counted = false;
            _this.value = 50;
            _this.pos.x = pos[0];
            _this.pos.y = pos[1];
            _this.item = new Sprite();
            _this.item.scale.set(0.8);
            _this.item.anchor.set(0.5);
            _this.item.position.set(75 / 2, 75 / 2);
            _this.item.interactive = true;
            _this.item.buttonMode = true;
            _this._field = field;
            _this._points = new Text();
            _this._points.style = new TextStyle({
                fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5
            });
            _this._points.anchor.set(0.5);
            _this._points.position.set(75 / 2, 75 / 2);
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
            _this.addChild(_this._points);
            _this._points.alpha = 0;
            _this.addChild(_this.item);
            return _this;
        }
        Tile.prototype.setState = function (state) {
            this._state = state;
        };
        // Анимация выбранного шарика
        Tile.prototype.selectAnimate = function (count) {
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
        };
        // Выбор шарика
        Tile.prototype.select = function () {
            if (this._field.selectedTile == null) {
                this.item.addChild(this._selectLight);
                TweenMax.fromTo(this.item.scale, 0.3, { x: 0.8, y: 0.8 }, { x: 0.92, y: 0.92 });
                requestAnimationFrame(this.selectAnimate.bind(this, 0));
                this._field.selectedTile = this;
                this.setState(SELECTED);
                this._field.highlightNeighbours(this, true);
                createjs.Sound.play(game_js_1.Game.SELECT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
            }
            else {
                if (this.highlighted) {
                    this.swap();
                }
                else {
                    var temp = !this._field.areNeighbours(this);
                    this._field.selectedTile.deselect();
                    if (temp) {
                        this.select();
                    }
                }
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
            cancelAnimationFrame(0);
            this.item.removeChild(this._selectLight);
            TweenMax.fromTo(this.item.scale, 0.3, { x: 0.92, y: 0.92 }, { x: 0.8, y: 0.8 });
            if (playSound) {
                createjs.Sound.play(game_js_1.Game.UNSELECT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.05);
            }
        };
        // Взрыв шарика
        Tile.prototype.blow = function (combo) {
            TweenMax.to(this.item, 0.4, { alpha: 0, rotation: 2.5 });
            TweenMax.to(this.item.scale, 0.4, { x: 0, y: 0 });
            this.counted = true;
            this._points.text = (this.value * combo).toString();
            TweenMax.fromTo(this._points, 0.3, { alpha: 0 }, { alpha: 1 });
            TweenMax.fromTo(this._points.scale, 0.3, { x: 0, y: 0 }, { x: 0.4, y: 0.4 });
        };
        // Смена позиций двух шариков между друг другом
        Tile.prototype.swap = function () {
            this._field.switchInteractive(false);
            this._field.unHighlightNeighbours(this._field.selectedTile);
            var y1 = (this._field.selectedTile.pos.x - this.pos.x) * 75;
            var x1 = (this._field.selectedTile.pos.y - this.pos.y) * 75;
            this._field.selectedTile.item.alpha = 1;
            this.item.alpha = 1;
            var game = this.parent.parent;
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
        };
        // Установка типа шарика
        Tile.prototype.setType = function (t, fall, mult) {
            if (fall === void 0) { fall = 0; }
            if (mult === void 0) { mult = 1; }
            if (fall > 0) {
                TweenMax.fromTo(this.item, fall, { y: this.item.y - 75 * mult }, { y: this.item.y });
            }
            if (t == 0 && this.counted) {
                this.counted = false;
                TweenMax.fromTo(this._points, 0.75, { alpha: 1 }, { alpha: 0 });
                TweenMax.fromTo(this._points.scale, 0.75, { x: 0.4, y: 0.4 }, { x: 0, y: 0 });
            }
            this.type = t;
            this.item.texture = this._itemTextures[this.type];
            this.item.alpha = 1;
            this.item.rotation = 0;
            this.item.scale.set(0.8);
        };
        // Подсветка клетки
        Tile.prototype.highlight = function (hide) {
            if (hide === void 0) { hide = false; }
            if (this._background.texture == this._fieldTextures[0] && !hide) {
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