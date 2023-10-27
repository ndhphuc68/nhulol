<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

const auth = store.state.auth.auth;

const handleClickSendMoney = () => {
    if (auth) {
        router.push({name: "Deposit"});
    } else {
        router.push({name: "Login"});
    }
    window.scrollTo({top: 0, behavior: "smooth"});
};

const handleClickRegister = () => {
    router.push({name: "Signup"});
    window.scrollTo({top: 0, behavior: "smooth"});
};
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col col-md-6">
                <div class="banner-item">
                    <img
                        class="d-none d-md-block"
                        alt="banner-center-2"
                        src="@/assets/PlayG3/banner/banner_center_1.png"
                    />
                    <img
                        class="d-block d-md-none"
                        alt="banner-center-2"
                        src="@/assets/PlayG3/banner/banner_center_1_mobile.png"
                    />
                    <div class="banner-content">
                        <h4>{{ $t('banner-center-title-1') }}</h4>
                        <p>{{$t('banner-center-content-1')}}
                        </p>
                        <button class="btn-contained" @click="handleClickSendMoney">
                            {{ $t("sendMoney") }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col col-12 col-md-6 item-2">
                <div class="banner-item">
                    <img
                        class="d-none d-md-block"
                        alt="banner-center-2"
                        src="@/assets/PlayG3/banner/banner_center_2.png"
                    />
                    <img
                        class="d-block d-md-none"
                        alt="banner-center-2"
                        src="@/assets/PlayG3/banner/banner_center_2_mobile.png"
                    />
                    <div class="banner-content">
                        <h4>{{$t('banner-center-title-2')}}</h4>
                        <p>{{$t('banner-center-content-2')}}
                        </p>
                        <button
                            class="btn-contained btn-register"
                            @click="handleClickRegister"
                        >
                            {{ $t("register") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin-top: 3rem;
    margin-bottom: 3rem;
    
    .banner-item {
        position: relative;
        
        img {
            width: 100%;
        }
        
        .banner-content {
            position: absolute;
            padding: 1rem;
            top: 10%;
            width: 80%;
            right: 1rem;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
            
            h4 {
                min-height: 50px;
            }
            
            .btn-register {
                background-color: #9e61ec;
            }
        }
    }
}

@media (max-width: 1400px) {
    .container {
        .banner-item {
            .banner-content {
                width: 95%;
            }
        }
    }
}

@media (max-width: 1200px) {
    .container {
        .banner-item {
            .banner-content {
                h4 {
                    min-height: unset;
                    font-size: 0.875rem;
                }
                
                p {
                    font-size: 0.75rem;
                }
            }
        }
    }
}

@media (max-width: 992px) {
    .container {
        .banner-item {
            img {
                height: 550px;
                //object-fit: cover
            }
            
            .banner-content {
                top: unset;
                bottom: 2%;
                min-height: 220px;
                width: 90%;
            }
        }
    }
}

@media (max-width: 767px) {
    .container {
        .banner-item {
            .banner-content {
                width: 94%;
            }
        }
    }
    .item-2 {
        margin-top: 3rem;
    }
}
</style>
