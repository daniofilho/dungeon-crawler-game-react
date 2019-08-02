/* Store Relacioanda a interface */
import { observable, action } from "mobx";

export class GameStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }

    @observable variavel = false; 

    @action setVariavel( _bool) {
        this.variavel = _bool;
    }

}