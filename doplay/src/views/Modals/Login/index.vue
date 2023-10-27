<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import SignIn from "@/views/Modals/SignIn";
import banners from "@/assets/banners";
import Button from "@/components/Customs/Button";
import Loading from "@/components/Loading";
import { useI18n } from "vue-i18n";
import { encryptDataV2 } from "@/utils/encrypt";
// import { getPingRequest } from "@/api/getPing";
import { setCookie } from "@/utils/cookie";

const { t } = useI18n();
const checkBox = ref(false);
const store = useStore();
const terms = ref(false);
const user = ref({
    account: "",
    password: "",
});
const isLoading = ref(false);

const handleLogin = async (e) => {
    e.preventDefault();
    console.log(user.value);
    isLoading.value = true;
    const res = await store.dispatch("loginAction", user.value);
    if (store.state.auth.auth && res.is_success) {
        if (checkBox.value) {
            localStorage.setItem("mIdx", res.mIdx);
            localStorage.setItem("_slg", encryptDataV2(JSON.stringify(user.value)));
        } else {
            setCookie("mIdx", res.mIdx);
            sessionStorage.setItem("mIdx", res.mIdx);
        }
        // await handleFetchLogin();
        // await getPingRequest()
        isLoading.value = false;
        store.commit("handleClose", "login");
        setCookie("CID", JSON.stringify(user.value));
        await store.dispatch("showAlert", {
            type: "success",
            message: t("login_success"),
        });
        document.querySelector("html").style.overflowY = "scroll";
        // const myInterval = setInterval(handleFetchLogin, 10000);
        // const intervalPing = setInterval(
        //   () => getPingRequest(userInfor.value.me_idx),
        //   5000
        // );
        // await store.dispatch("startIntervalAction", myInterval);
        // await store.dispatch("startIntervalPingAction", intervalPing);
    } else {
        if (res?.error_code == "-100004") {
            await store.dispatch("showAlert", {
                type: "error",
                message: t("error_code_100004"),
            });
        } else if (res?.error_code == "-100005") {
            await store.dispatch("showAlert", {
                type: "error",
                message: t("error_code_100005"),
            });
        } else if (res?.error_code == "-100006") {
            await store.dispatch("showAlert", {
                type: "error",
                message: t("error_code_100006"),
            });
        } else {
            await store.dispatch("showAlert", {
                type: "error",
                message: t("login_failed"),
            });
        }
        isLoading.value = false;
    }
};

function handleOpenSignup() {
    store.commit("openModal", { modalKey: "signin", component: () => SignIn });
}
</script>

<template>
    <div class="d-flex container justify-center">
        <div class="banner v-col-4 d-none d-md-block">
            <img :src="banners.login" alt="banner" />
        </div>
        <div class="login-form v-col-12 v-col-md-4">
            <div class="login-title">
                <h5>LOGIN</h5>
            </div>
            <form class="form-content">
                <v-col cols="12" sm="12">
                    <!-- error in  hint=""-->
                    <div class="form-item">
                        <v-text-field
                            label="Account"
                            v-model="user.account"
                            variant="outlined"
                        ></v-text-field>
                    </div>
                    <div class="form-item mb-2">
                        <v-text-field
                            hint="Enter your password to access this website"
                            label="Password"
                            v-model="user.password"
                            type="password"
                            variant="outlined"
                        ></v-text-field>
                    </div>
                    <div>
                        <v-checkbox
                            v-model="terms"
                            color="secondary"
                            label="Remember account"
                        ></v-checkbox>
                    </div>
                    <div class="d-flex justify-space-between">
                        <Button class="btn-login" variant="outlined" :onClick="handleLogin"
                        >Login</Button
                        >
                        <Button class="btn-login" variant="contained">Guest Mail</Button>
                    </div>
                    <div class="form-item d-flex justify-center">
                        <p>Don’t have an account?</p>
                        <Button :onClick="handleOpenSignup" class="btn-login" variant="text"
                        >Register</Button
                        >
                    </div>
                </v-col>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: 1120px;
    max-height: 100vh;
    max-width: 100vw;
}

.banner {
    width: 416px;
    height: 600px;
}

.login-title {
    padding-bottom: 22px;
    width: 95%;
    margin: 0 auto 0;
    border-bottom: 1px solid var(--primary);
}

.login-title h5 {
    margin: 0 auto;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
}

.form-item {
    margin: 35px 0;
}

.btn-login {
    width: 42%;
}

//@media (max-width: 768px) {
//    .container {
//        width: 100vw;
//        padding: 10px;
//        min-width: unset;
//        border-radius: 5px;
//    }
//}
</style>
