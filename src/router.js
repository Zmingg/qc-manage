import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Home from './pages/index.vue';
import Pass from './pages/passport.vue';
import Blog from './pages/blog/list.vue';
import BlogUpdate from './pages/blog/update.vue';

export default new VueRouter({
    mode:'history',
    routes:[
        { name: 'home', path: '/', component: Home },
        { name: 'pass', path: '/pass', component: Pass },
        { name: 'blog', path: '/blog', component: Blog },
        { name: 'blog_update', path: '/blog/update/:id', component: BlogUpdate },
    ]
});
