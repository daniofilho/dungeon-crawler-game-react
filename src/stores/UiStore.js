/* Store Relacioanda a interface */
import { observable, action } from "mobx";

export class UiStore {

    constructor(rootStore) {
        this.rootStore = rootStore
    }
    /*
    @observable isContentLoaded = false; 

    @action setContentLoaded( _bool) {
        this.isContentLoaded = _bool;
    }
*/
}