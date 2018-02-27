const base = 'http://127.0.0.1:3001/';

export default {
    async all(){
        try {
            let res = await fetch(base + 'discs');
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async get(did){
        try {
            let res = await fetch(base + 'disc/' + did);
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async create(disc){
        try {
            let formData = new FormData();
            for (let key in disc) {
                if (disc.hasOwnProperty(key)){
                    formData.append(key, disc[key]);
                }
            }
            let res = await fetch(base + 'disc', {
                method: 'post',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async update(disc){
        try {
            let formData = new FormData();
            for (let key in disc) {
                if (disc.hasOwnProperty(key)){
                    formData.append(key, disc[key]);
                }
            }
            let res = await fetch(base + 'disc', {
                method: 'put',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async delete(did){
        try {
            let formData = new FormData();
            formData.append('did', did);
            let res = await fetch(base + 'disc', {
                method: 'delete',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    }
}