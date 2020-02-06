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
    var Text = PIXI.Text;
    var TextStyle = PIXI.TextStyle;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(_norm, _pressed, _text, _fonstSize, _fill, _align) {
            var _this = _super.call(this) || this;
            _this.pressedAlpha = 0.4;
            // Stock button params
            _this.sprite = new Sprite();
            _this.setAnchor(0.5, 0.5);
            _this.sprite.interactive = true;
            _this.sprite.buttonMode = true;
            // Texture resieving from parametrs
            _this.normalTexture = _norm;
            _this.pressTexture = _pressed;
            // Stock text params
            _this.text = new Text(_text);
            _this.text.anchor.set(0.5, 0.5);
            _this.text.position.set(0, _this.sprite.height / 2);
            _this.text.style = new TextStyle({ fontSize: _fonstSize, fontFamily: "Unispace", fill: _fill, align: _align, fontWeight: "400",
                dropShadow: false });
            _this.setShadowEffects();
            // Events listeners for buttons
            _this.sprite.on("pointerover", function () {
                this.setPressStyle();
            }.bind(_this));
            _this.sprite.on("pointerout", function () {
                if (this.alpha == 1) {
                    this.setNormalStyle();
                }
            }.bind(_this));
            _this.sprite.on("pointerdown", function () {
                this.alpha = this.pressedAlpha;
            }.bind(_this));
            _this.sprite.on("pointerupoutside", function () {
                this.alpha = 1;
                if (this.sprite.texture == this.pressTexture) {
                    this.setNormalStyle();
                }
            }.bind(_this));
            _this.sprite.on("pointerup", function () {
                this.sprite.interactive = false;
                this.emit("click");
                setTimeout(function () {
                    this.alpha = 1;
                    this.sprite.interactive = true;
                }.bind(this), 50);
            }.bind(_this));
            _this.sprite.texture = _this.normalTexture;
            _this.addChild(_this.sprite);
            _this.addChild(_this.text);
            return _this;
        }
        Button.prototype.setAnchor = function (x, y) {
            this.sprite.anchor.set(x, y);
        };
        // Functions for customzing buttons
        Button.prototype.setNormalStyle = function () {
            this.sprite.texture = this.normalTexture;
            this.text.style.fontWeight = "400";
            this.text.style.dropShadow = false;
        };
        Button.prototype.setPressStyle = function () {
            this.sprite.texture = this.pressTexture;
            this.text.style.fontWeight = "500";
            this.text.style.dropShadow = true;
        };
        Button.prototype.setShadowEffects = function () {
            this.text.style.dropShadowDistance = 6;
            this.text.style.dropShadowBlur = 5;
        };
        Button.prototype.reset = function () {
            this.setNormalStyle();
            this.sprite.interactive = true;
            this.alpha = 1;
        };
        return Button;
    }(Container));
    exports.Button = Button;
    var MenuButton = /** @class */ (function (_super) {
        __extends(MenuButton, _super);
        function MenuButton(text, _fonstSize, _fill, _align) {
            if (_fonstSize === void 0) { _fonstSize = 48; }
            if (_fill === void 0) { _fill = '#00ccff'; }
            if (_align === void 0) { _align = "center"; }
            return _super.call(this, game_js_1.Game.RES.menuButtonNormal.texture, game_js_1.Game.RES.menuButtonPress.texture, text, _fonstSize, _fill, _align) || this;
        }
        return MenuButton;
    }(Button));
    exports.MenuButton = MenuButton;
});
//# sourceMappingURL=button.js.map