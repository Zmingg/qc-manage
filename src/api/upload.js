import 'babel-polyfill';
const serverBlog = 'http://127.0.0.1:3000/';
const serverMusic = 'http://127.0.0.1:3001/';
let domain = {};
domain.blog = 'http://p04p94ehj.bkt.clouddn.com/';
domain.musicP = 'http://oxjyut4f0.bkt.clouddn.com/';
domain.musicS = 'http://ow7kqez1l.bkt.clouddn.com/';

const uploader = (el, server, domain, prefix) => {
    return new QiniuJsSDK().uploader({
        runtimes: 'html5,html4',
        browse_button: el,
        // container: 'container',
        // drop_element: 'container',
        dragdrop: true,
        // chunk_size: '4mb',
        uptoken_url: server + 'upload_token',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
        get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
        // downtoken_url: '/downtoken',
        // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
        // save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
        domain: domain,     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
        // container: 'container',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
        max_file_size: '30mb',             // 最大文件体积限制
        max_retries: 3,                     // 上传失败最大重试次数
        // drop_element: 'container',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
        //x_vars : {
        //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
        //    'time' : function(up,file) {
        //        var time = (new Date()).getTime();
        // do something with 'time'
        //        return time;
        //    },
        //    'size' : function(up,file) {
        //        var size = file.size;
        // do something with 'size'
        //        return size;
        //    }
        //},
        init: {
            'FilesAdded': function (up, files) {
                plupload.each(files, function (file) {
                    // 文件添加进队列后,处理相关的事情
                });
            },
            'BeforeUpload': function (up, file) {
                // 每个文件上传前,处理相关的事情
            },
            'UploadProgress': function (up, file) {
                // 每个文件上传时,处理相关的事情
            },
            'FileUploaded': function (up, file, info) {
                // 每个文件上传成功后,处理相关的事情
                // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
                // {
                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                //    "key": "gogopher.jpg"
                //  }
                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
            },
            'Error': function (up, err, errTip) {
                //上传出错时,处理相关的事情
            },
            'UploadComplete': function () {
                //队列文件处理完毕后,处理相关的事情
            },
            /**
             * @return {string}
             */
            'Key': function (up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效
                let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let len = 16;
                let _key = '';
                for (let i = 0; i < len; i++) {
                    _key += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return prefix ? prefix + '/' + _key : _key;
            }
        }
    });
};

const uploadToken = async (server) => {
    let base = (server === 'music')
        ? serverMusic
        : serverBlog;
    try {
        let res = await fetch(base + 'upload_token');
        return await res.json();
    } catch (err) {
        return { ok: false, data: err };
    }
};

export { serverBlog, serverMusic, domain, uploader, uploadToken };