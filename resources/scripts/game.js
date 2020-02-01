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
define(["require", "exports", "./menu.js", "./map.js", "./field.js"], function (require, exports, menu_js_1, map_js_1, field_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Sprite = PIXI.Sprite;
    var Container = PIXI.Container;
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(resources) {
            var _this = _super.call(this) || this;
            Game.RES = resources;
            _this.MENU = new menu_js_1.Menu(_this);
            _this.MAP = new map_js_1.Map(_this);
            _this.FIELD = new field_js_1.Field(_this);
            _this.backgroundSprite = new Sprite(Game.RES.background.texture);
            _this.backgroundSprite.width = Game.WIDTH;
            _this.backgroundSprite.height = Game.HEIGHT;
            _this.addChild(_this.backgroundSprite);
            _this.addChild(_this.MENU);
            return _this;
        }
        Game.prototype.showMap = function () {
            this.removeChild(this.MENU);
            this.addChild(this.MAP);
        };
        Game.prototype.backToMenu = function () {
            this.removeChild(this.MAP);
            this.addChild(this.MENU);
        };
        Game.prototype.showField = function (index) {
            this.removeChild(this.MAP);
            this.FIELD.loadLevel(index);
            this.addChild(this.FIELD);
        };
        // Params
        Game.WIDTH = 1024;
        Game.HEIGHT = 1024;
        return Game;
    }(Container));
    exports.Game = Game;
});
//# sourceMappingURL=game.js.map