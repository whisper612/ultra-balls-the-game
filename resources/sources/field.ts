import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import { Game } from "./game.js";
import { Tile } from "./tile.js"

declare let TweenMax: any;
declare let TimelineMax: any;

export class Field extends Container {

    public selectedTile: Tile;

    private _tiles: Tile[][]; // _tiles
    private _ores: number = 6;

    private _rectMask: Graphics;
    private _background: Graphics;

    constructor() {
        super();

        this._rectMask = new Graphics();
        this.addChild(this._rectMask);

        this._rectMask.position.x = 0;
        this._rectMask.position.y = 0;
        this._rectMask.lineStyle(0);
        this._rectMask.beginFill(0xffffff, 1);
        this._rectMask.drawRect((Game.WIDTH - 8 * 75) / 2, (Game.HEIGHT - 8 * 75) / 2 + 100, 75 * 8, 75 * 8);

        this.mask = this._rectMask;

        this._background = new Graphics();
        this._background.position.x = 0;
        this._background.position.y = 0;
        this._background.lineStyle(0);
        this._background.beginFill(0x00ccff, 0.05);
        this._background.drawRect((Game.WIDTH - 8 * 75) / 2, (Game.HEIGHT - 8 * 75) / 2 + 100, 75 * 8, 75 * 8);

    }

    // Генерация игрового поля заполненного тайлами
    public generateField(): void {
        if (this._tiles != null) {
            this.destroyField();
            this._tiles = null;
        }
        this._tiles = new Array<Tile[]>(8);

        let tileSize = 75;
        let paddingX = (Game.WIDTH - 8 * tileSize) / 2;
        let paddingY = (Game.HEIGHT - 8 * tileSize) / 2 + 100;

        for (let i = 0; i < 8; i++) {
            this._tiles[i] = new Array<Tile>(8);
            for (let j = 0; j < 8; j++) {
                let type = Math.floor(Math.random() * this._ores) + 1
                this._tiles[i][j] = new Tile(this, type, [i, j]);
                this._tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                this.addChild(this._tiles[i][j]);
                this._tiles[i][j].setType(type, 1.5, 8);
            }
        }
        this.addChild(this._background);

        // Блокировка шариков в полёте
        this.switchInteractive(false);
        let tl = new TimelineMax({ repeat: 1, repeatDelay: 1.7, onComplete: this.startGame.bind(this) });
    }

    // Старт игры
    private startGame(): void {
        this.parent.emit("eventStartTimer");
        this.animateDestroy(this.findMatches());
    }

    private checkField(): void {
        this.animateDestroy(this.findMatches());
    }

    // Генерация тайлов после их уничтожения
    private generateTiles(): void {
        for (let i = 0; i < this._tiles.length; i++) {
            for (let j = 0; j < this._tiles[i].length; j++) {
                if (this._tiles[i][j].type == 0)
                    this._tiles[i][j].setType(Math.floor(Math.random() * this._ores) + 1, 0.5, 2);
            }
        }

        let tl = new TimelineMax({ repeat: 1, repeatDelay: 0.5, onComplete: this.checkField.bind(this) });
    }

