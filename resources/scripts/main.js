// Alliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

const WIDTH = 1500, HEIGHT = 1024;

// Create a Pixi Application
let app = new Application({
    backgroundColor: 0x03172C,
    antialias: true,
    transparent: false,
    resolution: 1
}
);

// Add the canvas that Pixi automatically created
document.body.appendChild(app.view);

// App settings
function eventListenerResize() {
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);
    let scale = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
    app.stage.x = (window.innerWidth - WIDTH * scale) / 2;
    app.stage.y = (window.innerHeight - HEIGHT * scale) / 2;
    app.stage.scale.x = scale;
    app.stage.scale.y = scale;
    app.render();
}

eventListenerResize();
window.onresize = eventListenerResize;

// Load image and run the `setup` after
loader
    .add([
        "assets/images/redBall.png",
        "assets/images/orangeBall.png",
        "assets/images/greenBall.png",
        "assets/images/dkBlueBall.png",
        "assets/images/blueBall.png",
        "assets/images/purpleBall.png",
        "assets/images/background.png"
    ])
    .load(setup);

function setup() {
    let backgroundSprite = new PIXI.Sprite(resources["assets/images/background.png"].texture);
    backgroundSprite.width = WIDTH;
    backgroundSprite.height = HEIGHT;
    app.stage.addChild(backgroundSprite);

    // Create the balls sprites 
    let redBallSprite = new PIXI.Sprite(resources["assets/images/redBall.png"].texture);
    redBallSprite.anchor.set(0.5)
    redBallSprite.x = WIDTH / 2;
    redBallSprite.y = HEIGHT / 2;
    redBallSprite.scale.y = 0.75;
    redBallSprite.scale.x = 0.75;
    // Add the red ball to the stage
    app.stage.addChild(redBallSprite);

    let orangeBallSprite = new PIXI.Sprite(resources["assets/images/orangeBall.png"].texture);
    let greenBallSprite = new PIXI.Sprite(resources["assets/images/greenBall.png"].texture);
    let dkBlueBallSprite = new PIXI.Sprite(resources["assets/images/dkBlueBall.png"].texture);
    let blueBallSprite = new PIXI.Sprite(resources["assets/images/blueBall.png"].texture);
    let purpleBallSprite = new PIXI.Sprite(resources["assets/images/purpleBall.png"].texture);
    
}