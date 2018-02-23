<template>
    <ul class="nav">
        <nav-li v-for="nav,index in navs" :key="index" :nav="nav" :isChild="false"></nav-li>
    </ul>
</template>
<script>
import NavLi from './nav_li.vue';
export default {
    components: { NavLi },
    data(){
        return {
            navs: [
                {name: '首页', path: '/', icon:'el-icon-location'},
                {name: '文章', icon:'el-icon-menu', children: [
                    {name: '文章管理', path: '/blog'},
                    {name: '分类管理', path: '/blog/cate'},
                ]},
                {name: '音乐', icon:'el-icon-menu', children: [
                    {name: '数据概要', path: '/music'},
                    {name: '音乐上传', path: '/music/upload'}
                ]},
                {name: '设置', icon:'el-icon-setting', path: '/setting'}
            ]
        }
    }
}
</script>
<style scoped>
a:-webkit-any-link {
    color: #fff;
    text-decoration: none;
}
.nav {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    line-height: 50px;
    background: #4a5f6a;
    color: #fff;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

</style>