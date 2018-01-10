<template>
    <div class="box">
        <ul class="list">
            <li v-for="cate in cates" class="item">
                <div class="title">
                    {{ cate.name }}
                </div>
                <div class="controls" :data-id="cate.id">
                    <span class="btn" @click="handleEdit(cate.id)">修改</span>
                    <span class="btn" @click="handleDelete(cate.id)">删除</span>
                </div>
            </li>
        </ul>
        <cate-preview ref="preview"></cate-preview>
    </div>
</template>
<script>
import { cateList } from '../../api/cate';
import CatePreview from '../../components/blog/cate-preview.vue';
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
export default {
    components: {
        ElButton, CatePreview
    },
    data(){
        return {
            cates: []
        }
    },
    async beforeRouteEnter (to, from, next) {
        let res = await cateList();
        if(res.ok){
            next(vm => {
                vm.cates = res.data
            });
        }
    },
    async beforeRouteUpdate (to, from, next) {
        let res = await cateList();
        if(res.ok){
            next(vm => {
                vm.cates = res.data
            });
        }
    },
    methods: {
        action: function (e) {
            if (e.target.tagName !== 'SPAN') {
                return;
            }
            let id = e.target.parentNode.dataset.id;
            let act = e.target.dataset.act;
            if (act === 'create') {
                return this.create();
            }
            return this[act](id);

        },
        handleEdit: function (id) {
            this.$refs.preview.$emit('open', id);
        },
        handleDelete: function (id,row) {
            console.log('delete',id)
        }
    }
}
</script>
<style scoped>
.box {
    width: 100%;
    height: 100%;
}
.list {
    margin: 15px 0;
    height: 350px;
    line-height: 35px;
    border-top: solid 1px #9b9b9b;
    font-size: 14px;
    color: #555555;
}
.item {
    height: 35px;
    border-bottom: solid 1px #9b9b9b;
    padding-left: 5px;
}
.item:nth-child(even) {
    background: #eef2ff;
}
.title {
    float: left;
    width: 100%;
    height: 100%;
    padding-right: 100px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.controls {
    float: left;
    margin-left: -100px;
    width: 100px;
    text-align: right;

}
.btn {
    padding: 5px;
    border-radius: 3px;
    border: solid 1px #888;
    background: #fff;
    cursor: pointer;
    transition: 0.3s;
}
</style>