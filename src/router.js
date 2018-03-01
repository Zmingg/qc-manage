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
import Music from './pages/music/index.vue';
import MusicUpload from './pages/music/upload.vue';
import MusicSinger from './pages/music/singer.vue';
import MusicDisc from './pages/music/disc.vue';
import MusicList from './pages/music/list.vue';
import Setting from './pages/setting.vue';
import storage from './lib/storage';

const router = new VueRouter({
    mode:'history',
    routes:[
        { path: '/', component: Index, children: [
            { name: 'home', path: '', component: Home },
            { name: 'blog', path: 'blog', component: Blog },
            { name: 'blog_update', path: 'blog/update/:id', component: BlogUpdate },
            { name: 'blog_create', path: 'blog/create', component: BlogCreate },
            { name: 'blog_cate', path: 'blog/cate', component: Category },
            { name: 'music', path: 'music', component: Music },
            { name: 'music_upload', path: 'music/upload', component: MusicUpload },
            { name: 'music_singer', path: 'music/singer', component: MusicSinger },
            { name: 'music_disc', path: 'music/disc', component: MusicDisc },
            { name: 'music_list', path: 'music/list', component: MusicList },
            { name: 'setting', path: 'setting', component: Setting },
        ]},
        { name: 'pass', path: '/pass', component: Pass }

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