const base = 'http://127.0.0.1:3001/';
import 'babel-polyfill';

const apiHotAudios = async ()=>{
    try {
        let res = await fetch(base+'audios/hot');
        return await res.json();
    } catch(err) {
        return { ok:false,err:err };
    }
};

const apiLists = async () => {
    try {
        let res = await fetch(base + 'lists');
        return await res.json();
    } catch(err) {
        return { ok:false,err:err };
    }
};

const apiSingers = async () => {
    try {
        let res = await fetch(base + 'singers');
        return await res.json();
    } catch (err) {
        return { ok:false, err:err };
    }
};

const apiDiscs = async () => {
    try {
        let res = await fetch(base + 'discs');
        return await res.json();
    } catch (err) {
        return { ok:false, err:err };
    }
};

const apiAudioCreate = async (audio) => {
    try {
        let formData = new FormData();
        for (let key in audio) {
            if (audio.hasOwnProperty(key)){
                formData.append(key, audio[key]);
            }
        }
        let res = await fetch(base + 'audio/create', {
            method: 'post',
            body: formData
        });
        return await res.json();
    } catch (err) {
        return { ok:false, err:err };
    }
};



export { apiHotAudios, apiLists, apiSingers, apiDiscs, apiAudioCreate };