<template>
    <div class="box" v-show="show">
        <div class="warp" @click="close"></div>
        <div class="frame" v-html="blog.content">
            <!--<div id="quill-container">-->
            <!--</div>-->
        </div>
    </div>
</template>
<script>
import { blogDetail } from '../../api/blog';
export default {

    data(){
        return {
            blog: {},
            show: false
        }
    },

    mounted(){
        this.$on('open', id => this.open(id));
    },

    methods: {
        open: async function (id) {
            let res = await blogDetail(id);
            if (res.ok) {
                this.blog = res.data;
                this.$nextTick(()=>{
                    this.show = true;
                })
            }
        },
        close: function () {
            this.show = false;
        }

    }

}
</script>
<style scoped>
@import "https://cdn.quilljs.com/1.3.4/quill.bubble.css";
.box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.box .warp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    opacity: 0.5;
    z-index: -100;
}
.frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    height: 70%;
    max-width: 800px;
    max-height: 600px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 20px #888888;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;

}

</style>