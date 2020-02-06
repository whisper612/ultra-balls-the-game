import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import { MenuButton } from "./button.js";
import { Game } from "./game.js";
import { Tile } from "./tile.js"

export class Field extends Container {

    private tiles: Tile[][];
    public selectedTile: Tile;

    private matches: any = [];

    constructor() {
        super();
        this.generateField();
    }

    public generateField() {
        this.tiles = null;
        this.tiles = new Array<Tile[]>(8);

        let tileSize = 75;
        let paddingX = (Game.WIDTH - 8* tileSize) / 2;
        let paddingY = (Game.HEIGHT - 8 * tileSize) / 2;

        for (let i = 0; i < 8; i++) {
            this.tiles[i] = new Array<Tile>(8);
            for (let j = 0; j < 8; j++) {
                let type = Math.floor(Math.random() * 6) + 1
                this.tiles[i][j] = new Tile(this, type, [i, j]);
                this.tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                this.addChild(this.tiles[i][j]);
            }
        }

        if (this.findMatches().length > 0)
        {
            this.switchInteractive(false);
            setTimeout(function () {
                this.destroyMatches(this.findMatches());
            }.bind(this), 750);
        }
        else
            this.switchInteractive(true);
    }

    public setSelected(tile: Tile)
    {
        this.selectedTile = tile;
    }

    public isNeighbours(a: Tile, b: Tile = this.selectedTile): boolean // TODO походу нахуй не надо
    {
        if(b == null) return false;
        else if (a.type == b.type) return false; // TODO походу нахуй не надо
        else if (Math.abs(a.pos.x - b.pos.x) + Math.abs(a.pos.y - b.pos.y) == 1) return true;
        return false;
    }

    public createsNewMatch(s: Tile, n: Tile)
    {
        var temp = n.type;

        var currentMatches = this.findMatches().length;
        n.type = s.type;
        s.type = temp;
        var newMatches = this.findMatches().length;
        s.type = n.type;
        n.type = temp;

        if (newMatches > currentMatches)
            return true;
        
        return false;
    }

    public highlightNeighbours(a: Tile)
    {
        var upper = this.tiles[a.pos.x - 1] && this.tiles[a.pos.x - 1][a.pos.y];
        var right = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y + 1];
        var bottom = this.tiles[a.pos.x + 1] && this.tiles[a.pos.x + 1][a.pos.y];
        var left = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y - 1];

        if (upper && this.createsNewMatch(a, upper)) upper.highlight();
        if (right && this.createsNewMatch(a, right)) right.highlight();
        if (bottom && this.createsNewMatch(a, bottom)) bottom.highlight();
        if (left && this.createsNewMatch(a, left)) left.highlight();
    }

    public unHighlightNeighbours(a: Tile) {

        var upper = this.tiles[a.pos.x - 1] && this.tiles[a.pos.x - 1][a.pos.y];
        var right = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y + 1];
        var bottom = this.tiles[a.pos.x + 1] && this.tiles[a.pos.x + 1][a.pos.y];
        var left = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y - 1];

        if (upper && upper.highlighted) upper.unHighlight();
        if (right && right.highlighted) right.unHighlight();
        if (bottom && bottom.highlighted) bottom.unHighlight();
        if (left && left.highlighted) left.unHighlight();
    }

    public dropTiles() {
        do {
            var xeyviyCounter = 0;
            for (let j = 0; j < this.tiles.length; j++) {
                for (let i = this.tiles[j].length - 1; i >= 0; i--) {
                    if (this.tiles[i][j].type == 0)
                    {
                        if (this.tiles[i - 1])
                        {
                            if (this.tiles[i - 1][j].type != 0) xeyviyCounter += 1;
                            this.tiles[i][j].setType(this.tiles[i - 1][j].type);
                            this.tiles[i - 1][j].setType(0);
                        }
    
                    }
                }
            }
        } while (xeyviyCounter > 0);
        // console.log(xeyviyCounter > 0);
        setTimeout(function() {
            this.generateTiles();
        }.bind(this), 750);
    }

    public generateTiles()
    {
        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = 0; j < this.tiles[i].length; j++) {
                if (this.tiles[i][j].type == 0)
                    this.tiles[i][j].setType(Math.floor(Math.random() * 6) + 1);
            }
        }
        if (this.findMatches().length > 0)
        {
            this.switchInteractive(false);
            setTimeout(function () {
                this.destroyMatches(this.findMatches());
            }.bind(this), 750);
        }
        else
            this.switchInteractive(true);
    }

    public destroyMatches(matches: Tile[][]) {
        
        var count = 0;
        for (var i = 0; i < matches.length; i++) {
            for (var j = 0; j < matches[i].length; j++) {
                var t = matches[i][j];
                count += 1;
                // this.tiles[t.pos.x][t.pos.y].destroy();
                // this.tiles[t.pos.x][t.pos.y] = null;
                Game.SCORE += 50 * count;
                Game.SCORE_TEXT.text = Game.SCORE.toString();
                this.tiles[t.pos.x][t.pos.y].setType(0);
            }
        }

        console.log("Combo: " + count + "element.");
        // this.switchInteractive();
        setTimeout(function () {
            this.dropTiles();
        }.bind(this), 750);       
    }

    public switchInteractive(interactive: boolean)
    {
        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].switchInteractive(interactive);
            }
        }
    }

    public findMatches() {
        var v_matches: Tile[][] = new Array();
        var h_matches: Tile[][] = new Array();
        var v_temp: Tile[];
        var h_temp: Tile[];

        var matches: any[] = new Array();

        for (var i = 0; i < this.tiles.length; i++) {
            for (var j = 1; j < this.tiles[i].length; j++) {

                if (this.tiles[i][j].type == this.tiles[i][j - 1].type && this.tiles[i][j].type != 0) {
                    if (h_temp == null) {
                        h_temp = new Array();
                        h_temp.push(this.tiles[i][j]);
                        h_temp.push(this.tiles[i][j - 1]);
                    } else {
                        h_temp.push(this.tiles[i][j]);
                    }
                } else {
                    if (h_temp != null) {
                        if (h_temp.length > 2) {
                            h_matches.push(h_temp);
                        }

                        h_temp = null;
                    }
                }
            }
            if (h_temp != null) {
                if (h_temp.length > 2) {
                    h_matches.push(h_temp);
                }

                h_temp = null;
            }
        }

        for (var j = 0; j < this.tiles.length; j++) {
            for (var i = 1; i < this.tiles[j].length; i++) {
                if (this.tiles[i][j].type == this.tiles[i - 1][j].type && this.tiles[i][j].type != 0) {
                    if (v_temp == null) {
                        v_temp = new Array();
                        v_temp.push(this.tiles[i][j]);
                        v_temp.push(this.tiles[i - 1][j]);
                    } else {
                        v_temp.push(this.tiles[i][j]);
                    }
                } else {
                    if (v_temp != null) {
                        if (v_temp.length > 2) {
                            v_matches.push(v_temp);
                        }

                        v_temp = null;
                    }
                }
            }
            if (v_temp != null) {
                if (v_temp.length > 2) {
                    v_matches.push(v_temp);
                }

                v_temp = null;
            }
        }

        if (v_matches.length > 0) {
            for (var i = 0; i < v_matches.length; i++) {
                matches.push(v_matches[i]);
            }
        }

        if (h_matches.length > 0) {
            for (var i = 0; i < h_matches.length; i++) {
                matches.push(h_matches[i]);
            }
        }

        // console.log(this.tiles);
        return(matches);
    }
}