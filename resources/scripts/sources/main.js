define(["require", "exports", "./game.js", "./button.js"], function (require, exports, game_js_1, button_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Application = PIXI.Application;
    var Loader = PIXI.Loader;
    var loader = new Loader();
    //add .png to Pixi loader
    loader.add("redBall", "/resources/assets/images/balls/redBall.png");
    loader.add("orangeBall", "/resources/assets/images/balls/orangeBall.png");
    loader.add("greenBall", "/resources/assets/images/balls/greenBall.png");
    loader.add("dkBlueBall", "/resources/assets/images/balls/dkBlueBall.png");
    loader.add("blueBall", "/resources/assets/images/balls/blueBall.png");
    loader.add("purpleBall", "/resources/assets/images/balls/purpleBall.png");
    loader.add("background", "/resources/assets/images/field/background.png");
    loader.add("field", "/resources/assets/images/field/field.png");
    loader.add("fieldHighlighted", "/resources/assets/images/field/field_highlighted.png");
    loader.add("menuButtonNormal", "/resources/assets/images/buttons/menuButtonNormal.png");
    loader.add("menuButtonPress", "/resources/assets/images/buttons/menuButtonPress.png");
    loader.add("lvlNormal", "/resources/assets/images/buttons/lvlNormal.png");
    loader.add("lvlPress", "/resources/assets/images/buttons/lvlPress.png");
    loader.add("playButtonNormal", "/resources/assets/images/buttons/playButtonNormal.png");
    loader.add("playButtonPressed", "/resources/assets/images/buttons/playButtonPressed.png");
    loader.add("soundSwitcherOff", "/resources/assets/images/buttons/soundButtonOff.png");
    loader.add("soundSwitcherOn", "/resources/assets/images/buttons/soundButtonOn.png");
    loader.load(setup);
    // Create a Pixi Application
    var app = new Application({
        // backgroundColor: 0x210f39,
        antialias: true,
        transparent: true,
        resolution: 1,
    });
    var loadGameButton;
    // App sizing
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
    function setup(loader, resources) {
        document.body.appendChild(app.view);
        loadGameButton = new button_js_1.Button(resources.playButtonNormal.texture, resources.playButtonPressed.texture);
        loadGameButton.position.set(game_js_1.Game.WIDTH / 2, game_js_1.Game.HEIGHT / 2);
        loadGameButton.on('click', function () {
            var game = new game_js_1.Game(resources);
            app.stage.addChild(game);
            document.addEventListener('keydown', game.eventKeyboardInput.bind(game));
            document.addEventListener('keyup', game.eventKeyboardInput.bind(game));
            app.stage.removeChild(loadGameButton);
        });
        app.stage.addChild(loadGameButton);
    }
});
//# sourceMappingURL=main.js.map