import $ from 'jquery';
import Pixi from 'pixi.js';
class App {
  constructor() {
  }
  init() {
  console.log('initialized');
    $('body').append('<p>Initialized</p>');
    var renderer = PIXI.autoDetectRenderer(256, 256);
    document.body.appendChild(renderer.view);
    var stage = new PIXI.Container();
  	renderer.render(stage);
  }
}

const app = new App();
app.init();