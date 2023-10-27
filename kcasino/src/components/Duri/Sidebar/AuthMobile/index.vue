<template>
    <div class="wrapper-auth-mobile">
        <div class="row">
            <div v-if="auth" class="col col-6 d-flex align-center flex-wrap">
                <div class="user-info d-block d-md-none w-100">
                    <h4 class="user-name">{{ auth && userInfor?.me_account }}</h4>
                    <span class="welcome d-block w-100">{{ $t("welcome") }}</span>
                </div>
                <button class="btn-logout" @click.stop="handleLoggout">
                    <span>{{ $t("logout") }}</span>
                    <img
                        src="../../../../assets/Duri/icon/commons/logout.png"
                        alt="logout icon"
                    />
                </button>
            </div>
            <div class="dropdown col-6" v-if="isLang">
                <button
                    aria-expanded="false"
                    class="btn dropdown-toggle"
                    data-bs-toggle="dropdown"
                    type="button"
                >
                    <img :src="lang.image" alt="lang"/> {{ lang.text }}
                </button>
                <ul class="dropdown-menu">
                    <li
                        v-for="(item, index) in languages"
                        :key="index"
                        @click="handleClickLang(item)"
                    >
                        <a class="dropdown-item" href="#">
                            <img :src="item.image" alt="img"/>
                            {{ item.text }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import {languages} from "@/components/Duri/Header/data";
import {defineProps, ref, computed, watch} from "vue";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {deleteCookie} from "@/utils/cookie";
import {logoutRequest} from "@/api/auth/request";

const handleClickLang = (option) => {
    i18n.locale.value = option.key;
    localStorage.setItem("lang", option.key);
    lang.value = {
        text: option.key,
        key: option.key,
        image: option.image,
    };
};
defineProps({
    isLang: {
        type: Boolean,
        default: true,
    },
});
const i18n = useI18n();
const store = useStore();
const router = useRouter();
const userInfor = computed(() => store.state.user.userInfor);
const auth = computed(() => store.state.auth.auth);
const lang = ref({
    key: i18n.locale.value,
    text: languages.find((item) => item.key === i18n.locale.value).text,
    image: languages.find((item) => item.key === i18n.locale.value).image,
});

watch((i18n.locale), () => (lang.value = {
    key: i18n.locale.value,
    text: languages.find((item) => item.key === i18n.locale.value).text,
    image: languages.find((item) => item.key === i18n.locale.value).image,
}))
const handleLoggout = async () => {
    store.commit("handleAuth");
    localStorage.removeItem("_slg");
    localStorage.removeItem("mIdx");
    sessionStorage.clear();
    await store.dispatch("clearIntervalAction");
    await store.dispatch("clearIntervalPingAction");
    deleteCookie("MDS");
    deleteCookie("CID");
    deleteCookie("mIdx");
    await logoutRequest();
    store.commit("resetUser");
    await router.push("/");
    location.reload();
};
</script>
<style scoped>
.wrapper-auth-mobile {
    margin: 0 20px 20px 20px;
    
    .user-info {
        margin-bottom: 24px;
    }
}

img {
    width: 24px;
    height: 24px;
    border: 1px solid #fff;
    border-radius: 50%;
}

.dropdown-toggle {
    text-transform: uppercase;
    border: 1px solid #e4e4e7;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 100%;
}

a.dropdown-item {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.user-name {
    font-size: 1rem;
    max-width: 95.95px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px 0 20px;
}
</style>
<style>
.wrapper-auth-mobile .dropdown-menu {
    min-width: unset;
}
</style>
