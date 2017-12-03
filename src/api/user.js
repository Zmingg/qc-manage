const base = 'http://127.0.0.1:3000/';
import 'babel-polyfill';

// userSignIn
const userSignIn = async (user)=>{
    try {
        let fd = new FormData();
        for (let key in user) {
            if (user.hasOwnProperty(key)){
                fd.append(key, user[key]);
            }
        }
        let res = await fetch(base+'sign_in',{
            method: 'post',
            body: fd
        });
        return await res.json();
    } catch(err) {
        return { ok:false,err:err };
    }
};

// userSignOut
// const userSignOut = async ()=>{
//     try {
//         let res = await fetch(base+'sign_out');
//         let data =  await res.json();
//         return { ok:true,data:data };
//     } catch(err) {
//         return { ok:false,err:err };
//     }
// };

export { userSignIn };