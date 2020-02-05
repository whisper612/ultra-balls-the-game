import Application = PIXI.Application;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { Field } from "./field.js";
import { Game } from "./game.js";
import { Button } from "./button.js";

export class Tile extends Container {

    // Params
    private background: Sprite;
    private item: Sprite;
    public type: number;
    public highlighted: boolean;
    private state: number;

    // Game res array
    private itemTextures: Texture[] = [
        null,
        Game.RES.redBall.texture,
        Game.RES.orangeBall.texture,
        Game.RES.greenBall.texture,
        Game.RES.dkBlueBall.texture,
        Game.RES.blueBall.texture,
        Game.RES.purpleBall.texture,
    ];

    private fieldTextures: Texture[] = [
        Game.RES.field.texture,
        Game.RES.fieldHighlighted.texture
    ];

    private States = {
        "IDLE": 1,
        "SELECTED": 2,
        "DISABLED": 3
    }

    protected pressedAlpha: number = 0.4;
    protected isOver: boolean = true;
    protected isDown: boolean = false;

    private _state: number;
    private _field: Field;
    public pos = {
        "x": 0,
        "y": 0
    }

    private setState(state: any):void
    {
        this._state = state;
    }
    
    constructor (field: Field, type: number, pos: number[]) {
        super();
      
        this.background = new Sprite(Game.RES.field.texture);
        this.addChild(this.background);

        this.pos.x = pos[0];
        this.pos.y = pos[1];
        this.item = new Sprite();
        this.item.scale.set(0.8);
        this.item.anchor.set(0.5);
        this.item.position.set(75 / 2, 75 / 2);
        this.item.interactive = true;
        this.item.buttonMode = true;

        this._field = field;

        this.setState(this.States.IDLE);

        this.item.on("mouseover", function (): void {
            if (this._state == this.States.IDLE)
                this.item.alpha = 0.75;
            }.bind(this));
            
            this.item.on("mouseout", function (): void {
                if (this._state == this.States.IDLE)
                this.item.alpha = 1;
            }.bind(this));        
            
            this.item.on("mousedown", function (): void {
                if (this._state == this.States.IDLE)
                this.select();
                else if (this._state == this.States.SELECTED)
                this.deselect();
            }.bind(this));
            
            this.item.on("mouseup", function (): void {
                
            }.bind(this));
            
            this.item.on("mouseupoutside", function (): void {
                if (this._state == this.States.SELECTED)
                this.deselect();
            }.bind(this));
            
            this.setType(type);
            
            this.addChild(this.item);
            
        }
        
        // на селекте должно проверится можно ли туда
        public select()
        {
            if(this._field.selectedTile == null)
            {
                this._field.selectedTile = this;
                this.setState(this.States.SELECTED);
                this.item.alpha = this.pressedAlpha;
                this._field.highlightNeighbours(this);
            }
            else
            {
                this.swap();
            }
        }

        // на деселекте должна провериться комбуха
        public deselect()
        {
            if (this._field.selectedTile == this)
            {
                this._field.selectedTile = null;
            }
            this.setState(this.States.IDLE);
            this.item.alpha = 1;
            this._field.unHighlightNeighbours(this);
        }

        public swap() {
        if (this.highlighted) {
            let temp = this.type;
            this.setType(this._field.selectedTile.type);
            this._field.selectedTile.setType(temp);
            this._field.selectedTile.deselect();

            console.log("Swapped");
            if (this._field.findMatches().length > 0)
            {
                setTimeout(function () {
                    this._field.destroyMatches(this._field.findMatches());
                }.bind(this), 750);
            }
        }
        else
            console.log("Can't swap");
        }
        

    public setType(t: number)
    {
        this.type = t;
        this.item.texture = this.itemTextures[this.type];
    }

    public highlight()
    {
        if (this.background.texture == this.fieldTextures[0]) {
            this.background.texture = this.fieldTextures[1];
        }
        this.highlighted = true;
        
    }
    
    public unHighlight() {
        if (this.background.texture == this.fieldTextures[1]){
            this.background.texture = this.fieldTextures[0];
        }
        this.highlighted = false;
    }

    public switchInteractive ()
    {
        this.item.interactive = !this.item.interactive;
        this.item.buttonMode = !this.item.buttonMode;
    }
}