import $ from 'jquery';
import Pixi from 'pixi.js';
class App {
  constructor() {
  }
  init() {
    this.width =  window.innerWidth; 
    this.height = window.innerHeight;  
    this.initPixi();
    
  }
  initPixi = function() {
    console.log(this.width);
    console.log(this.height);
    this.pixiApp = new PIXI.Application(this.width, this.height, {backgroundColor : 0x000000});
    document.body.appendChild(this.pixiApp.view);
    this.pixiContainer = new PIXI.Container();
    window.onresize = this.pixiResize();
    
  }
  
  pixiResize = function() {
    this.width = window.innerWidth;    
    this.height = window.innerHeight;
    this.pixiApp.renderer.view.style.width = this.width + 'px';
    this.pixiApp.renderer.view.style.height = this.height + 'px';    
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const app = new App();
  app.init();
});
