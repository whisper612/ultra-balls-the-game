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
define(["require", "exports", "./game.js", "./tile.js"], function (require, exports, game_js_1, tile_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Container = PIXI.Container;
    var Field = /** @class */ (function (_super) {
        __extends(Field, _super);
        function Field() {
            var _this = _super.call(this) || this;
            _this.matches = [];
            _this.generateField();
            return _this;
        }
        Field.prototype.generateField = function () {
            this.tiles = null;
            this.tiles = new Array(8);
            var tileSize = 75;
            var paddingX = (game_js_1.Game.WIDTH - 8 * tileSize) / 2;
            var paddingY = (game_js_1.Game.HEIGHT - 8 * tileSize) / 2;
            for (var i = 0; i < 8; i++) {
                this.tiles[i] = new Array(8);
                for (var j = 0; j < 8; j++) {
                    var type = Math.floor(Math.random() * 6) + 1;
                    this.tiles[i][j] = new tile_js_1.Tile(this, type, [i, j]);
                    this.tiles[i][j].position.set(paddingX + j * tileSize, paddingY + i * tileSize);
                    this.addChild(this.tiles[i][j]);
                }
            }
            if (this.findMatches().length > 0) {
                this.switchInteractive(false);
                setTimeout(function () {
                    this.destroyMatches(this.findMatches());
                }.bind(this), 500);
            }
            else
                this.switchInteractive(true);
        };
        Field.prototype.setSelected = function (tile) {
            this.selectedTile = tile;
        };
        Field.prototype.isNeighbours = function (a, b) {
            if (b === void 0) { b = this.selectedTile; }
            if (b == null)
                return false;
            else if (a.type == b.type)
                return false; // TODO походу нахуй не надо
            else if (Math.abs(a.pos.x - b.pos.x) + Math.abs(a.pos.y - b.pos.y) == 1)
                return true;
            return false;
        };
        Field.prototype.createsNewMatch = function (s, n) {
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
        };
        Field.prototype.highlightNeighbours = function (a) {
            var upper = this.tiles[a.pos.x - 1] && this.tiles[a.pos.x - 1][a.pos.y];
            var right = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y + 1];
            var bottom = this.tiles[a.pos.x + 1] && this.tiles[a.pos.x + 1][a.pos.y];
            var left = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y - 1];
            if (upper && this.createsNewMatch(a, upper))
                upper.highlight();
            if (right && this.createsNewMatch(a, right))
                right.highlight();
            if (bottom && this.createsNewMatch(a, bottom))
                bottom.highlight();
            if (left && this.createsNewMatch(a, left))
                left.highlight();
        };
        Field.prototype.unHighlightNeighbours = function (a) {
            var upper = this.tiles[a.pos.x - 1] && this.tiles[a.pos.x - 1][a.pos.y];
            var right = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y + 1];
            var bottom = this.tiles[a.pos.x + 1] && this.tiles[a.pos.x + 1][a.pos.y];
            var left = this.tiles[a.pos.x] && this.tiles[a.pos.x][a.pos.y - 1];
            if (upper && upper.highlighted)
                upper.unHighlight();
            if (right && right.highlighted)
                right.unHighlight();
            if (bottom && bottom.highlighted)
                bottom.unHighlight();
            if (left && left.highlighted)
                left.unHighlight();
        };
        Field.prototype.dropTiles = function () {
            do {
                var twinsCounter = 0;
                for (var j = 0; j < this.tiles.length; j++) {
                    for (var i = this.tiles[j].length - 1; i >= 0; i--) {
                        if (this.tiles[i][j].type == 0) {
                            if (this.tiles[i - 1]) {
                                if (this.tiles[i - 1][j].type != 0)
                                    twinsCounter += 1;
                                this.tiles[i][j].setType(this.tiles[i - 1][j].type);
                                this.tiles[i - 1][j].setType(0);
                            }
                        }
                    }
                }
            } while (twinsCounter > 0);
            // console.log(twinsCounter > 0);
            setTimeout(function () {
                this.generateTiles();
            }.bind(this), 500);
        };
        Field.prototype.generateTiles = function () {
            for (var i = 0; i < this.tiles.length; i++) {
                for (var j = 0; j < this.tiles[i].length; j++) {
                    if (this.tiles[i][j].type == 0)
                        this.tiles[i][j].setType(Math.floor(Math.random() * 6) + 1);
                }
            }
            if (this.findMatches().length > 0) {
                this.switchInteractive(false);
                setTimeout(function () {
                    this.destroyMatches(this.findMatches());
                }.bind(this), 500);
            }
            else
                this.switchInteractive(true);
        };
        Field.prototype.destroyMatches = function (matches) {
            var count = 0;
            for (var i = 0; i < matches.length; i++) {
                for (var j = 0; j < matches[i].length; j++) {
                    var t = matches[i][j];
                    count += 1;
                    // this.tiles[t.pos.x][t.pos.y].destroy();
                    // this.tiles[t.pos.x][t.pos.y] = null;
                    game_js_1.Game.SCORE += 50 * count;
                    game_js_1.Game.SCORE_TEXT.text = game_js_1.Game.SCORE.toString();
                    this.tiles[t.pos.x][t.pos.y].setType(0);
                }
            }
            console.log("Combo: " + count + "element.");
            // this.switchInteractive();
            setTimeout(function () {
                this.dropTiles();
                createjs.Sound.play(game_js_1.Game.destroySound, createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.5);
            }.bind(this), 500);
        };
        Field.prototype.switchInteractive = function (interactive) {
            for (var i = 0; i < this.tiles.length; i++) {
                for (var j = 0; j < this.tiles[i].length; j++) {
                    this.tiles[i][j].switchInteractive(interactive);
                }
            }
        };
        Field.prototype.findMatches = function () {
            var v_matches = new Array();
            var h_matches = new Array();
            var v_temp;
            var h_temp;
            var matches = new Array();
            for (var i = 0; i < this.tiles.length; i++) {
                for (var j = 1; j < this.tiles[i].length; j++) {
                    if (this.tiles[i][j].type == this.tiles[i][j - 1].type && this.tiles[i][j].type != 0) {
                        if (h_temp == null) {
                            h_temp = new Array();
                            h_temp.push(this.tiles[i][j]);
                            h_temp.push(this.tiles[i][j - 1]);
                        }
                        else {
                            h_temp.push(this.tiles[i][j]);
                        }
                    }
                    else {
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
                        }
                        else {
                            v_temp.push(this.tiles[i][j]);
                        }
                    }
                    else {
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
            return (matches);
        };
        return Field;
    }(Container));
    exports.Field = Field;
});
//# sourceMappingURL=field.js.map