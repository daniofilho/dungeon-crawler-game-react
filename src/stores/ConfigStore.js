/* Store Relacioanda a interface */
import { decorate, observable, action } from "mobx";

export class ConfigStore {

	constructor(rootStore) {
		this.rootStore = rootStore
	}
	/*
	@observable variavel = false; 

	@action setVariavel( _bool) {
		this.variavel = _bool;
	}*/

}
