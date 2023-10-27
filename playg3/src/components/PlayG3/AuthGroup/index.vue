<script setup>
import {computed} from "vue";
import {useStore} from "vuex";
import Diamond from "@/assets/PlayG3/icon/header/diamon.vue";
import Logout from "@/assets/PlayG3/icon/header/logout.vue";
import DropdownLang from "@/components/PlayG3/AuthGroup/DropdownLang.vue";

const store = useStore();
const auth = computed(() => store.state.auth.auth);
const handleLogout = ()=>{}
</script>

<template>
    <div class="auth-container">
        <div class="d-none d-lg-block mr-4">
            <DropdownLang/>
        </div>
        <div v-if="!auth">
            <RouterLink class="btn-text btn-login" :to="{ name: 'Login' }">
                {{ $t("login") }}
            </RouterLink>
            <RouterLink class="btn-contained btn-signup" :to="{ name: 'Signup' }">
                {{ $t("signup") }}
            </RouterLink>
        </div>
        <div v-else class="diamond-group">
            <component :is="Diamond"/>
            <div class="user">
                <h5>testuser1 testuser1</h5>
                <span class="amount">$ 10.000.000.000</span>
            </div>
            <button class="btn-deposit">
                <i class="pi pi-plus" style="font-size: 0.7rem"></i>
            </button>
            <ul class="user-action">
                <li class="user-action-item">
                    <router-link class="link btn-hover" :to="{ name: 'Profile' }"
                    >{{ $t("profile") }}
                    </router-link>
                </li>
                <li class="user-action-item">
                    <button class="btn-login btn-hover" @click="handleLogout">
                        <span>{{ $t("logout") }}</span>
                        <component class="ms-5" :is="Logout"/>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth-container {
    display: flex;
    align-items: center;
    
    .btn-login,
    .user,
    .btn-signup {
        margin-right: 0.875rem;
        color: var(--textPlayG3);
        text-decoration: none;
    }
    
    .user {
        margin: 0 0.8rem;
        max-width: 90px;
        
        h5 {
            width: 100%;
            color: var(--textSecondPlayG3);
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .amount {
            white-space: nowrap;
            max-width: 105.28px;
            font-size: 0.825rem;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    
    .diamond-group {
        display: flex;
        align-items: center;
        position: relative;
        
        .btn-deposit {
            background-color: var(--primaryPlayG3);
            padding: 0 0.4rem;
            border-radius: 5px;
        }
        
        .user-action {
            position: absolute;
            z-index: 5;
            display: none;
            top: 100%;
            list-style: none;
            background-color: #1a1c20;
            padding: 1rem;
            border-radius: 8px;
            
            .user-action-item {
                padding: 0.875rem 0;
            }
            
            .link {
                display: block;
                text-decoration: none;
                color: var(--textPlayG3);
            }
        }
        
        &:hover {
            .user-action {
                display: block;
            }
        }
    }
}
</style>
