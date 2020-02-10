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
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(resources) {
            var _this = _super.call(this) || this;
            Game.RES = resources;
            Game.SCORE = 0;
            Game.GAMEOVER = false;
            Game.MULT = 0;
            _this.backgroundSprite = new Sprite(Game.RES.background.texture);
            _this.backgroundSprite.width = Game.WIDTH;
            _this.backgroundSprite.height = Game.HEIGHT;
            _this.backgroundSprite.alpha = 0.6;
            _this.FIELD = new field_js_1.Field();
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
            _this.soundSwitcher = new switcher_js_1.Switcher(Game.RES.soundSwitcherOn.texture, Game.RES.soundSwitcherOff.texture);
            _this.soundSwitcher.position.set(Game.WIDTH * 0.2, 140);
            _this.soundSwitcher.scale.set(0.8);
            _this.restartButton = new button_js_1.MenuButton("RESTART");
            _this.restartButton.on('click', function () {
                var game = new Game(Game.RES);
                this.parent.addChild(game);
                this.destroy();
            }.bind(_this));
            Sound.registerSound("/resources/assets/sounds/ambient.mp3", Game.ambientSound);
            Sound.registerSound("/resources/assets/sounds/select.mp3", Game.selectSound);
            Sound.registerSound("/resources/assets/sounds/unselect.mp3", Game.unselectSound);
            Sound.registerSound("/resources/assets/sounds/destroy.mp3", Game.destroySound);
            Sound.registerSound("/resources/assets/sounds/press.mp3", Game.pressSound);
            Sound.on("fileload", _this.eventLoad, Game.ambientSound);
            _this.addChild(_this.backgroundSprite);
            _this.addChild(Game.MULT_TEXT);
            _this.addChild(Game.TIMER_TEXT);
            _this.addChild(_this.FIELD);
            _this.addChild(_this.soundSwitcher);
            // Задержка падения шариков после начала игры
            setTimeout(function () {
                this.addChild(Game.SCORE_TEXT);
                this.FIELD.destroyField();
                this.FIELD.generateField();
            }.bind(_this), 200);
            return _this;
        }
        // Обработчик проигрывания фоновой музыки
        Game.prototype.eventLoad = function () {
            createjs.Sound.play(Game.ambientSound, createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.5);
        };
        // Старт таймера ограничения времени игры
        Game.prototype.startTimer = function () {
            this._time = 301;
            setInterval(function () {
                this.timerUpdate();
            }.bind(this), 1000);
            this.timerUpdate();
        };
        // Обработчик обновления таймера
        Game.prototype.timerUpdate = function () {
            this._time -= 1;
            if (this._time == 0) {
                this.FIELD.switchInteractive(false);
                TweenLite.to(this.FIELD, 2, { alpha: 0 });
                TweenLite.to(Game.SCORE_TEXT, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.45 });
                TweenLite.to(Game.SCORE_TEXT.scale, 2, { x: 1.5, y: 1.5 });
                Game.GAMEOVER = true;
                this.addChild(this.restartButton);
                this.restartButton.sprite.interactive = false;
                TweenLite.fromTo(this.restartButton, 2, { x: Game.WIDTH / 2, y: Game.HEIGHT - 300, alpha: 0 }, { x: Game.WIDTH / 2, y: Game.HEIGHT * 0.55, alpha: 1 });
                Game.WIDTH * 0.5, Game.HEIGHT * 0.65;
                setTimeout(function () {
                    this.restartButton.sprite.interactive = true;
                }.bind(this), 2000);
            }
            if (this._time < 0)
                return;
            var sec = this._time % 60;
            var min = (this._time - sec) / 60;
            var kostil = (sec < 10) ? "0" : "";
            Game.TIMER_TEXT.text = min.toString() + ":" + kostil + sec.toString();
        };
        Game.WIDTH = 720;
        Game.HEIGHT = 1280;
        Game.selectSound = "Select";
        Game.unselectSound = "Unselect";
        Game.destroySound = "Destroy";
        Game.pressSound = "Press";
        Game.ambientSound = "Ambient";
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map