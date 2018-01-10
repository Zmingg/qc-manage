const base = 'http://127.0.0.1:3000/';
import 'babel-polyfill';

const cateList = async ()=>{
    try {
        let res = await fetch(base+'cates');
        return await res.json();
    } catch(err) {
        return { ok:false,err:err };
    }
};

const cateDetail = async (id) => {
    try {
        let res = await fetch(base + 'cate/' + id);
        return await res.json();
    } catch(err) {
        return { ok:false,err:err };
    }
};

export { cateList, cateDetail };