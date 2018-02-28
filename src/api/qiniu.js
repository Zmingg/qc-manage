import 'babel-polyfill';
const serverBlog = 'http://127.0.0.1:3000/';
const serverMusic = 'http://127.0.0.1:3001/';
let domain = {};
domain.blog = 'http://p04p94ehj.bkt.clouddn.com/';
domain.musicP = 'http://oxjyut4f0.bkt.clouddn.com/';
domain.musicS = 'http://ow7kqez1l.bkt.clouddn.com/';
import * as qiniu from 'qiniu-js';

const uploadToken = async (server, prefix) => {
    let base = (server === 'music')
        ? serverMusic
        : serverBlog;
    try {
        let formData = new FormData();
        formData.append('prefix', prefix);
        let res = await fetch(base + 'upload_token', {
            method: 'post',
            body: formData
        });
        return await res.json();
    } catch (err) {
        return { ok: false, data: err };
    }
};

const upload = async (file, options, observer) => {
    let config = {
        useCdnDomain: true,
        disableStatisticsReport: false,
        region: qiniu.region.z0
    };
    let putExtra = {
        fname: "",
        params: {},
        mimeType: null
    };
    let key = () => {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let len = 16;
        let _key = '';
        for (let i = 0; i < len; i++) {
            _key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return options.prefix ? options.prefix + '/' + _key : _key;
    };

    let tokenRes = await uploadToken(options.server, options.prefix);

    if (tokenRes.ok) {
        let observable = qiniu.upload(file, key(), tokenRes.uptoken, putExtra, config);
        observable.subscribe(observer);
    }


};

export { serverBlog, serverMusic, domain, upload };