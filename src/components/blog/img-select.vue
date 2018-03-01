<template>
    <div class="box" @click="clickHandle">
        <div class="warp"></div>
        <div class="frame">
            <el-button size="mini" @click="upload">本地上传</el-button>
            <div class="row">
                <el-input v-model="url" size="mini">
                    <el-button slot="append" @click="insertUrl">插入</el-button>
                </el-input>
            </div>
            <input id="upload" type="file" hidden/>
        </div>
    </div>
</template>
<script>
import { domain, upload } from '../../api/qiniu';
export default {
    data(){
        return {
            url: ''
        }
    },

    methods: {
        clickHandle: function (e) {
            if (e.target.className === 'warp') {
                this.$emit('close');
            }
        },
        insertUrl: function () {
            if (this.url !== '') {
                this.$emit('insert', this.url);
            }
            this.$emit('close');
        },
        upload: function () {
            let input = document.getElementById('upload');
            if (!input.onchange) {
                input.onchange = () => {
                    let file = input.files[0];
                    let options = {
                        server: 'blog',
                        prefix: 'image'
                    };
                    let el = this;
                    upload(file, options, {
                        next(res){},
                        error(err){
                            console.log(err)
                        },
                        complete(res){
                            let link = domain.blog + res.key;
                            el.$emit('insert', link);
                            el.$emit('close');
                        }
                    });
                };
            }
            let clickTime = setTimeout(()=>{
                clearTimeout(clickTime);
                clickTime = null;
                input.click();
            }, 500);
        },
    }

}
</script>
<style scoped>
.box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.box .warp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    z-index: -100;
}
.frame {
    width: 300px;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
}
.row {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>