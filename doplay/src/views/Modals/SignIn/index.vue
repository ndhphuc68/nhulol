<script setup>
import Button from '@/components/Customs/Button'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ref} from "vue";
import Modal from "@/components/Modal/Modal.vue";
import PickBank from './components/PickBank'

const date = ref('');
const isShowPickBank = ref(false);
const bankName = ref('');

function handleChangeBankName(name) {
    bankName.value = name;
}

function handleOpenPickBank() {
    isShowPickBank.value = true
}

function handleClosePickBank() {
    isShowPickBank.value = false
}
</script>

<template>
    <Modal
        v-if="isShowPickBank"
        :handleClose="handleClosePickBank"
        :modal="'pickBank'"
    >
        <PickBank :handleChangeBankName="handleChangeBankName" :handleClose="handleClosePickBank"/>
    </Modal>
    <div class="container">
        <div class="login-form">
            <div>
                <h5 class="text-center title">Register</h5>
            </div>
            <div class="form-content v-row">
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        class="form-item"
                        label="ID"
                        prepend-icon="mdi-account-outline"
                        variant="solo"
                    ></v-text-field>
                    <v-text-field
                        class="form-item"
                        error-messages="pass not true"
                        label="Password"
                        prepend-icon="mdi-lock-outline"
                        type="password"
                        variant="solo"
                    ></v-text-field>
                    <v-text-field
                        class="form-item"
                        label="Confirm Password"
                        prepend-icon="mdi-lock-outline"
                        type="password"
                        variant="solo"
                    ></v-text-field>
                    <div class="d-flex align-center form-item">
                        <img alt="" class="date-icon" src="@/assets/icon/commons/date.png"/>
                        <VueDatePicker v-model="date" :auto-position="true" :teleport="true"
                                       placeholder="Birthday" position="right"></VueDatePicker>
                    </div>
                    <v-text-field
                        class="form-item mt-10"
                        label="Holder"
                        prepend-icon="mdi-account-outline"
                        variant="solo"
                    ></v-text-field>
                    <v-text-field
                        class="form-item"
                        label="Account Number"
                        prepend-icon="mdi-format-list-bulleted-type"
                        variant="solo"
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                        class="form-item"
                        label="Mobile No"
                        prepend-icon="mdi-cellphone-text"
                        type="number"
                        variant="solo"
                    ></v-text-field>
                    <div class="form-item">
                        <v-radio-group inline label="Gender">
                            <v-radio label="Male" value="male"></v-radio>
                            <v-radio label="Female" value="female"></v-radio>
                            <v-radio label="Other" value="other"></v-radio>
                        </v-radio-group>
                    </div>
                    <v-text-field
                        :model-value="bankName"
                        class="form-item"
                        label="Bank Name"
                        prepend-icon="mdi-bank-outline"
                        type="text"
                        variant="solo"
                        @click="handleOpenPickBank"
                    ></v-text-field>
                    <v-text-field
                        class="form-item"
                        label="Register Code"
                        prepend-icon="mdi-qrcode"
                        type="text"
                        variant="solo"
                    ></v-text-field>
                </v-col>
            </div>
            <Button :isFullWidth="true" variant="contained">Register Now</Button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    margin: 40px;
    max-height: 100vh;
    max-width: 100vw;
}

.title {
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: var(--primary);
    margin-bottom: 20px;
    //margin-top: -20px;
}

.date-icon {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    margin-left: 2px;
}

.form-item {
    margin: 20px 0;
}

@media (min-width: 1024px) {
    .container {
        width: 900px;
    }
}

</style>
<style>
.login-form .dp__icon {
    display: none;
}

.login-form .dp__input_icon_pad {
    padding-left: 15px;
}

.login-form .dp__pointer.dp__input_readonly {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 10px 15px;
}

</style>