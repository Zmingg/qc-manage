<template>
    <div class="box" v-show="show">
        <div class="warp" @click="close"></div>
        <div class="frame">
           <img :src="src" />
        </div>
    </div>
</template>
<script>
export default {

    data(){
        return {
            show: false,
            src: ''
        }
    },

    mounted(){
        this.$on('open', src => this.open(src));
    },

    methods: {
        open: function (src) {
            let img = new Image();
            img.onload = () => {
                this.src = src;
                this.show = true;
            };
            img.src = src;
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
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
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
        /*width: 50%;*/
        max-width: 600px;
        padding: 10px;
        background: #fff;
        box-shadow: 0 0 20px #888888;
        overflow-y: auto;
        white-space: pre-wrap;
        word-break: break-all;

    }

</style>