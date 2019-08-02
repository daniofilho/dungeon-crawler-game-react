// Agrupando as stores e compartilhando informações entre elas

import Game from '../engine/Game';

import { ConfigStore } from "./ConfigStore";
import { UiStore } from "./UiStore";

export class RootStore {
    constructor() {
		this.config  = new ConfigStore(this);
        this.ui      = new UiStore(this);
        this.game    = new Game(this);
    }
}