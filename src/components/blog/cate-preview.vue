<template>
    <div class="box" v-show="show">
        <div class="warp" @click="close"></div>
        <div class="frame">
            <el-input class="row" v-model="cate.name" placeholder="请输入名称" size="small">
                <div slot="prepend">名称</div>
            </el-input>
            <el-input class="row" v-model="cate.alias" placeholder="请输入名称" size="small">
                <div slot="prepend">别名</div>
            </el-input>
            <el-button class="row" size="small" @click="update">确认更新</el-button>
        </div>
    </div>
</template>
<script>
import { cateDetail } from '../../api/cate';
import ElInput from "../../../node_modules/element-ui/packages/input/src/input.vue";
export default {
    components: {ElInput},

    data(){
        return {
            cate: {},
            show: false
        }
    },

    mounted(){
        this.$on('open', alias => this.open(alias));
    },

    methods: {
        open: async function (alias) {
            let res = await cateDetail(alias);
            if (res.ok) {
                this.cate = res.data;
                this.$nextTick(()=>{
                    this.show = true;
                })
            }
        },
        close: function () {
            this.show = false;
        },
        update: function () {
            
        }

    }

}
</script>
<style scoped>
.box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.box > .warp {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    opacity: 0.5;
    z-index: -100;
}
.box > .frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    height: 70%;
    max-width: 300px;
    max-height: 300px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 20px #888888;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
}
.row {
    width: 100%;
}
</style>