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
define(["require", "exports", "./field.js"], function (require, exports, field_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Text = PIXI.Text;
    var Container = PIXI.Container;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(resources) {
            var _this = _super.call(this) || this;
            // Res from main loader
            Game.RES = resources;
            // Bacground draw
            _this.backgroundSprite = new Sprite(Game.RES.background.texture);
            _this.backgroundSprite.width = Game.WIDTH;
            _this.backgroundSprite.height = Game.HEIGHT;
            _this.FIELD = new field_js_1.Field();
            Game.SCORE_TEXT = new Text(Game.SCORE.toString());
            Game.SCORE_TEXT.anchor.set(0.5);
            Game.SCORE_TEXT.position.set(Game.WIDTH / 2, 100);
            _this.addChild(_this.backgroundSprite);
            _this.addChild(Game.SCORE_TEXT);
            _this.addChild(_this.FIELD);
            return _this;
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
        // Params
        Game.WIDTH = 1024;
        Game.HEIGHT = 1024;
        Game.SCORE = 0;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map