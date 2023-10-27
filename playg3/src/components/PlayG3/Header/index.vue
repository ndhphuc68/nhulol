<script setup>
import {navList} from "./data";
import AuthGroup from "@/components/PlayG3/AuthGroup";
import {ref, watch} from "vue";
import Sidebar from "@/components/PlayG3/Sidebar";
import {useRoute} from "vue-router";

const location = useRoute();
const isViewToggle = ref(false);

watch(isViewToggle, () => {
    if (isViewToggle.value) {
        document.documentElement.style.overflow = 'hidden'
    } else {
        document.documentElement.style.overflow = 'visible'
    }
})
</script>

<template>
    <header class="header">
        <div class="header-container container">
            <div class="logo-group">
                <button
                    class="d-block d-lg-none btn-menu"
                    @click="isViewToggle = !isViewToggle"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                    >
                        <path
                            d="M7 8.5H17M7 12.5H17M7 16.5H17"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
                <router-link :to="{ name: 'Home' }" class="d-block">
                    <img class="logo" alt="logo" src="@/assets/PlayG3/logo/logo.png"/>
                </router-link>
            </div>
            <nav class="d-none d-lg-block">
                <RouterLink
                    class="nav-item"
                    v-for="(nav, index) in navList"
                    :class="{ active: location?.name === nav?.name }"
                    :to="{ name: nav?.name }"
                    :key="index"
                >
          <span>
            {{ $t(nav?.text) }}
          </span>
                </RouterLink>
            </nav>
            <div>
                <AuthGroup/>
            </div>
        </div>
<!--        <div class=" d-block d-lg-none">-->
<!--            <div>-->
<!--               -->
<!--            </div>-->
<!--        </div>-->
<!--    -->
        <Sidebar
            :isViewToggle="isViewToggle"
            class="sidebar d-block d-lg-none"
            :class="{open: isViewToggle}"
            :handleToggleSidebar=" () => { isViewToggle = !isViewToggle; }"
        />
    </header>
</template>

<style scoped lang="scss">
.header {
    background-color: #130c25;
    height: var(--height-header-PlayG3);
    
    .header-container {
        display: flex;
        justify-content: space-between;
        margin: auto;
        height: 100%;
        align-items: center;
        max-width: 1440px;
        width: 98%;
        font-size: 90%;
        
        .logo-group {
            display: flex;
            align-items: center;
            max-width: 100px;
            
            .btn-menu {
                svg {
                    width: 3rem;
                    height: 3rem;
                }
            }
            
            img {
                width: 95px;
            }
        }
        
        nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            .nav-item {
                text-decoration: none;
                font-style: unset;
                color: var(--textSecondPlayG3);
                padding: 0 0.75rem;
                position: relative;
                
                &:hover,
                &.active {
                    color: var(--primaryPlayG3);
                    
                    &:after {
                        content: "";
                        position: absolute;
                        background-color: var(--primaryPlayG3);
                        bottom: -150%;
                        left: 0;
                        width: 100%;
                        height: 2px;
                    }
                }
            }
        }
    }
}

.sidebar {
    left: -300px;
    transition: all linear 0.3s;
   //animation: closeSidebar  linear 0.3s;
    &.open {
        left: 0;
        //animation: openSidebar  linear 0.3s;
    }
}

//@keyframes openSidebar {
//    from {
//        left: -300px
//    }
//    to {
//        left: 0
//    }
//}
//@keyframes closeSidebar {
//    from {
//        left: 0
//    }
//    to {
//        left: -300px
//    }
//}

@media (max-width: 768px) {
    .header {
        .header-container {
            .logo-group {
                .logo {
                    max-width: 85px;
                }
            }
        }
    }
}
</style>
