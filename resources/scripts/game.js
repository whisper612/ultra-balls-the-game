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
define(["require", "exports", "./field.js", "./switcher.js", "./button.js"], function (require, exports, field_js_1, switcher_js_1, button_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var Container = PIXI.Container;
    var Sound = createjs.Sound;
    var IDLE = 0;
    var INGAME = 1;
    var GAMEOVER = 2;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(resources) {
            var _this = _super.call(this) || this;
            _this._timeToPlay = 300;
            Game.RES = resources;
            _this._score = 0;
            _this._combo = 0;
            _this._state = IDLE;
            _this._backgroundSprite = new Sprite(Game.RES.background.texture);
            _this._backgroundSprite.width = Game.WIDTH;
            _this._backgroundSprite.height = Game.HEIGHT;
            _this._backgroundSprite.alpha = 0.6;
            _this.on("eventStartTimer", _this.startTimer);
            _this.on("eventComboEnd", _this.comboEnd);
            _this.on("eventComboUp", _this.comboUp);
            _this._field = new field_js_1.Field();
            _this._scoreText = new Text(_this._score.toString());
            _this._scoreText.style = new TextStyle({
                fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5,
            });
            _this._scoreText.anchor.set(0.5);
            _this._scoreText.position.set(Game.WIDTH / 2, 300);
            _this._comboText = new Text("x1");
            _this._comboText.style = new TextStyle({
                fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5,
            });
            _this._comboText.anchor.set(0.5);
            _this._comboText.position.set(Game.WIDTH / 2, Game.HEIGHT - 120);
            _this._comboText.alpha = 0;
            _this._timerText = new Text("-:--");
            _this._timerText.style = new TextStyle({
                fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5
            });
            _this._timerText.anchor.set(0.5);
            _this._timerText.position.set(Game.WIDTH * 0.8, 150);
            _this._soundSwitcher = new switcher_js_1.Switcher(Game.RES.soundSwitcherOn.texture, Game.RES.soundSwitcherOff.texture);
            _this._soundSwitcher.position.set(Game.WIDTH * 0.2, 140);
            _this._soundSwitcher.scale.set(0.8);
            _this._restartButton = new button_js_1.MenuButton("RESTART");
            _this._restartButton.on('click', function () {
                var game = new Game(Game.RES);
                this.parent.addChild(game);
                this.destroy();
            }.bind(_this));
            Sound.registerSound("/resources/assets/sounds/ambient.mp3", Game.AMBIENT_SOUND);
            Sound.registerSound("/resources/assets/sounds/select.mp3", Game.SELECT_SOUND);
            Sound.registerSound("/resources/assets/sounds/unselect.mp3", Game.UNSELECT_SOUND);
            Sound.registerSound("/resources/assets/sounds/destroy.mp3", Game.DESTROY_SOUND);
            Sound.registerSound("/resources/assets/sounds/press.mp3", Game.PRESS_SOUND);
            Sound.on("fileload", _this.eventLoad, Game.AMBIENT_SOUND);
            _this.addChild(_this._backgroundSprite);
            _this.addChild(_this._field);
            _this.addChild(_this._comboText);
            _this.addChild(_this._timerText);
            _this.addChild(_this._soundSwitcher);
            // Задержка падения шариков после начала игры
            var tl = new TimelineMax({
                repeat: 1, repeatDelay: 0.2, onComplete: function () {
                    this.addChild(this._scoreText);
                    this._field.generateField();
                }.bind(_this)
            });
            return _this;
        }
        Object.defineProperty(Game.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Game.prototype.comboEnd = function () {
            this._combo = 0;
            TweenMax.to(this._comboText, 0.5, { alpha: 0 });
            if (this._state == GAMEOVER) {
                this.endGame();
            }
        };
        Game.prototype.comboUp = function () {
            if (this._combo == 0) {
                TweenMax.to(this._comboText, 0.2, { alpha: 1 });
            }
            else {
                TweenMax.fromTo(this._comboText.scale, 1, { x: 1, y: 1 }, { x: 0.75, y: 0.75 });
            }
            this._combo += 1;
            this._comboText.text = "x" + this._combo.toString();
            this._score += 50 * this._combo;
            this._scoreText.text = this._score.toString();
        };
        // Обработчик проигрывания фоновой музыки
        Game.prototype.eventLoad = function () {
            createjs.Sound.play(Game.AMBIENT_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.5);
        };
        // Старт таймера ограничения времени игры
        Game.prototype.startTimer = function () {
            this._time = this._timeToPlay;
            this._state = INGAME;
            this.setTimerText();
            this._timer = new TimelineMax({ repeat: this._timeToPlay, repeatDelay: 1, onComplete: this.onTimerEnd.bind(this), onRepeat: this.onTimerTick.bind(this) });
        };
        // Установка времени на таймере
        Game.prototype.setTimerText = function () {
            var sec = this._time % 60;
            var min = (this._time - sec) / 60;
            var keyChar = (sec < 10) ? "0" : "";
            this._timerText.text = min.toString() + ":" + keyChar + sec.toString();
        };
        // Обработчик обновления таймера
        Game.prototype.onTimerTick = function () {
            this._time -= 1;
            this.setTimerText();
        };
        // Перерисовка текстового поля после окончания таймера
        Game.prototype.onTimerEnd = function () {
            this._time = 0;
            this.setTimerText();
            this._state = GAMEOVER;
            // not in combo
            if (this._combo == 0) {
                this.endGame();
            }
        };
        Game.prototype.endGame = function () {
            this._field.switchInteractive(false);
            TweenMax.to(this._field, 2, { alpha: 0 });
            TweenMax.to(this._scoreText, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.45 });
            TweenMax.to(this._scoreText.scale, 2, { x: 1.5, y: 1.5 });
            this.addChild(this._restartButton);
            this._restartButton.sprite.interactive = false;
            var tl = new TimelineMax({
                onComplete: function () {
                    this._restartButton.sprite.interactive = true;
                }.bind(this)
            });
            tl.fromTo(this._restartButton, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT - 300, alpha: 0 }, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.55, alpha: 1 });
        };
        Game.WIDTH = 720;
        Game.HEIGHT = 1280;
        Game.SELECT_SOUND = "Select";
        Game.UNSELECT_SOUND = "Unselect";
        Game.DESTROY_SOUND = "Destroy";
        Game.PRESS_SOUND = "Press";
        Game.AMBIENT_SOUND = "Ambient";
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map