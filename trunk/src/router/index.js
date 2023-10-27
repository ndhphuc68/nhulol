import { createRouter, createWebHistory } from 'vue-router'
import { loginFilter } from '@/router/filter/login';
import { utils } from "@/utils/common"
import { paths } from '@/router/path/path';

const rt = paths[ process.env.VUE_APP_PAGE_TYPE];

const routes = rt;

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach(loginFilter);

router.onError((error) => {
    if (/ChunkLoadError:.*failed./i.test(error.message)) {
        window.location.reload();
    }
    else if (/Loading.*chunk.*failed./i.test(error.message)) {
        window.location.reload();
    }
});

export default router
