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
define(["require", "exports", "./field.js", "./button.js"], function (require, exports, field_js_1, button_js_1) {
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
            // Res from main loader
            Game.RES = resources;
            // Background draw
            _this.backgroundSprite = new Sprite(Game.RES.background.texture);
            _this.backgroundSprite.width = Game.WIDTH;
            _this.backgroundSprite.height = Game.HEIGHT;
            _this.FIELD = new field_js_1.Field();
            Game.SCORE_TEXT = new Text(Game.SCORE.toString());
            Game.SCORE_TEXT.style = new TextStyle({
                fontSize: 68, fontFamily: "Unispace", fill: '#00ccff', align: "center", fontWeight: "600",
                dropShadow: true,
                dropShadowDistance: 6,
                dropShadowBlur: 5,
            });
            Game.SCORE_TEXT.anchor.set(0.5);
            Game.SCORE_TEXT.position.set(Game.WIDTH / 2, 250);
            _this.startButton = new button_js_1.MenuButton("Start");
            _this.startButton.position.set(Game.WIDTH / 4, 1100);
            _this.settingsButton = new button_js_1.MenuButton("Settings");
            _this.settingsButton.position.set(Game.WIDTH * 0.75, 1100);
            _this.addChild(_this.backgroundSprite);
            _this.addChild(Game.SCORE_TEXT);
            _this.addChild(_this.startButton);
            _this.addChild(_this.settingsButton);
            Sound.registerSound("/resources/assets/sounds/select.mp3", Game.selectSound);
            Sound.registerSound("/resources/assets/sounds/unselect.mp3", Game.unselectSound);
            Sound.registerSound("/resources/assets/sounds/destroy.mp3", Game.destroySound);
            Sound.registerSound("/resources/assets/sounds/press.mp3", Game.pressSound);
            _this.addChild(_this.FIELD);
            createjs.Sound.on("fileload", _this.eventLoad, _this);
            Game.instanceAmbient = createjs.Sound.play("/resources/assets/sounds/ambient.mp3", { loop: 2, duration: 5 });
            return _this;
            // Game.instanceAmbient.on("loop", this.handleSoundLoop);
        }
        Game.prototype.eventKeyboardInput = function (event) {
            if (event.keyCode == 32 && event.type == 'keydown') {
                this.FIELD.destroyMatches(this.FIELD.findMatches());
            }
            if (event.keyCode == 17 && event.type == 'keydown') {
                this.FIELD.dropTiles();
            }
            // public dropTiles() {
        };
        Game.prototype.eventLoad = function () {
            createjs.Sound.play("loop", createjs.Sound.INTERRUPT_ANY, 0, 0, -1, 0.2);
        };
        // Params
        Game.WIDTH = 720;
        Game.HEIGHT = 1280;
        Game.SCORE = 0;
        Game.selectSound = "Select";
        Game.unselectSound = "Unselect";
        Game.destroySound = "Destroy";
        Game.pressSound = "Press";
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map