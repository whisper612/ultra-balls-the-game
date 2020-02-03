import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import { LvlButton, MenuButton } from "./button.js";
import { Game } from "./game.js";
import { Tile } from "./tile.js"

export class Field extends Container {

    private current = 0;

    private tiles: Tile[][];
    
    private lvl_1: number[][] = [
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1]];

    private lvl_2: number[][] = [
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1]];

    private lvl_3: number[][] = [
                    [0, 1, 0, 0, 0, 0, 1, 0],
                    [1, 1, 1, 0, 0, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 0, 0, 1, 1, 1],
                    [0, 1, 0, 0, 0, 0, 1, 0]];

    private lvl_4: number[][] = [
                    [0, 0, 0, 1, 1, 0, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 0, 1, 1, 0, 0, 0]];

    private lvl_5: number[][] = [
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1]];

    private lvl_6: number[][] = [
                    [0, 0, 1, 0, 0, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 0, 0, 1, 0, 0]];

    private lvl_7: number[][] = [
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 1, 1, 1, 1, 1, 1, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1]];

    private lvl_8: number[][] = [
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 1, 1, 0, 0],
                    [0, 0, 1, 1, 1, 1, 0, 0]];

    private lvl_9: number[][] = [
                    [1, 1, 1, 0, 0, 1, 1, 1],
                    [1, 1, 1, 0, 0, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 0, 0, 1, 1, 1],
                    [1, 1, 1, 0, 0, 1, 1, 1]];

    private lvl_10: number[][] = [
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 1, 1, 0, 0, 1],
                    [1, 0, 0, 1, 1, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 0, 0, 0, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1]];

    private _levels: any = [this.lvl_1, this.lvl_2, this.lvl_3, this.lvl_4, this.lvl_5,
                            this.lvl_6, this.lvl_7, this.lvl_8, this.lvl_9, this.lvl_10];

    private backButton: MenuButton; 

    constructor(game: Game, index: number) {
        super();
        
        this.backButton = new MenuButton("Back to menu");
        this.backButton.position.set(512, 900);
        this.current = index;

        this.backButton.on("click", function() {
          game.backToMap();  
        }.bind(this));

        this.addChild(this.backButton);

        this.on('added', function () {
            this.redraw()
        }.bind(this));
    }

    public loadLevel(index: number) {
        this.current = index;
    }

    public redraw()
    {
        this.tiles = null;
        this.tiles = new Array<Tile[]>(8);

        let tileSize = 75;
        let paddingX = (Game.WIDTH - this._levels[this.current].length * tileSize) / 2;
        let paddingY = (Game.HEIGHT - this._levels[this.current].length * tileSize) / 2;

        for (let i = 0; i < this._levels[this.current].length; i++) {
            this.tiles[i] = new Array<Tile>(8);
            for (let j = 0; j < this._levels[this.current].length; j++) {
                if (this._levels[this.current][i][j] == 1) {
                    let type = Math.floor(Math.random() * 6)
                    this.tiles[i][j] = new Tile(type);
                    this.tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                    this.addChild(this.tiles[i][j]);
                }
            }
        }
        this.backButton.reset();
    }

}