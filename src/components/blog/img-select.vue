<template>
    <div class="box" @click="clickHandle">
        <div class="warp"></div>
        <div class="frame">
            <el-button id="image" size="mini">本地上传</el-button>
            <div class="row">
                <el-input v-model="url" size="mini">
                    <el-button slot="append" @click="insertUrl">插入</el-button>
                </el-input>
            </div>
        </div>
    </div>
</template>
<script>
import { uploader } from '../../api/upload';
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
export default {
    components: {
        ElInput,
        ElButton},
    data(){
        return {
            url: ''
        }
    },

    mounted(){
        let up = uploader('image','image');
        up.bind('FileUploaded',(up, file, info)=>{
             let domain = up.getOption('domain');
             let res = JSON.parse(info.response);
             let link = domain + res.key;
             this.$emit('insert', link);
             this.$emit('close');
        });
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
        }
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