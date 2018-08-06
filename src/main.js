import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);


import VueDPlayer from 'vue-dplayer'
Vue.use(VueDPlayer)


import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    error: require('./assets/loading.jpg'),
    loading: require('./assets/loading.jpg')
})

// import 'vue-dplayer/dist/vue-dplayer.css'


router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})


Vue.config.productionTip = false

window.vm = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
