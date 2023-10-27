const paths = {
    test1: [
        {
            path: '/',
            redirect: "/home"
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/layout/MainLayout'),
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: () => import('@/views/Home'),
                },
            ]
        },
        // {
        //     path: '/testModal',
        //     name: 'testModal',
        //     component: defineAsyncComponent({
        //         loader: () => import('@/layout/navLayout4')
        //     }),
        //     children: [
        //         {
        //             path: '',
        //             name: 'Home',
        //             component: defineAsyncComponent({
        //                 loader: () => import('@/views/TestModal')
        //             }),
        //         },
        //     ],
        //     meta: {
        //         isMobile: utils.isMobile(),
        //         showNav: true
        //     }
        // },
        // {
        //     path: "/404",
        //     name: "NotFound",
        //     component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound.vue')
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     redirect: "/404"
        // },
    ]
}

export {
    paths
}