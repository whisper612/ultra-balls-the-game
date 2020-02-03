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
define(["require", "exports", "./button.js", "./game.js", "./tile.js"], function (require, exports, button_js_1, game_js_1, tile_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Field = /** @class */ (function (_super) {
        __extends(Field, _super);
        function Field(game, index) {
            var _this = _super.call(this) || this;
            _this.current = 0;
            _this.lvl_1 = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            _this.lvl_2 = [
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            _this.lvl_3 = [
                [0, 1, 0, 0, 0, 0, 1, 0],
                [1, 1, 1, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 1, 1, 1],
                [0, 1, 0, 0, 0, 0, 1, 0]
            ];
            _this.lvl_4 = [
                [0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0]
            ];
            _this.lvl_5 = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            _this.lvl_6 = [
                [0, 0, 1, 0, 0, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0]
            ];
            _this.lvl_7 = [
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            _this.lvl_8 = [
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 0, 0]
            ];
            _this.lvl_9 = [
                [1, 1, 1, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 1, 1, 1]
            ];
            _this.lvl_10 = [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 0, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ];
            _this._levels = [_this.lvl_1, _this.lvl_2, _this.lvl_3, _this.lvl_4, _this.lvl_5,
                _this.lvl_6, _this.lvl_7, _this.lvl_8, _this.lvl_9, _this.lvl_10];
            _this.backButton = new button_js_1.MenuButton("Back to menu");
            _this.backButton.position.set(512, 900);
            _this.current = index;
            _this.backButton.on("click", function () {
                game.backToMap();
            }.bind(_this));
            _this.addChild(_this.backButton);
            _this.on('added', function () {
                this.redraw();
            }.bind(_this));
            return _this;
        }
        Field.prototype.loadLevel = function (index) {
            this.current = index;
        };
        Field.prototype.redraw = function () {
            this.tiles = null;
            this.tiles = new Array(8);
            var tileSize = 75;
            var paddingX = (game_js_1.Game.WIDTH - this._levels[this.current].length * tileSize) / 2;
            var paddingY = (game_js_1.Game.HEIGHT - this._levels[this.current].length * tileSize) / 2;
            for (var i = 0; i < this._levels[this.current].length; i++) {
                this.tiles[i] = new Array(8);
                for (var j = 0; j < this._levels[this.current].length; j++) {
                    if (this._levels[this.current][i][j] == 1) {
                        var type = Math.floor(Math.random() * 6);
                        this.tiles[i][j] = new tile_js_1.Tile(type);
                        this.tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                        this.addChild(this.tiles[i][j]);
                    }
                }
            }
            this.backButton.reset();
        };
        return Field;
    }(Container));
    exports.Field = Field;
});
//# sourceMappingURL=field.js.map