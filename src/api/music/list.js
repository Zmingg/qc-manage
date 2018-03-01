const base = 'http://127.0.0.1:3001/';

export default {
    async all(){
        try {
            let res = await fetch(base + 'lists');
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async page( page = 1 ){
        try {
            let formData = new FormData();
            formData.append('page', page);
            let res = await fetch(base + 'list/page', {
                method: 'post',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async get(lid){
        try {
            let res = await fetch(base + 'list/' + lid);
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async create(list){
        try {
            let formData = new FormData();
            for (let key in list) {
                if (list.hasOwnProperty(key)){
                    formData.append(key, list[key]);
                }
            }
            let res = await fetch(base + 'list', {
                method: 'post',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async update(list){
        try {
            let formData = new FormData();
            for (let key in list) {
                if (list.hasOwnProperty(key)){
                    formData.append(key, list[key]);
                }
            }
            let res = await fetch(base + 'list', {
                method: 'put',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async delete(lid){
        try {
            let formData = new FormData();
            formData.append('lid', lid);
            let res = await fetch(base + 'list', {
                method: 'delete',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    }
}