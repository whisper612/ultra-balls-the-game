import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import { Game } from "./game.js";
import { Button, LvlButton, MenuButton } from "./button.js";

export class Menu extends Container {

    // Params;
    public startButton: MenuButton;
    // public settingsButton: Button;

    constructor(game: Game) {
        super();
        
        this.startButton = new MenuButton("Start");
        // this.settingsButton = new MenuButton("Start");

        this.startButton.position.set(Game.WIDTH / 2, Game.HEIGHT / 2);
        // this.settingsButton.position.set(Game.WIDTH / 2, Game.HEIGHT / 1.8);

        this.startButton.on('click', function() {
            game.showMap();
        }.bind(this));

        // this.settingsButton.on('click', function(){
        // }.bind(this));

        this.addChild(this.startButton);
        // this.addChild(this.settingsButton);

        this.on('added', function () {
            this.redraw()
        }.bind(this));
    }

    public redraw()
    {
        this.startButton.reset();
    }
}