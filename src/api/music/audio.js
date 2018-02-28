const base = 'http://127.0.0.1:3001/';

export default {
    async all() {
        try {
            let res = await fetch(base + 'audios');
            return await res.json();
        } catch (err) {
            return {ok: false, err: err};
        }
    },

    async hot() {
        try {
            let res = await fetch(base + 'audios/hot');
            return await res.json();
        } catch (err) {
            return {ok: false, err: err};
        }
    },

    async get(aid){
        try {
            let res = await fetch(base + 'audio/' + aid);
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async create(audio) {
        try {
            let formData = new FormData();
            for (let key in audio) {
                if (audio.hasOwnProperty(key)){
                    formData.append(key, audio[key]);
                }
            }
            let res = await fetch(base + 'audio', {
                method: 'post',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async update(audio) {
        try {
            let formData = new FormData();
            for (let key in audio) {
                if (audio.hasOwnProperty(key)){
                    formData.append(key, audio[key]);
                }
            }
            let res = await fetch(base + 'audio', {
                method: 'put',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    },

    async delete(aid) {
        try {
            let formData = new FormData();
            formData.append('aid', aid);
            let res = await fetch(base + 'audio', {
                method: 'delete',
                body: formData
            });
            return await res.json();
        } catch (err) {
            return { ok:false, err:err };
        }
    }
}