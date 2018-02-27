const base = 'http://127.0.0.1:3001/';

export default {
    async all(){
        try {
            let res = await fetch(base + 'singers');
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async get(sid){
        try {
            let res = await fetch(base + 'singer/' + sid);
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async create(singer){
        try {
            let formData = new FormData();
            for (let key in singer) {
                if (singer.hasOwnProperty(key)){
                    formData.append(key, singer[key]);
                }
            }
            let res = await fetch(base + 'singer', {
                method: 'post',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async update(singer){
        try {
            let formData = new FormData();
            for (let key in singer) {
                if (singer.hasOwnProperty(key)){
                    formData.append(key, singer[key]);
                }
            }
            let res = await fetch(base + 'singer', {
                method: 'put',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async delete(sid){
        try {
            let formData = new FormData();
            formData.append('sid', sid);
            let res = await fetch(base + 'singer', {
                method: 'delete',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    }
}