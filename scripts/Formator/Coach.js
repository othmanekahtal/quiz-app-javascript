import {CRUD} from "../CRUD";

export class Coach extends CRUD{
    #authenticated;
    constructor() {
        super('http://localhost:3001/coach');
    }

    get authentification() {
        return this.#authenticated;
    }

    async login(creds) {
        let response = await this.getSingleByJson(creds);
        this.#authenticated = !!response.length;
    }
}