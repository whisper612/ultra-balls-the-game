import Application = PIXI.Application;
import Loader = PIXI.Loader;
import {Game} from "./game.js"

const loader: Loader = new Loader();

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
loader.load(setup);

// Create a Pixi Application
let app: Application = new Application({
    backgroundColor: 0x03172C,
    antialias: true,
    transparent: false,
    resolution: 1
});

// App sizing
function eventListenerResize(): void {
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    let scale = Math.min(window.innerWidth / Game.WIDTH, window.innerHeight / Game.HEIGHT);
    app.stage.x = (window.innerWidth - Game.WIDTH * scale) / 2;
    app.stage.y = (window.innerHeight - Game.HEIGHT * scale) / 2;
    app.stage.scale.x = scale;
    app.stage.scale.y = scale;
    app.render();
}

eventListenerResize();
window.onresize = eventListenerResize;

// Add the canvas that Pixi automatically created
document.body.appendChild(app.view);

function setup(loader: Loader, resources: any): void {
    let game: Game = new Game(resources);
    app.stage.addChild(game);
    document.addEventListener('keydown', game.eventKeyboardInput.bind(game));
    document.addEventListener('keyup', game.eventKeyboardInput.bind(game));
}