import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import Pass from './pages/passport.vue';
import Home from './pages/home.vue';
import Index from './pages/index.vue';
import Blog from './pages/blog/list.vue';
import BlogUpdate from './pages/blog/update.vue';
import BlogCreate from './pages/blog/create.vue';
import Category from './pages/blog/category.vue';
import Analysis from './pages/blog/analysis.vue';
import Setting from './pages/setting.vue';
import storage from './lib/storage';

const router = new VueRouter({
    mode:'history',
    routes:[
        { path: '/', component: Home, children: [
            { name: 'home', path: '', component: Index },
            { name: 'blog', path: 'blog', component: Blog },
            { name: 'blog_update', path: 'blog/update/:id', component: BlogUpdate },
            { name: 'blog_create', path: 'blog/create', component: BlogCreate },
            { name: 'cate', path: 'cate', component: Category },
            { name: 'analysis', path: 'analysis', component: Analysis },
            { name: 'setting', path: 'setting', component: Setting },
        ]},
        { name: 'pass', path: 'pass', component: Pass }

    ]
});

router.beforeEach((to, from, next) => {
    if ((new storage).get('user')) {
        next();
    } else if (to.path === '/pass') {
        next();
    } else {
        next({ path: '/pass' })
    }

});

export default router;