import Vue from 'vue';
import Router from './router';
import Store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import App from './app.vue';

new Vue({
    el: '#app',
    store: Store,
    router: Router,
    render: (h) =>  h(App)
});