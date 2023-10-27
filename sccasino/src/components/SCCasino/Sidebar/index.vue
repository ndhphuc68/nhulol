<script setup>
import {navs} from "./data";
import {useStore} from "vuex";
import {computed} from "vue";
import {convertMoney} from "@/utils/SCCasino";
import svgIcon from "@/assets/SCCasino/icon/commons";

// const $emit = defineEmits(["handleToggleSidebar"]);

const store = useStore();
const auth = computed(() => store.state.auth.auth);
const activeSidebar = computed(() => store.state.auth.activeSidebar);
const openSidebar = computed(() => store.state.auth.sidebar);
const handleLogin = () => {
    store.commit("handleLogin", null);
};
const handleShowModal = (key, idx) => {
    store.commit("handleCloseAllModal");
    store.commit("handleToggleSidebar", false);
    if (key) {
        store.commit("handleToggle", key);
        store.commit("handleToggleSidebar", false);
        store.commit("handleActiveSidebar", idx);
    }
    
};

const handleToggleSidebar = (status) => {
    store.commit("handleToggleSidebar", status);
};
</script>

<template>
    <div class="sidebar">
        <div class="in-mobile sidebar-top">
            <button @click="handleToggleSidebar(!openSidebar)">
                <i class="pi pi-times" style="font-size: 1.5rem"></i>
            </button>
        </div>
        <nav class="nav-container">
            <button
                v-for="(nav, index) in navs"
                :key="index"
                class="nav-item"
                :class="{ active: activeSidebar === index }"
                @click="handleShowModal(nav?.key, index)"
            >
                <component class="nav-icon" :is="nav?.icon"/>
                <span class="nav-title">{{ $t(nav?.text) }}</span>
            </button>
        </nav>
        <template v-if="auth">
            <div class="betting-info">
                <div class="betting-title">
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.875 8H11.25V11.75H10.875C10.3777 11.75 9.90081 11.5525 9.54918 11.2008C9.19755 10.8492 9 10.3723 9 9.875C9 9.37772 9.19755 8.90081 9.54918 8.54917C9.90081 8.19754 10.3777 8 10.875 8ZM13.875 13.25H12.75V17H13.875C14.3723 17 14.8492 16.8025 15.2008 16.4508C15.5525 16.0992 15.75 15.6223 15.75 15.125C15.75 14.6277 15.5525 14.1508 15.2008 13.7992C14.8492 13.4475 14.3723 13.25 13.875 13.25ZM21.75 12.5C21.75 14.4284 21.1782 16.3134 20.1068 17.9168C19.0355 19.5202 17.5127 20.7699 15.7312 21.5078C13.9496 22.2458 11.9892 22.4389 10.0979 22.0627C8.20656 21.6865 6.46928 20.7579 5.10571 19.3943C3.74215 18.0307 2.81355 16.2934 2.43735 14.4021C2.06114 12.5108 2.25422 10.5504 2.99218 8.76884C3.73013 6.98726 4.97982 5.46451 6.58319 4.39317C8.18657 3.32183 10.0716 2.75 12 2.75C14.585 2.75273 17.0634 3.78084 18.8913 5.60872C20.7192 7.43661 21.7473 9.91498 21.75 12.5ZM17.25 15.125C17.25 14.2299 16.8944 13.3715 16.2615 12.7385C15.6286 12.1056 14.7701 11.75 13.875 11.75H12.75V8H13.125C13.6223 8 14.0992 8.19754 14.4508 8.54917C14.8025 8.90081 15 9.37772 15 9.875C15 10.0739 15.079 10.2647 15.2197 10.4053C15.3603 10.546 15.5511 10.625 15.75 10.625C15.9489 10.625 16.1397 10.546 16.2803 10.4053C16.421 10.2647 16.5 10.0739 16.5 9.875C16.5 8.97989 16.1444 8.12145 15.5115 7.48851C14.8786 6.85558 14.0201 6.5 13.125 6.5H12.75V5.75C12.75 5.55109 12.671 5.36032 12.5303 5.21967C12.3897 5.07902 12.1989 5 12 5C11.8011 5 11.6103 5.07902 11.4697 5.21967C11.329 5.36032 11.25 5.55109 11.25 5.75V6.5H10.875C9.9799 6.5 9.12145 6.85558 8.48852 7.48851C7.85558 8.12145 7.5 8.97989 7.5 9.875C7.5 10.7701 7.85558 11.6285 8.48852 12.2615C9.12145 12.8944 9.9799 13.25 10.875 13.25H11.25V17H10.5C10.0027 17 9.52581 16.8025 9.17418 16.4508C8.82255 16.0992 8.625 15.6223 8.625 15.125C8.625 14.9261 8.54599 14.7353 8.40533 14.5947C8.26468 14.454 8.07392 14.375 7.875 14.375C7.67609 14.375 7.48533 14.454 7.34467 14.5947C7.20402 14.7353 7.125 14.9261 7.125 15.125C7.125 16.0201 7.48058 16.8785 8.11352 17.5115C8.74645 18.1444 9.6049 18.5 10.5 18.5H11.25V19.25C11.25 19.4489 11.329 19.6397 11.4697 19.7803C11.6103 19.921 11.8011 20 12 20C12.1989 20 12.3897 19.921 12.5303 19.7803C12.671 19.6397 12.75 19.4489 12.75 19.25V18.5H13.875C14.7701 18.5 15.6286 18.1444 16.2615 17.5115C16.8944 16.8785 17.25 16.0201 17.25 15.125Z"
                            fill="#0189FF"
                        />
                    </svg>
                    <span>
            {{ $t("totalBalance") }}
          </span>
                </div>
                <p class="betting-amount">{{ convertMoney(300000) }} {{ $t('won') }}</p>
                <button class="btn-betting-history">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                    >
                        <path
                            d="M21 12.5C21 14.2578 20.4853 15.9772 19.5193 17.4459C18.5533 18.9146 17.1783 20.0682 15.5642 20.7644C13.95 21.4605 12.1673 21.6687 10.4362 21.3633C8.70505 21.0578 7.10126 20.2521 5.82281 19.0456C5.75116 18.9779 5.69355 18.8967 5.65326 18.8067C5.61298 18.7167 5.59081 18.6197 5.58802 18.5212C5.58524 18.4226 5.60189 18.3245 5.63702 18.2324C5.67216 18.1403 5.7251 18.056 5.79281 17.9843C5.92957 17.8396 6.1182 17.7552 6.31722 17.7495C6.41577 17.7468 6.5139 17.7634 6.60601 17.7985C6.69812 17.8337 6.78241 17.8866 6.85406 17.9543C7.92632 18.9659 9.2729 19.6391 10.7256 19.8897C12.1782 20.1404 13.6725 19.9574 15.0218 19.3636C16.371 18.7698 17.5153 17.7916 18.3118 16.5512C19.1083 15.3107 19.5215 13.8631 19.5 12.3891C19.4784 10.9152 19.0229 9.48025 18.1905 8.26367C17.358 7.04708 16.1855 6.10279 14.8195 5.54877C13.4535 4.99474 11.9544 4.85557 10.5097 5.14863C9.06504 5.44169 7.73875 6.15399 6.69656 7.19652C6.36563 7.53121 6.05438 7.86027 5.75156 8.18746L7.28063 9.71933C7.38563 9.82422 7.45716 9.95791 7.48615 10.1035C7.51514 10.249 7.50028 10.3999 7.44347 10.5371C7.38665 10.6742 7.29043 10.7913 7.16699 10.8737C7.04354 10.9562 6.89842 11.0001 6.75 11H3C2.80109 11 2.61032 10.9209 2.46967 10.7803C2.32902 10.6396 2.25 10.4489 2.25 10.25V6.49996C2.24988 6.35154 2.29381 6.20642 2.37621 6.08297C2.45861 5.95953 2.57579 5.86331 2.71291 5.80649C2.85002 5.74968 3.00092 5.73482 3.14648 5.76381C3.29204 5.7928 3.42573 5.86432 3.53063 5.96933L4.6875 7.12808C4.98938 6.8009 5.30063 6.47183 5.63063 6.13902C6.88883 4.87867 8.49267 4.01993 10.2391 3.6715C11.9856 3.32307 13.7962 3.5006 15.4417 4.18164C17.0872 4.86267 18.4937 6.01659 19.4832 7.49733C20.4726 8.97807 21.0005 10.7191 21 12.5ZM12 7.24996C11.8011 7.24996 11.6103 7.32898 11.4697 7.46963C11.329 7.61028 11.25 7.80105 11.25 7.99996V12.5C11.25 12.6294 11.2834 12.7567 11.3472 12.8694C11.4109 12.9821 11.5028 13.0764 11.6137 13.1431L15.3638 15.3931C15.4482 15.4438 15.5418 15.4774 15.6393 15.4919C15.7367 15.5065 15.8361 15.5017 15.9316 15.4778C16.0272 15.454 16.1172 15.4115 16.1964 15.3529C16.2755 15.2943 16.3424 15.2207 16.3931 15.1362C16.4438 15.0518 16.4774 14.9581 16.492 14.8607C16.5065 14.7633 16.5017 14.6639 16.4779 14.5683C16.454 14.4727 16.4116 14.3828 16.353 14.3036C16.2943 14.2244 16.2207 14.1576 16.1362 14.1068L12.75 12.0753V7.99996C12.75 7.80105 12.671 7.61028 12.5303 7.46963C12.3897 7.32898 12.1989 7.24996 12 7.24996Z"
                            fill="#0189FF"
                        />
                    </svg>
                    <span>
            {{ $t("bettingHistory") }}
          </span>
                </button>
            </div>
            <div class="sidebar-bottom in-mobile">
                <hr/>
                <router-link to="profile" class="btn-sidebar-bottom">
                    <div>
                        <component class="icon" :is="svgIcon.AccountIcon"/>
                    </div>
                    <span class="user-name">test userssssssssssssssssssss</span>
                </router-link>
                <button class="btn-sidebar-bottom" @click="handleLogin">
                    <component class="icon" :is="svgIcon.LogoutIcon"/>
                    <span class="user-name">{{ $t("logout") }}</span>
                </button>
            </div>
        </template>
        <div v-else class="sidebar-bottom in-mobile">
            <hr/>
            <div class="auth-group">
                <button
                    class="btn-auth"
                    @click="
            store.commit('handleToggle', 'login');
            store.commit('handleToggleSidebar', false);
          "
                >
                    {{ $t("login") }}
                </button>
                <button
                    class="btn-auth"
                    @click="
            store.commit('handleToggle', 'signUp');
            store.commit('handleToggleSidebar', false);
          "
                >
                    {{ $t("register") }}
                </button>
            </div>
        </div>
    </div>
    
    <div class="overlay"/>
