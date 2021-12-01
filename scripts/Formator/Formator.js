import {CRUD} from "../CRUD";

export class Formator {
    #authenticated;
    #formator;

    constructor() {
        this.#formator = new CRUD('http://localhost:3001/coach');
    }

    get authentification() {
        return this.#authenticated;
    }

    async login(creds) {
        let response = await this.#formator.getSingleByJson(creds);
        this.#authenticated = !!response.length;
    }
}