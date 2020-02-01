define(["require", "exports", "./game.js"], function (require, exports, game_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = PIXI.Application;
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
    loader.add("menuButtonNormal", "assets/images/buttons/menuButtonNormal.png");
    loader.add("menuButtonPress", "assets/images/buttons/menuButtonPress.png");
    loader.add("lvlNormal", "assets/images/buttons/lvlNormal.png");
    loader.add("lvlPress", "assets/images/buttons/lvlPress.png");
    loader.load(setup);
    // Create a Pixi Application
    var app = new Application({
        backgroundColor: 0x03172C,
        antialias: true,
        transparent: false,
        resolution: 1
    });
    // App settings
    function eventListenerResize() {
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);
        var scale = Math.min(window.innerWidth / game_js_1.Game.WIDTH, window.innerHeight / game_js_1.Game.HEIGHT);
        app.stage.x = (window.innerWidth - game_js_1.Game.WIDTH * scale) / 2;
        app.stage.y = (window.innerHeight - game_js_1.Game.HEIGHT * scale) / 2;
        app.stage.scale.x = scale;
        app.stage.scale.y = scale;
        app.render();
    }
    eventListenerResize();
    window.onresize = eventListenerResize;
    // Add the canvas that Pixi automatically created
    document.body.appendChild(app.view);
    function setup(loader, resources) {
        var game = new game_js_1.Game(resources);
        app.stage.addChild(game);
    }
});
//# sourceMappingURL=main.js.map