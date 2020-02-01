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
define(["require", "exports", "./game.js", "./button.js"], function (require, exports, game_js_1, button_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        // public settingsButton: Button;
        function Menu(game) {
            var _this = _super.call(this) || this;
            _this.startButton = new button_js_1.MenuButton("Start");
            // this.settingsButton = new MenuButton("Start");
            _this.startButton.position.set(game_js_1.Game.WIDTH / 2, game_js_1.Game.HEIGHT / 2);
            // this.settingsButton.position.set(Game.WIDTH / 2, Game.HEIGHT / 1.8);
            _this.startButton.on('click', function () {
                game.showMap();
            }.bind(_this));
            // this.settingsButton.on('click', function(){
            // console.log(2);
            // }.bind(this));
            _this.addChild(_this.startButton);
            // this.addChild(this.settingsButton);
            _this.on('added', function () {
                this.redraw();
            }.bind(_this));
            return _this;
        }
        Menu.prototype.redraw = function () {
            this.startButton.reset();
        };
        return Menu;
    }(Container));
    exports.Menu = Menu;
});
//# sourceMappingURL=menu.js.map