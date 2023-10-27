<template>
    <header class="pcHeader">
        <div class="formWrap" v-if="store.getters['user/getSessionId']">
            <span class="welcome">{{ t('welcome') }}</span>
            <span>{{ store.getters['user/getUserInfo'].me_nickname }} {{ t('sir') }}</span>
            <span class="welcome">{{ t('totalBalance') }}</span>
            <span class="userBalance"> {{ getTotalMoney() }} </span>
            <span class="welcome">{{ t('gameMoney') }}</span>
            <span class="userServiceMoney"> {{ getGameMoney() }} </span>
            <span class="lastLogindate">{{ t('lastLogin') }} {{ getLastLoginDate() }} </span>
            <div class="inputWrap signup">
                <button @click.stop="fn.logout">{{ t('logout') }}</button>
            </div>
        </div>
        <div class="formWrap" v-else>
            <div class="inputWrap">
                <input type="text" :placeholder="t('userId')" v-model="data.frm.account" @keyup.enter="fn.login()"/>
            </div>
            <div class="inputWrap">
                <input type="password" :placeholder="t('password')" v-model="data.frm.password" @keyup.enter="fn.login()"/>
            </div>
            <div class="inputWrap signin">
                <button @click.stop="fn.login()">{{ t('login') }}</button>
            </div>
            <div class="inputWrap signup">
                <button @click.stop="toggleShow('signup')">{{ t('signup') }}</button>
            </div>
        </div>
        <div class="inputWrap locale">
            <button class="hoverEvent">
                <img :src="locale[0].icon">
                <span :class="{ 'selected': $i18n.locale == locale[0].key }">{{ t(locale[0].key) }}</span>
            </button>
            <div class="localeDropDown">
                <div>
                </div>
                <div></div>

            </div>
        </div>
    </header>
    <header class="mobileHeader">
        <div class="formWrap" v-if="store.getters['user/getSessionId']">
            <span class="welcome">{{ t('welcome') }}</span>
            <span>{{ store.getters['user/getUserInfo']?.me_nickname }} {{ t('sir') }}</span>
        </div>
        <button @click.stop="emits('toggleSideMenu')">
            <img src="@/assets/icon/h_btn.png"/>
        </button>
    </header>
</template>
<script setup>

    import { data, fn } from '@/views/login/login';
    import { toggleShow } from "@/utils/modals";

    import { ref } from 'vue';
    import { useStore } from 'vuex';
    import { useI18n } from "vue-i18n";
    import moment from "moment/moment";
    import {utils} from "@/utils/common";
    const { t } = useI18n();
    const store = useStore();

    const emits = defineEmits(['toggleSideMenu'])

    const locale = [
        {
            'key': 'ko',
            'icon': require('@/assets/flag/flag_ko.png')
        },
        {
            'key': 'en',
            'icon': require('@/assets/flag/flag_en.png')
        }
    ]

    const getTotalMoney = () => {
      let tx = store.getters['user/getUserInfo']?.me_money + store.getters['user/getUserInfo']?.game_amount;
      return tx;
    }

    const getGameMoney = () => {
      let tx = store.getters['user/getUserInfo']?.game_amount;
      return tx;
    }

    const getLastLoginDate = () => {
      let tx = store.getters['user/getUserInfo']?.me_last_date;
      return tx;
    }

</script>
<style scoped>
    span.welcome {
        color: #f7e18b;
    }
    .mobileHeader {
        display: none;
    }
    header {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 2;
        height: 60px;
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
    }
    header .formWrap{
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 20px;
        gap: 30px;
        color: white;
    }
    .inputWrap {
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("../../assets/box/goldInputBox.png");
        background-size: 100% 100%;
        width: 176px;
        height: 40px;
    }
    .inputWrap input, .inputWrap.signup button, .inputWrap.locale button {
        background-color: black;
        border-radius: 100px;
        width: 172px;
        font-size: 12px;
        height: 36px;
    }
    .inputWrap.signin button {
        color: black;
        font-weight: bold;
        font-size: 16px;
        position: relative;
        top: 1px;
    }
    .inputWrap.signup, .inputWrap.locale {
        background-image: url("../../assets/box/goldInputBox2.png");
        width: 130px;
    }
    .inputWrap.signup button, .inputWrap.locale button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 123px;
    }
    .inputWrap.locale button span {
        position: relative;
        top: 1px;
    }
    .inputWrap button {
        color: #6d6d6d;
        font-weight: bold;
    }
    .inputWrap.signin {
        width: 130px;
        font-weight: bold;
        color: #141516;
        font-size: 16px;
    }
    .inputWrap.locale button span.selected {
        color: #faebae;
    }
    /* 테블릿 세로 (해상도 768px ~ 1023px)*/
    @media all and (min-width:768px) and (max-width:1023px) {
        .mobileHeader {
            display: flex;
            height: 100px;
        }
        .pcHeader {
            display: none;
        }
        .formWrap {
            margin-left: 30px !important;
        }
    }

    /* 모바일 가로, 테블릿 세로 (해상도 480px ~ 767px)*/
    @media all and (min-width:480px) and (max-width:767px) {
        .mobileHeader {
            display: flex;
            height: 100px;
        }
        .pcHeader {
            display: none;
        }
        .formWrap {
            margin-left: 30px !important;
        }
    }

    /* 모바일 가로, 테블릿 세로 (해상도 ~ 479px)*/
    @media all and (max-width:479px) {
        .mobileHeader {
            display: flex;
            height: 100px;
        }
        .pcHeader {
            display: none;
        }
        .formWrap {
            margin-left: 30px !important;
        }
    }
    .mobileHeader button {
        margin-left: auto;
        margin-right: 30px;
        transform: scale(1.5);
    }
</style>



