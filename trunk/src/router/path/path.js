import {utils} from "@/utils/common";

const paths = {
    LH: [
        {
            path: '/',
            redirect: "/lobby"
        },
        {
            path: '/lobby',
            name: 'Lobby',
            component: () => import('@/layout/navLayout2'),
            children: [
                {
                    path: '',
                    name: 'Lobby',
                    component: () => import('@/views/lobby/Index2.vue')
                },
            ],
            meta: {
                isMobile: utils.isMobile(),
                showNav: true
            }

        },
        {
            path: "/404",
            name: "NotFound",
            component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: "/404"
        },
    ],
    test1: [
        {
            path: '/',
            redirect: "/home"
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/layout/navLayout4'),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('@/views/home/index.vue')
                },
            ],
            meta: {
                isMobile: utils.isMobile(),
                showNav: true
            }
        },
        {
            path: '/testModal',
            name: 'TestModal',
            component: () => import('@/layout/navLayout4'),
            children: [
                {
                    path: '',
                    name: 'TestModal',
                    component: () => import('@/views/TestModal/index.vue')
                },
            ],
            meta: {
                isMobile: utils.isMobile(),
                showNav: true
            }
        },

        {
            path: "/404",
            name: "NotFound",
            component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: "/404"
        },
    ],
}

export {
    paths
}