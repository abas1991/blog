import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'Home',
            component: () => import('./views/Posts.vue'),
        },
        {
            path: '/posts',
            name: 'Posts',
            component: () => import('./views/Posts.vue'),
        },
        {
            path: '/new',
            name: 'NewPost',
            component: () => import('./views/NewPost.vue'),
        },
    ]
})

export default router