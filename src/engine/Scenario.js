import React, { Component } from 'react';

class Scenario {

  constructor(state){
    this.state = state;

    this.renderItems = [];

    this.stage = null;
    
    this.tileSize = 200;

    this.sound = null;
    this.soundSrc = '';

    this.initSound();

    // Rows and Collumns quantity
    this.tilesColWidth = 30;
    this.tilesColHeight = 30;

    this.initialX = Math.floor(this.tilesColWidth / 2);
    this.initialY = Math.floor(this.tilesColHeight / 2);

    this.initialTile = false;
    this.actualTile = false;

    // The frames
    this.tiles = {};

    this.run();

  }

  /* Scenario tiles */
  setupTiles = () => {
    console.log(this.state);
    // Gen each frame based on sizes 
    let index = 0;
    for( let r=0; r<this.tilesColHeight;r++ ) {
      for( let c=0; c<this.tilesColWidth;c++ ) {
        let x = this.tileSize * c;
        let y = this.tileSize * r;
        let isInitial = ( c === this.initialX && r === this.initialY ) ? true : false;
        let asset = this.state.getAsset( 'tile', { x:x, y:y, isInitial: isInitial } );
        this.tiles[index] = { 
          x: x,
          y: y,
          asset: asset
        }
        this.addRenderItem(asset);
        index++;

        if( isInitial ) {
          this.initialTile = asset;
        }
        
      }
    }
  }

  /* Sound */
  initSound() {
    /*this.sound = new Howl({
      src: [this.soundSrc],
      loop: true,
      volume: 0.5
    });*/
  }
  getScenarioSound() { return this.sound; }

  // Render
  addRenderItem(item){
    this.renderItems.push(item);
  }
  getRenderItems() { return this.renderItems; }
  
  // Da scroll na tela para centralizar até o chunk central
  centerScreen() {
    
    let x = this.initialX * this.tileSize;
    let y = this.initialY * this.tileSize;

    // Decide o X e Y central de um chunk
    let centerXY = this.tileSize / 2;

    // Quantos tiles cabem na tela?
    let tilesWidth = (document.documentElement.clientWidth / this.tileSize);
    let tilesHeight = (document.documentElement.clientHeight / this.tileSize);

    x = x - ( this.tileSize * ( tilesWidth / 2 ) ) + centerXY;
    y = y - ( this.tileSize * ( tilesHeight / 2 ) ) + centerXY;
    
    window.scrollTo( x, y );
  }

  run() { 
    this.setupTiles();
  }

}//class
export {Scenario}