define(["require", "exports", "./game.js"], function (require, exports, game_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Loader = PIXI.Loader;
    var loader = new Loader();
    loader.add("redBall", "assets/images/balls/redBall.png");
    loader.add("orangeBall", "assets/images/balls/orangeBall.png");
    loader.add("greenBall", "assets/images/balls/greenBall.png");
    loader.add("dkBlueBall", "assets/images/balls/dkBlueBall.png");
    loader.add("blueBall", "assets/images/balls/blueBall.png");
    loader.add("purpleBall", "assets/images/balls/purpleBall.png");
    loader.add("background", "assets/images/field/background.png");
    loader.add("field", "assets/images/field/field.png");
    loader.add("startButtonNormal", "assets/images/buttons/startButtonNormal.png");
    loader.load(setup);
    function setup() {
        var game = new game_js_1.Game();
    }
});
//# sourceMappingURL=main.js.map