<template>
    <div class="box">
        <h5>Blog List - 共 {{ total }} 行 （ {{curpage}} / {{pages}} 页 ）</h5>
        <ul class="list">
            <li class="item" v-for="blog in blogs">
                <div class="title">
                    {{ blog.title }}
                </div>
                <div class="controls" :data-id="blog.id" @click="action">
                    <span class="button" data-act="view">查</span>
                    <span class="button" data-act="update">修</span>
                    <span class="button" data-act="del">删</span>
                </div>

            </li>
        </ul>
        <div class="info">
            <el-button size="small" @click="create">添加新的文章</el-button>
            <el-button-group>
                <el-button size="small" :disabled="curpage<=1" icon="el-icon-arrow-left" @click="prev">上一页</el-button>
                <el-button size="small" :disabled="!hasMore" @click="next">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
        </div>
        <preview ref="preview"></preview>

    </div>
</template>
<script>
import { blogList } from '../../api/blog';
import Preview from '../../components/blog/preview.vue';
import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
export default {
    components: {
        ElButton,
        Preview
    },
    data(){
        return {
            blogs: [],
            curpage: 0,
            pages: 0,
            hasMore: false,
            total: 0,
        }
    },
    mounted(){
        this.list(1);
    },
    methods: {
        list: async function(page){
            let res = await blogList(page);
            if (res.ok) {
                this.blogs = res.data.data;
                this.hasMore = res.data.hasmore;
                this.pages = res.data.pages;
                this.curpage = res.data.curpage;
                this.total = res.data.total;
            }
        },
        next: function () {
            if(this.hasMore){
                this.list(this.curpage+1);
            }
        },
        prev: function () {
            if(this.curpage>1){
                this.list(this.curpage-1);
            }
        },
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
        update: async function (id) {
            this.$router.push({
                name: 'blog_update',
                params: {id: id}
            });
        },
        del: function () {

        },
        view: function (id) {
            this.$refs.preview.$emit('open', id);
        },
        create: function () {
            this.$router.push({ name: 'blog_create' });
        }
    }
}
</script>
<style scoped>
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
.item:hover {
    background: #ecf5ff;
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
    height: 100%;
    text-align: center;
}
.info {
    margin-top: 10px;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.button {
    cursor: pointer;
}
.disable {
    color: #939393;
    cursor: default;
}
</style>