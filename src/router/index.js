import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import VideoDetail from '../views/VideoDetail.vue'
import VideoList from '../components/VideoList.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                title: 'SudaVideo',
                keepAlive: true
            }
        },
        {
            path: '/:playType',
            name: 'home',
            component: Home,
            meta: {
                title: 'SudaVideo',
                keepAlive: true
            },
            props: true
        },
        {
            path: '/videoDetail/:source/:videoId',
            name: '详情',
            component: VideoDetail,
            props: true,
            meta: {
                title: '详情'
            }
        },
        {
            path: '/videoDetail/:source/:videoId/:seriesId',
            name: '详情',
            component: VideoDetail,
            props: true,
            meta: {
                title: '详情'
            }
        },
        {
            path: '/videoDetail/:videoId/:seriesId',
            name: '详情',
            component: VideoDetail,
            props: true,
            meta: {
                title: '详情'
            }
        },
        {
            path: '/VideoList/:playType/',
            name: '详情',
            component: VideoList,
            props: true,
            meta: {
                title: '分类'
            }
        }


    ]
})
