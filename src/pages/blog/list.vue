<template>
    <div class="box">
        <h5>Blog List - 共 {{ total }} 条数据</h5>
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
            <span class="button" @click="prev" :class="{disable: curpage<=1}">前一页</span>
            <span>|</span>
            <span class="button" @click="next" :class="{disable: !hasMore}">下一页</span>
            <span>( 当前 {{curpage}} / {{pages}} 总页数 )</span>
        </div>

    </div>
</template>
<script>
import { blogList } from '../../api/blog';
export default {
    data(){
        return {
            blogs: [],
            curpage: 1,
            pages: 0,
            hasMore: false,
            total: 0
        }
    },
    mounted(){
        this.list();
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
            this[act](id);

        },
        update: async function (id) {
            this.$router.push({
                name: 'blog_update',
                params: {id: id}
            });
        },
        del: function () {

        },
        view: function () {
            
        }
    }
}
</script>
<style scoped>
.box {
    -webkit-user-select: none;
    user-select: none;
}
.list {
    margin: 15px 0;
    height: 350px;
    line-height: 35px;
    border-top: solid 1px #666;
    font-size: 15px;
    color: #4e4e4e;
}
.item {
    height: 35px;
    border-bottom: solid 1px #666;
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
    font-size: 14px;
}
.button {
    cursor: pointer;
}
.disable {
    color: #939393;
    cursor: default;
}
</style>