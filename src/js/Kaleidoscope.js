import Pixi from 'pixi.js';

export class Kaleidoscope {
    
    constructor(pixiApp) {
        this.HALF_PI = Math.PI / 2;
        this.TWO_PI = Math.PI * 2;
        this.pixiApp = pixiApp;
        this.offsetRotation = 0.0;
        this.offsetScale = 1.0;
        this.offsetX = 0.0;
        this.offsetY = 0.0;
        this.radius = window.innerWidth / 2;
        this.slices = 12;
        this.zoom = 1.0;
        this.posX = window.innerWidth / 2;
        this.posY = window.innerHeight / 2;
        this.step = this.TWO_PI / this.slices;
        this.arcs = []
        this.spriteTiles = [];
        this.containers = [];
        this.image = PIXI.Texture.fromImage('/images/primus.jpg');
        this.count = 0;
        this.interactiveMode = false;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    draw() {
        let mainContainer = new PIXI.Container();
        mainContainer.interactive = true;
        mainContainer.mousemove = e => {
            const {x,y} = e.data.global;
            this.mouseX = x;
            this.mouseY = y;
        }
        for(let i = 0; i < this.slices; i++) {
            let arc = new PIXI.Graphics();
            let spriteTileArc = new PIXI.extras.TilingSprite(this.image,1500 * 2 ,1500 * 2);
            const currentStep = this.step * i + 1;
            arc.beginFill('0x000000');
            arc.moveTo(this.posX,this.posY);
            arc.arc(this.posX,this.posY, this.radius * 1.3, -.5 * this.step, .5 * this.step);
            arc.endFill();
            spriteTileArc.mask = arc;
            var container = new PIXI.Container();
            container.addChild(arc);
            container.addChild(spriteTileArc);
            container.pivot.x = this.posX;
            container.pivot.y = this.posY;
            container.rotation = -currentStep;
            container.scale.x = i % 2 ? 1 : -1;
            this.spriteTiles.push(spriteTileArc);
            this.arcs.push(arc);
            this.containers.push(container);
            mainContainer.addChild(container);
        }
        mainContainer.x = this.posX;
        mainContainer.y = this.posY;
        this.pixiApp.stage.addChild(mainContainer);


         this.pixiApp.ticker.add(() => {

            this.count += this.interactiveMode ? 0.5 : 0.005;
            for(let i = 0;i < this.spriteTiles.length; i++) {   
                if(this.interactiveMode) {
                    // this.spriteTiles[i].tilePosition.x = this.mouseX + Math.sin(this.count);
                    this.spriteTiles[i].tilePosition.x = this.mouseX + this.count;
                    // this.spriteTiles[i].tilePosition.y = this.mouseY + Math.cos(this.count);
                    this.spriteTiles[i].tilePosition.y = this.mouseY + this.count;
                } else {
                    this.spriteTiles[i].tilePosition.x += Math.sin(this.count);
                    this.spriteTiles[i].tilePosition.y += Math.cos(this.count);
                }
            }
        });
        
    }

    toggleInteractiveMode() {
        console.log('toggleinteractive', this.interactiveMode);
        this.interactiveMode = !this.interactiveMode;
    }
}