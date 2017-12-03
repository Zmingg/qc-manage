const base = 'http://127.0.0.1:3000/';
import 'babel-polyfill';

// 分页显示API
const blogList = async (page = 1)=>{
    try {
        let formData = new FormData();
        formData.append("page",page);
        let res = await fetch(base+'blogs_p',{
            method: 'post',
            body: formData
        });
        let data =  await res.json();
        return { ok:true,data:data };
    } catch(err) {
        return { ok:false,err:err };
    }
};

// 详情API
const blogDetail = async (id)=>{
    try {
        let res = await fetch(base+'blog/'+id);
        let data =  await res.json();
        return { ok:true,data:data };
    } catch(err) {
        return { ok:false,err:err };
    }
};

// Update API
const blogUpdate = async (blog = {})=>{
    try {
        let formData = new FormData();
        for (let key in blog) {
            if (blog.hasOwnProperty(key)){
                formData.append(key, blog[key]);
            }
        }
        let res = await fetch(base+'blog/update',{
            method: 'post',
            body: formData
        });
        let data =  await res.json();
        return { ok:true,data:data };
    } catch(err) {
        return { ok:false,err:err };
    }
};

// Create API
const blogCreate = async (blog = {})=>{
    try {
        let formData = new FormData();
        for (let key in blog) {
            if (blog.hasOwnProperty(key)){
                formData.append(key, blog[key]);
            }
        }
        let res = await fetch(base+'blog/create',{
            method: 'post',
            body: formData
        });
        let data =  await res.json();
        return { ok:true,data:data };
    } catch(err) {
        return { ok:false,err:err };
    }
};

export { blogList, blogDetail, blogUpdate, blogCreate };