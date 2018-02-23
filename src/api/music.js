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

export { apiHotAudios, apiLists };