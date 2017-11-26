import Vue from 'vue';
import Router from './router';
// import Store from './store/store';

import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' });

import App from './app.vue';

new Vue({
    el: '#app',
    router: Router,
    render: (h) =>  h(App)
});