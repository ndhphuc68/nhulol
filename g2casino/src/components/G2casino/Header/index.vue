<script setup>
import {ref, computed} from 'vue'
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useStore} from "vuex"
import Dropdown from 'primevue/dropdown';
import Diamond from '@/assets/G2casino/icon/Header/Diamond'
import {deleteCookie} from "@/utils/cookie";
import Button from "@/components/G2casino/Custom/Button/index.vue";
import {convertMoney} from "@/utils";
import More from "@/assets/G2casino/icon/More";
// import { logoutRequest } from "@/api/auth/request";

const {locale, t} = useI18n();
const store = useStore();
const auth = computed(() => store.state.auth.auth);
const router = useRouter();
const activeNavbar = ref(false);
const navs = computed(() => [
    {
        key: 'Deposit',
        href: 'deposit',
        text: t('deposit')
    },
    {
        key: 'Withdrawal',
        href: 'withdrawal',
        text: t('withdrawal')
    },
    {
        key: 'Coupon',
        href: 'coupon',
        text: t('coupon')
    },
    {
        key: 'BettingHistory',
        href: 'betting-history',
        text: t('bettingHistory')
    },
    {
        key: 'GameGuide',
        href: 'game-guide',
        text: t('gameGuide')
    },
    {
        key: 'HelpCenter',
        href: 'help-center',
        text: t('helpCenter')
    }
]);

const languages = ref([
    {
        key: 'ko',
        idx: 1
    },
    {
        key: 'en',
        idx: 2
    },
    {
        key: 'th',
        idx: 3
    }
])

const lang = ref({
    key: locale.value
})

const handleActive = (active) => {
    activeNavbar.value = !active
}

const handleNavigate = (href) => {
    router.push(href)
}

const handleClickLang = (option) => {
    locale.value = option.value
    localStorage.setItem('lang', option.value)
    lang.value = {
        key: option.value,
    }
}

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
    // await logoutRequest();
    store.commit("resetUser");
    await router.push('/')
    location.reload()
};
</script>

