export class CRUD {
    _link;
    _header = {
        "Content-Type": "application/json"
    }
    constructor(link) {
        this._link = link;
    }

    async getSingleByID(id) {
        let response = await fetch(`${this._link}/${id}`, {
            headers:this._header,
            method: "get",
        });
        return response.body;
    }

    async getSingleByJson(json) {
        let query=[];
        for (const [key,value] of Object.entries(json)) {
            console.log(key,value)
           query.push(key+"="+value)
        }
        let response = await fetch(`${this._link}?${query.join('&')}`, {
            headers:this._header,
            method: "get",
        });
        return response.json();
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

    async update(id, obj) {
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
        if (response.status !== 203) {
            console.log('error happens');
        }
    }
}