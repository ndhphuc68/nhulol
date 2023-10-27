<template>
    <div class="popup-signUp">
        <div class="title mb-4 px-2">
            <h3>{{ $t("signup") }}</h3>
            <p>{{ $t("Pleascheck") }}</p>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <form action="">
                        <div class=" d-flex flex-column mb-3">
                            <label for="userId">{{ $t("userId") }}</label>
                            <input id="userId" :placeholder="$t('enterUserId')" type="text">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="nickname">{{ $t("nickName") }}</label>
                            <input id="nickname" :placeholder="$t('enterNickName')" type="text">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="newpassword">{{ $t("Password") }}</label>
                            <input id="newpassword" :placeholder="$t('enterPassword')" type="password">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="password">{{ $t("confirmPassword") }}</label>
                            <input id="password" :placeholder="$t('enterConfirmPassword')" type="password">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="phonenumber">{{ $t("phoneNumber") }}</label>
                            <input id="phonenumber" :placeholder="$t('enterPhoneNumber')" type="text">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="account">{{ $t("accountHolder") }}</label>
                            <input id="account" :placeholder="$t('enterAccountHolder')" type="text">
                        </div>
                    </form>
                </div>
                <div class="col-12 col-md-6">
                    <form action="">
                        <div class=" d-flex flex-column mb-3">
                            <label for="bankername">{{ $t("bankerName") }}</label>
                            <input id="bankername" v-model="bankName" :placeholder="$t('enterBankerName')"
                                   type="text" @click="handleToggleViewPickBank">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="bankaccount">{{ $t("bankAccount") }}</label>
                            <input id="bankaccount" :placeholder="$t('enterBankAccount')" type="text">
                        </div>
                        <div class=" d-flex flex-column mb-3">
                            <label for="partnercode">{{ $t("partnerCode") }}</label>
                            <input id="partnercode" :placeholder="$t('enterPartnerCode')" type="text">
                        </div>
                        <div class="submitSignup">
                            <input :value="$t('signup')" type="submit">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <PickBank v-if="isViewPickBank" :handle-change-bank-name="handleChangeBankName"
              :handle-close="handleToggleViewPickBank"/>
</template>

<script setup>
import PickBank from './Components/PickBank/index.vue'
import {ref} from "vue";

const isViewPickBank = ref(false)
const bankName = ref('');
const handleToggleViewPickBank = () => {
    isViewPickBank.value = !isViewPickBank.value
}
const handleChangeBankName = (name) => {
    if (name) {
        bankName.value = name
        
    }
}
</script>

<style lang="scss" scoped>
.popup-signUp {
    padding: 32px 72px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    
    input {
        padding: 12px 14px;
        border: 1px solid #D0D5DD;
        border-radius: 6px;
        margin: 10px 0;
        
        &:focus-visible {
            outline: none;
        }
    }
    
    .submitSignup {
        text-align: right;
        
        input {
            background-color: #1E3EB3;
            color: #FFFFFF;
            padding: 12px 24px;
            border: 0;
        }
    }
}

@media (max-width: 541px) {
    .popup-signUp[data-v-46e88d1a] {
        padding: 15px;
    }
}
</style>