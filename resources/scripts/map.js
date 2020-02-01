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
define(["require", "exports", "./button.js"], function (require, exports, button_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Map = /** @class */ (function (_super) {
        __extends(Map, _super);
        function Map(game) {
            var _this = _super.call(this) || this;
            _this.buttons = new Array(10);
            var _loop_1 = function (i) {
                var element = this_1.buttons[i];
                element = new button_js_1.LvlButton((i + 1).toString());
                element.scale.set(1.25, 1.25);
                element.position.set(200 + i * 75 - (i % 2) * 75, (i % 2) * 125 + 375);
                element.on('click', function () {
                    console.log("Loading level: " + (i + 1).toString());
                    game.showField(i);
                }.bind(this_1));
                this_1.addChild(element);
            };
            var this_1 = this;
            for (var i = 0; i < _this.buttons.length; i++) {
                _loop_1(i);
            }
            _this.back = new button_js_1.MenuButton("Menu");
            _this.back.position.set(512, 900);
            _this.back.on('click', function () {
                game.backToMenu();
            }.bind(_this));
            _this.addChild(_this.back);
            _this.on('added', function () {
                this.redraw();
            }.bind(_this));
            return _this;
        }
        Map.prototype.redraw = function () {
            // for (let i = 0; i < this.buttons.length; i++) {
            //     if (this.buttons[i])
            //         this.buttons[i].setNormalStyle();
            // }
            this.back.reset();
        };
        return Map;
    }(Container));
    exports.Map = Map;
});
//# sourceMappingURL=map.js.map