<template>
    <header>
        <div class="header-container">
            <button class="logo-group" @click="handleNavigate('/')">
                <img alt="logo" src="@/assets/G2casino/logo/logo.png"/>
            </button>
            <nav class="navbar">
                <button class="nav-item" v-for="(nav, index) in navs" :key="index" @click="handleNavigate(nav?.href)">
                    {{ (nav?.text) }}
                </button>
            </nav>
            <div class="header-right" :class="auth ? 'flex-row-reverse' : ''">
                <div v-if="!auth" class="btn-auth">
                    <RouterLink :to="{name:'Login'}">{{ $t("login") }}</RouterLink>
                    <RouterLink :to="{name:'Signup'}">{{ $t("signup") }}</RouterLink>
                </div>
                <div v-else class="diamond">
                    <div class="user d-none d-md-block">
                        <h5>{{ userInfor?.me_account || 'test user' }}</h5>
                        <ul class="user-action">
                            <li>
                                <router-link class="link" to="profile">{{ $t('profile') }}</router-link>
                            </li>
                            <li>
                                <button class="d-none d-md-flex" @click="handleLoggout">
                                    <span>{{ $t('logout') }}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 2.75005H5.88C5.08747 2.71472 4.31319 2.99475 3.72661 3.52886C3.14002 4.06297 2.78888 4.80768 2.75 5.60005V18.4C2.78888 19.1924 3.14002 19.9371 3.72661 20.4712C4.31319 21.0054 5.08747 21.2854 5.88 21.25H12"
                                            stroke="#A1A1AA"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M8.99875 12H21.2188"
                                            stroke="#A1A1AA"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M21.25 12L17.25 16"
                                            stroke="#A1A1AA"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M21.25 12L17.25 8"
                                            stroke="#A1A1AA"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                        <div class="d-flex align-center">
                            <Diamond class="diamond-icon"/>
                            <div>
                                <!--                                        <span class="balance d-block">{{ $t("balance") }} </span>-->
                                <span class="d-block amount"
                                >{{ convertMoney(userInfor?.me_money) }}
                            </span>
                            </div>
                            <div class="ml-2">
                                <Button
                                    variant="contained"
                                    :style="{ padding: '0 10px' }"
                                    :on-click="() => {router.push('deposit');}"
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                
                </div>
                <div class="language">
                    <img src="@/assets/G2casino/icon/globe.png" alt="lang"/>
                    <div class="custom-seclect-language">
                        <Dropdown @change="handleClickLang" :options="languages" optionLabel="key" optionValue="key"
                                  :placeholder="lang.key" class="dropdown-language w-full md:w-14rem"/>
                    </div>
                </div>
                <div @click="handleActive(activeNavbar)" class="more">
                    <More/>
                </div>
                <div class="wrap-nav-mobile" :class="activeNavbar ? 'active' : ''">
                    <div class="overlay" @click="handleActive(activeNavbar)"/>
                    <div class="nav-mobile" :class="activeNavbar ?'active-nav' : ''">
                        <div class="logo-mobile">
                            <a href="/">
                                <img alt="Vue logo" src="@/assets/G2casino/logo/logo-g2.png">
                            </a>
                        </div>
                        <div class="item" v-for="(nav, index) in navs" :key="index">
                            <button class="nav-item" @click="handleNavigate(nav?.href)">
                                {{ (nav?.text) }}
                            </button>
                        </div>
                        <div v-if="!auth" class="btn-auth btn-auth-mb">
                            <RouterLink :to="{name:'Login'}">{{ $t("login") }}</RouterLink>
                            <RouterLink :to="{name:'Signup'}">{{ $t("signup") }}</RouterLink>
                        </div>
                        <div v-else class="diamond diamond-mb">
                            <div class="user d-flex align-center">
                                <h5 class="mr-2">test user</h5>
                                <div class=" text-left">
                                    <button @click="handleLoggout">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path
                                                d="M12 2.75005H5.88C5.08747 2.71472 4.31319 2.99475 3.72661 3.52886C3.14002 4.06297 2.78888 4.80768 2.75 5.60005V18.4C2.78888 19.1924 3.14002 19.9371 3.72661 20.4712C4.31319 21.0054 5.08747 21.2854 5.88 21.25H12"
                                                stroke="#A1A1AA"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M8.99875 12H21.2188"
                                                stroke="#A1A1AA"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M21.25 12L17.25 16"
                                                stroke="#A1A1AA"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M21.25 12L17.25 8"
                                                stroke="#A1A1AA"
                                                stroke-width="1.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex align-center mt-4">
                                <Diamond/>
                                <div style="color: #000000">
                                    <span class="d-block amount mx-2"
                                    >{{ convertMoney(userInfor?.me_money) }}
                                    </span>
                                </div>
                                <div class="ml-2">
                                    <Button
                                        variant="contained"
                                        :style="{ padding: '0 10px' }"
                                        :on-click="() => {router.push('deposit');}"
                                    >
                                        +
                                    </Button>
                                </div>
                              
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    background-color: #040816;
    color: #FFFFFF;
    padding: 2rem 0;
    
    
    .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1440px;
        margin: 0 auto;
        
        .logo-group {
            background-color: transparent;
            border: unset;
            outline: unset;
            
            img {
                width: 100%;;
                height: 100%;
            }
        }
        
        .navbar {
            
            .nav-item {
                padding: 0.5rem 1rem;
                background-color: transparent;
                color: #FFFFFF;
                outline: unset;
                border: unset;
                
                &:hover {
                    opacity: 0.7;
                    transform: scale(0.99);
                    transition: all linear 0.2s;
                }
            }
        }
        
        .more {
            display: none;
            
            @media (max-width: 1060px) {
                display: block;
                margin-left: 1rem;
            }
        }
        
        .header-right {
            display: flex;
            align-items: center;
            
            .diamond {
                display: flex;
                align-items: center;
                
                .user {
                    position: relative;
                    margin: 0 1rem;
                    
                    h5 {
                        margin: 0;
                        max-width: 85px;
                        overflow: hidden;
                        font-size: 1rem;
                        text-overflow: ellipsis;
                    }
                    
                    .user-action {
                        position: absolute;
                        right: 0;
                        top: 52px;
                        background: #FFFFFF;
                        box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
                        border-radius: 5px;
                        z-index: 1;
                        display: none;
                        text-align: left;
                        list-style-type: none;
                        padding: 1rem;
                        
                        
                        li {
                            padding: 0.5rem 1rem;
                            color: var(--textG2Casino);
                            font-weight: 700;
                            
                            .link {
                                text-decoration: none;
                                color: var(--textG2Casino);
                            }
                            
                            &:hover {
                                opacity: 0.8;
                            }
                            
                            button {
                                span {
                                    margin-right: 0.5rem
                                }
                            }
                        }
                    }
                    
                    &::after {
                        content: "";
                        position: absolute;
                        width: 100px;
                        height: 30px;
                        //background: #0F172A;
                        right: 0;
                        top: 45px;
                    }
                    
                    &:hover {
                        .user-action {
                            display: block;
                        }
                    }
                    
                    .diamond-icon {
                        width: 16px;
                        margin-right: 5px;
                    }
                    
                    .amount {
                        max-width: 85px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
                
                
            }
            
            .btn-auth {
                color: #ffffff;
                padding-right: 2rem;
                display: flex;
                align-items: center;
                
                a {
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 700;
                    display: block;
                    
                    &:hover {
                        opacity: 0.7;
                        transform: scale(0.99);
                        transition: all linear 0.2s;
                    }
                    
                    &:last-child {
                        background: #254EE0;
                        padding: .7rem 0.8rem;
                        border-radius: 6px;
                        margin-left: 1rem;
                    }
                }
            }
            
            .language {
                display: flex;
                align-items: center;
                
                &:focus-visible, .dropdown-language:focus-visible {
                    outline: none;
                }
                
                img {
                    width: 24px;
                    margin-right: 5px;
                }
            }
            
            .wrap-nav-mobile {
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 5;
                overflow: hidden;
                opacity: 0;
                visibility: hidden;
                transition: .3s all ease-in-out;
                
                .language {
                    
                    .dropdown-toggle {
                        text-transform: uppercase;
                        border-radius: 20px;
                        border: 1px solid #D4D4D8;
                        background: #FAFAFA;
                        font-size: 14px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        padding: 6px 12px;
                    }
                    
                    .dropdown-menu {
                        top: -20px;
                        left: -165px;
                        width: 50% !important;
                        margin-top: 0;
                        padding: 4px;
                        
                        .dropdown-item {
                            padding: 4px;
                            font-size: 14px;
                            text-transform: uppercase;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                    
                    img {
                        width: 24px;
                        margin-right: 5px;
                    }
                }
                
                @media (max-width: 1060px) {
                    .overlay {
                        width: 100%;
                        height: 100%;
                        position: fixed;
                        z-index: 4;
                        background: rgba(0, 0, 0, 0.6);
                    }
                    
                    .nav-mobile {
                        width: 250px;
                        height: 100%;
                        background: #ffffff;
                        position: fixed;
                        top: 0;
                        left: -300px;
                        z-index: 9;
                        padding: 0 30px;
                        transition: .5s all ease-in-out;
                        
                        .logo-mobile {
                            display: flex;
                            justify-content: left;
                            padding: 20px 0;
                            
                            img {
                                width: 150px;
                                height: auto;
                            }
                        }
                        
                        .item {
                            margin: 3rem 0;
                            font-size: 16px;
                            font-weight: 400;
                            line-height: 22px;
                            letter-spacing: 0em;
                            text-align: left;
                            cursor: pointer;
                            
                            button {
                                color: #A1A1AA;
                                text-decoration: none;
                            }
                        }
                        
                    }
                    
                    .active-nav {
                        left: 0;
                    }
                    
                    .btn-auth {
                        display: block;
                        flex-direction: column;
                        padding-right: 0;
                        
                        a {
                            width: 100%;
                            margin: 0;
                            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                            padding: 0.7rem 1.5rem;
                            border-radius: 6px;
                            
                            &:first-child {
                                background: #ffffff;
                                color: #000000;
                                margin-bottom: 1rem;
                            }
                        }
                    }
                    
                    .diamond-mb {
                        display: block;
                    }
                }
                
            }
            
            @media (max-width: 1060px) {
                .btn-auth, .diamond {
                    display: none;
                }
            }
            
            .active {
                transition: .5s all ease-in-out;
                opacity: 1 !important;
                visibility: visible !important;
            }
        }
    }
}

@keyframes view {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.navbar-mobile {
    display: none
}

@media (max-width: 1060px) {
    header {
        .navbar {
            display: none;
        }
        
        .navbar-mobile {
            display: block;
        }
        
        .header-container {
            padding: 0 1.25rem;
            
            .header-right {
                flex-direction: row !important;
                
                .nav-mobile {
                    .user {
                        margin : 0;

                        h5 {
                            color: var(--textG2Casino);
                            text-align: left;
                            font-weight: 700;
                            margin-bottom: 0.5rem;
                        }
                        &:after {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    

}
</style>
<style lang="scss">
.custom-seclect-language {
    
    &:focus-visible {
        outline: none;
    }
    
    .p-dropdown {
        background: transparent;
        border: 0;
        
        &:not(.p-disabled).p-focus {
            outline: none;
            border-color: unset;
            box-shadow: unset;
        }
        
        .p-dropdown-label {
            color: #ffffff;
            text-transform: uppercase;
            padding: 0;
            margin-right: .5rem;
            font-weight: 700
        }
        
        .p-dropdown-trigger {
            padding: 0;
            width: 1rem;
            color: #ffffff;
            font-weight: 700;
            
            svg {
                width: 10px;
                height: 10px;
            }
        }
    }
}
</style>