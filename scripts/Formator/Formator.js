class Formator {
    _authenticated;
    _formator;
    constructor() {
        this._formator = new CRUD('http://localhost:3001/coach');
    }

    get authentification() {
        return this._authenticated;
    }
    async login(creds) {
        let response = await this._formator.getSingleByJson(creds);
        console.log(response);
        if(!response) alert('wrong data !');
    }
}