</template>

<style scoped lang="scss">
.in-mobile {
    display: none;
}

.sidebar {
    height: 100%;
    overflow: auto;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    .sidebar-top {
        text-align: left;
        margin: 2rem 0;
    }
    
    .nav-container {
        display: flex;
        flex-direction: column;
        padding: 1.25rem;
        border-radius: 10px;
        background: #f2f2f2;
        
        .nav-item {
            text-align: left;
            padding: 1rem 0;
            display: flex;
            align-items: center;
            
            .nav-icon {
                margin-right: 0.5rem;
            }
            
            .nav-title {
                color: var(--text-secondSCCasino);
            }
            
            &:hover,
            &.active {
                .nav-title {
                    color: var(--primarySCCasino);
                }
            }
        }
    }
    
    .betting-info {
        padding: 1.25rem;
        border-radius: 10px;
        background: #f2f2f2;
        margin-top: 1.25rem;
        
        .betting-title {
            display: flex;
            align-items: center;
            
            svg {
                margin-right: 0.5rem;
            }
            
            span {
                color: var(--text-secondSCCasino);
            }
        }
        
        .betting-amount {
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--primarySCCasino);
        }
        
        .btn-betting-history {
            width: 100%;
            text-align: left;
            display: flex;
            align-items: center;
            
            &:hover {
                opacity: 0.8;
                transform: scale(0.98);
                transition: all linear 0.2s;
            }
            
            svg {
                margin-right: 0.5rem;
            }
        }
    }
    
    .sidebar-bottom {
        .btn-sidebar-bottom {
            display: flex;
            text-decoration: none;
            //justify-content: space-between;
            width: 100%;
            margin: 1.5rem 0;
            color: var(--text-secondSCCasino);
            
            .icon {
                width: 2rem;
            }
            
            .user-name {
                margin-left: 0.8rem;
                text-overflow: ellipsis;
                overflow: hidden;
                text-align: left;
                white-space: nowrap;
            }
            
            &:hover {
                transform: scale(0.98);
                transition: all linear 0.2s;
            }
        }
        
        .auth-group {
            display: flex;
            
            .btn-auth {
                padding: 0.3rem 1rem;
                position: relative;
                font-weight: 500;
                
                &:nth-child(1) {
                    &::after {
                        content: "";
                        position: absolute;
                        height: 70%;
                        top: 10%;
                        left: 100%;
                        border-right: 1px solid #7a7a7a;
                    }
                }
                
                &:hover {
                    color: var(--primarySCCasino);
                    transform: scale(0.97);
                    opacity: 0.8;
                    transition: all linear 0.2s;
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .sidebar {
        position: absolute;
        width: 100%;
        z-index: 5;
        background: var(--bgSCCasino);
        padding: 1.25rem;
        top: 0;
        left: 0;
    }
    .in-mobile {
        display: block;
    }
}
</style>
<style lang="scss">
.sidebar {
    .nav-item.active,
    .nav-item:hover {
        .nav-icon {
            &.stroke {
                path {
                    stroke: var(--primarySCCasino);
                }
            }
            
            &.fill {
                path {
                    fill: var(--primarySCCasino);
                }
            }
        }
    }
    
    .nav-item:hover {
        transform: scale(0.97);
        transition: all linear 0.2s;
    }
}
</style>