    // Унтичтожение игрового поля
    private destroyField(): void {
        if (this._tiles == null) return;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this._tiles[i][j].destroy();
            }
        }
    }

    // Переключатель воздействия на элементы пользователем
    public switchInteractive(interactive: boolean): void {
        for (let i = 0; i < this._tiles.length; i++) {
            for (let j = 0; j < this._tiles[i].length; j++) {
                this._tiles[i][j].switchInteractive(interactive);
            }
        }
    }

    // Подсветка соседнего тайла, елси онн образует новую комбинацию
    public createsNewMatch(s: Tile, n: Tile): boolean {
        let temp = n.type;
        let currentMatches = this.findMatches().length;
        n.type = s.type;
        s.type = temp;
        let newMatches = this.findMatches().length;
        s.type = n.type;
        n.type = temp;

        if (newMatches > currentMatches) {
            return true;
        }

        return false;
    }

    public areNeighbours(a: Tile, b: Tile = this.selectedTile): boolean {
        return (Math.abs(a.pos.x - b.pos.x) + Math.abs(a.pos.y - b.pos.y)) == 1
    }

    // Подсветка клеток на которые возможно походить
    public highlightNeighbours(a: Tile, hide: boolean = false): void {
        // Верхний равен верхнему тайлу от текущего и проверки строки над вернхим тайлом, либо null
        let upper = this._tiles[a.pos.x - 1] && this._tiles[a.pos.x - 1][a.pos.y];
        let right = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y + 1];
        let bottom = this._tiles[a.pos.x + 1] && this._tiles[a.pos.x + 1][a.pos.y];
        let left = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y - 1];

        if (upper && this.createsNewMatch(a, upper)) {
            upper.highlight(hide);
        }
        if (right && this.createsNewMatch(a, right)) {
            right.highlight(hide);
        }
        if (bottom && this.createsNewMatch(a, bottom)) {
            bottom.highlight(hide);
        }
        if (left && this.createsNewMatch(a, left)) {
            left.highlight(hide);
        }
    }

    //  Отключение подсветки клеток на которые возможно походить
    public unHighlightNeighbours(a: Tile): void {
        // Верхний равен верхнему тайлу от текущего и проверки строки над вернхим тайлом, либо null
        let upper = this._tiles[a.pos.x - 1] && this._tiles[a.pos.x - 1][a.pos.y];
        let right = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y + 1];
        let bottom = this._tiles[a.pos.x + 1] && this._tiles[a.pos.x + 1][a.pos.y];
        let left = this._tiles[a.pos.x] && this._tiles[a.pos.x][a.pos.y - 1];

        if (upper && upper.highlighted) upper.unHighlight();
        if (right && right.highlighted) right.unHighlight();
        if (bottom && bottom.highlighted) bottom.unHighlight();
        if (left && left.highlighted) left.unHighlight();
    }

    // Гравитация или генерация шариков
    public dropTiles(): void {
        let shiftsCounter = this.dropLine();
        let tl = new TimelineMax({
            repeat: 1, repeatDelay: 0.25, onComplete: function (): void {
                if (shiftsCounter > 0) {
                    this.dropTiles();
                } else {
                    this.generateTiles();
                }
            }.bind(this)
        });
    }

    // Сдвиг шариков, если над пустой клеткой есть шарик
    public dropLine(): number {
        let shiftsCounter = 0;
        for (let j = 0; j < this._tiles.length; j++) {
            for (let i = this._tiles[j].length - 1; i >= 0; i--) {
                if (this._tiles[i][j].type == 0) {
                    if (this._tiles[i - 1]) {
                        if (this._tiles[i - 1][j].type != 0) shiftsCounter += 1;
                        this._tiles[i][j].setType(this._tiles[i - 1][j].type, 0.2);
                        this._tiles[i - 1][j].setType(0);
                    }
                }
            }
        }
        return shiftsCounter;
    }

    // Удаление совпадений
    public destroyMatches(matches: Tile[][]): void {
        for (let i = 0; i < matches.length; i++) {
            for (let j = 0; j < matches[i].length; j++) {
                let t = matches[i][j];
                this._tiles[t.pos.x][t.pos.y].setType(0);
            }
        }
        let tl = new TimelineMax({ repeat: 1, repeatDelay: 0.25, onComplete: this.dropTiles.bind(this) });
    }

    // Анимация удаления совпадений
    public animateDestroy(matches: any): void {
        if (matches.length > 0) {
            this.switchInteractive(false);
            for (let i = 0; i < matches.length; i++) {
                for (let j = 0; j < matches[i].length; j++) {
                    this.parent.emit("eventComboUp");
                    TweenMax.to(matches[i][j].item, 0.4, { alpha: 0, rotation: 2.5 });
                    TweenMax.to(matches[i][j].item.scale, 0.4, { x: 0, y: 0 });
                }
            }
            createjs.Sound.play(Game.DESTROY_SOUND, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 1);
            let tl = new TimelineMax({ repeat: 1, repeatDelay: 0.425, onComplete: this.destroyMatches.bind(this, matches) });
        } else {
            this.switchInteractive(true);
            this.parent.emit("eventComboEnd");
        }
    }

    // Поиск возможных совпадений по горизонтали и цвертикали
    public findMatches(): Tile[][] {
        let v_matches: Tile[][] = new Array();
        let h_matches: Tile[][] = new Array();
        let v_temp: Tile[];
        let h_temp: Tile[];

        let matches: Tile[][] = new Array();

        for (let i = 0; i < this._tiles.length; i++) {
            for (let j = 1; j < this._tiles[i].length; j++) {
                if (this._tiles[i][j].type == this._tiles[i][j - 1].type && this._tiles[i][j].type != 0) {
                    if (h_temp == null) {
                        h_temp = new Array();
                        h_temp.push(this._tiles[i][j]);
                        h_temp.push(this._tiles[i][j - 1]);
                    } else {
                        h_temp.push(this._tiles[i][j]);
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

        for (let j = 0; j < this._tiles.length; j++) {
            for (let i = 1; i < this._tiles[j].length; i++) {
                if (this._tiles[i][j].type == this._tiles[i - 1][j].type && this._tiles[i][j].type != 0) {
                    if (v_temp == null) {
                        v_temp = new Array();
                        v_temp.push(this._tiles[i][j]);
                        v_temp.push(this._tiles[i - 1][j]);
                    } else {
                        v_temp.push(this._tiles[i][j]);
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
            for (let i = 0; i < v_matches.length; i++) {
                matches.push(v_matches[i]);
            }
        }

        if (h_matches.length > 0) {
            for (let i = 0; i < h_matches.length; i++) {
                matches.push(h_matches[i]);
            }
        }

        return (matches);
    }
}