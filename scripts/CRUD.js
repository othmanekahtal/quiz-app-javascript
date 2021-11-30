class CRUD {
    _link;

    constructor(link) {
        this._link = link;
    }
    async getSingleByID(id) {
        let response = await fetch(`${this._link}/${id}`, {
            method: "get",
        });
        if (response.status !== 200) {
            console.log('error happens');
        }
        return response.body;
    }

    async getSingleByJson(json) {
        let response = await fetch(`${this._link}`, {
            method: "get",
            body:json
        });
        if (response.status !== 200) {
            console.log('error happens');
        }
        return response.body;
    }
    async getAll() {
        let response = await fetch(this._link, {
            method: "get"
        });
        if (response.status !== 201) {
            console.log('error happens');
        }
        return response.body;
    }

    async create(obj) {
        let response = await fetch(this._link, {
            method: "post",
            body: obj
        });
        if (response.status !== 201) {
            console.log('error happens');
        }
    }

    async update(id,obj) {
        let response = await fetch(`${this._link}/${id}`, {
            method: "patch",
            body: obj
        });
        if (response.status !== 200) {
            console.log('error happens');
        }
    }

    async delete(id) {
        let response = await fetch(`${this._link}/${id}`, {
            method: "delete",
        });
        if (response.status !== 200) {
            console.log('error happens');
        }
    }
}