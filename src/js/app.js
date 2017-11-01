import $ from 'jquery';
import Pixi from 'pixi.js';
import {Kaleidoscope} from './Kaleidoscope';
class App {
  constructor() {
  }
  init() {
    this.width =  window.innerWidth; 
    this.height = window.innerHeight;  
    this.initPixi();
    
  }
  initPixi() {
    console.log(this.width);
    console.log(this.height);
    this.pixiApp = new PIXI.Application(this.width, this.height, {backgroundColor : 0xffffff});
    document.body.appendChild(this.pixiApp.view);
    this.pixiContainer = new PIXI.Container();
    window.onresize = this.pixiResize();

    this.kaleidoscope = new Kaleidoscope(this.pixiApp);
    this.addListeners();
    this.kaleidoscope.draw();
  }
  
  pixiResize() {
    this.width = window.innerWidth;    
    this.height = window.innerHeight;
    this.pixiApp.renderer.view.style.width = this.width + 'px';
    this.pixiApp.renderer.view.style.height = this.height + 'px';    
  }

  addListeners() {
    document.addEventListener('keyup', e => {
      if(e.keyCode === 32) {
        this.kaleidoscope.toggleInteractiveMode();
      }
    });

  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
});
