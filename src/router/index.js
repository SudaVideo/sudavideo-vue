import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import VideoDetail from '../views/VideoDetail.vue'
import VideoList from '../components/VideoList.vue'
import Disclaimer from '../views/Disclaimer.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            name: 'Home',
            meta: {
                title: 'SudaVideo',
                keepAlive: true
            }
        },
        {
            path: '/:playType',
            component: Home,
            name: 'Home',
            meta: {
                title: 'SudaVideo',
                keepAlive: true
            },
            props: true
        },
        {
            path: '/videoDetail/:source/:videoId',
            component: VideoDetail,
            name: 'VideoDetail',
            props: true,
            meta: {
                title: '详情'
            }
        },
        {
            path: '/videoDetail/:source/:videoId/:seriesId',
            component: VideoDetail,
            name: 'VideoDetail',
            props: true,
            meta: {
                title: '详情'
            }
        },
        {
            path: '/VideoList/:playType/',
            component: VideoList,
            name: 'VideoList',
            props: true,
            meta: {
                title: '分类'
            }
        },
        {
            path: '/about/Disclaimer',
            name: 'Disclaimer',
            component: Disclaimer,
            meta: {
                title: '免责声明'
            }
        }


    ]
})
