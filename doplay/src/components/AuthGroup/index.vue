<script setup>
import {computed, ref} from "vue";
import Select from "@/components/Customs/Select";
import images from "@/assets";
import {useStore} from "vuex";
import Login from "@/views/Modals/Login";
import SignIn from "@/views/Modals/SignIn";
import {useI18n} from "vue-i18n";

const i18n = useI18n();
const currentLang = ref(i18n.locale.value);
const store = useStore();
const options = [
    {
        key: "en",
        value: {
            text: "EN",
            img: images.en,
        },
    },
    {
        key: "ko",
        value: {
            text: "KO",
            img: images.ko,
        },
    },
    {
        key: "th",
        value: {
            text: "TH",
            img: images.th,
        },
    },
];

const auth = computed(() => store.state.auth.auth);
const userInfor = computed(() => store.state.user?.userInfor || {});

function handleSelectInput(option) {
    i18n.locale.value = option.key;
}

function handleOpenModalLogin() {
    store.commit("openModal", {modalKey: "login", component: () => Login});
}

function handleOpenModalSignIn() {
    store.commit("openModal", {modalKey: "signin", component: () => SignIn});
}
</script>

<template>
    <v-row class="align-center" no-gutters>
        <v-col class="text-center" cols="12" md="4">
            <Select
                :default="currentLang"
                :height="'50px'"
                :minWidth="'120px'"
                :options="options"
                :tabIndex="0"
                @input="handleSelectInput"
            />
        </v-col>
        <template v-if="!auth">
            <v-col class="text-center" cols="12" md="4">
                <button
                    class="btn btn-login px-6 py-3 my-sm-5"
                    @click="handleOpenModalLogin"
                >
                    Login
                </button>
            </v-col>
            <v-col class="text-center" cols="12" md="4">
                <button class="btn btn-sign px-6 py-3" @click="handleOpenModalSignIn">
                    Sign in
                </button>
            </v-col>
        </template>
        <v-col v-else class="text-center" cols="12" md="4">
            <button class="btn btn-login px-6 py-3">
                <span> {{ userInfor?.me_account }}</span>
                <img alt="logout icon" src="@/assets/icon/logout-icon.png" height="21" width="20"/>
            </button>
        </v-col>
    
    </v-row>
</template>

<style scoped>
.btn {
    border-radius: 6px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
}

.btn-sign {
    background: var(--primary);
    color: #ffffff;
}

@media (max-width: 960px) {
    .btn {
        width: 100%;
        margin: 10px 0;
    }
}
</style>
