<template>
    <div class="box" @click="clickHandle">
        <div class="warp"></div>
        <div class="frame">
            <button type="button" title="upload" class="icon" @click="upload" id="pickfiles"></button>
            <div class="icon">URL</div>
            <div id="container"></div>
        </div>
    </div>
</template>
<script>
import { uploader } from '../../api/upload';
export default {

    mounted(){
        let up = uploader('image');
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
        upload: function () {


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
    width: 200px;
    height: 80px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.icon {
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>