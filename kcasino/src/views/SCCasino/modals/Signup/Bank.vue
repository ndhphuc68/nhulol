<template>
    <form id="bank">
        <div class="field">
            <div class="label">
                <IconHolder/>
                Holder*
            </div>
            <InputCheck
                v-model="id"
                :isShowCheck="true"
                :isCheck="errors.id ? 'cross' : 'check'"
                placeholder="Change of account holder is not possible"
            />
            <small class="p-error" id="text-error">{{ errors.id || "&nbsp;" }}</small>
        </div>
        <div class="field" @click.self="handleSelect(true)">
            <div class="label">
                <IconBank/>
                Bank Name*
            </div>
            <div class="dropdown">
                <div
                    aria-expanded="false"
                    class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    type="button"
                >
                    {{ $t(selectOption?.name) || "Choose Bank" }}
                </div>
                <ul class="dropdown-menu">
                    <li
                        v-for="(option, index) in banks"
                        :key="index"
                        @click="handleSelectOption(option)"
                        :class="option.name === selectOption.name ? 'active' : ''"
                    >
                        <img
                            :src="require(`@/assets/SCCasino/bank/banklogo_${index + 1}.png`)"
                            class="dropdown-option-image"
                            style="height: 20px"
                        />
                        <span class="dropdown-option-label">{{ $t(option.name) }}</span>
                    </li>
                </ul>
            </div>
            <small class="p-error" id="text-error">{{
                    errors?.confirm_password || "&nbsp;"
                }}</small>
        </div>
        <div class="field">
            <div class="label">
                <IconAccountNumber/>
                Account Number*
            </div>
            <InputCheck
                v-model="id"
                :isShowCheck="true"
                :isCheck="errors.id ? 'cross' : 'check'"
                placeholder="Account number (your name account)"
            />
            <small class="p-error" id="text-error">{{
                    errors?.confirm_password || "&nbsp;"
                }}</small>
        </div>
        <div class="field">
            <div class="label">
                <IconRefCode/>
                Register Code
            </div>
            <InputCheck
                v-model="id"
                :isShowCheck="true"
                :isCheck="errors.id ? 'cross' : 'check'"
                placeholder="Account number (your name account)"
            />
            <small class="p-error" id="text-error">{{
                    errors?.confirm_password || "&nbsp;"
                }}</small>
        </div>
        <button
            type="button"
            class="btn-modal mb-3 btn-guest w-100 py-2"
            @click="
        handleSubmitForm(
          handleSubmit({
            holder: holder?.value,
            bank_name: bank_name?.value,
            account_number: account_number?.value,
            ref_code: ref_code?.value.length > 1 ? ref_code?.value : null,
          })
        )
      "
        >
            Register Now
        </button>
    </form>
</template>

<script setup>
import IconBank from "@/assets/SCCasino/icon/IconBank.vue";
import IconAccountNumber from "@/assets/SCCasino/icon/IconAccountNumber.vue";
import IconRefCode from "@/assets/SCCasino/icon/IconRefCode.vue";
import IconHolder from "@/assets/SCCasino/icon/IconHolder.vue";
import InputCheck from "@/components/SCCasino/Input/InputCheck";

import {useForm} from "vee-validate";
import {schemaSignupBank} from "../schema";
import {ref} from "vue";
import {defineProps} from "vue";

defineProps({
    handleSubmitForm: Function,
    selectOption: Object,
    handleSelectOption: Function,
    dataSignup: Object,
    errorSignUp: Object,
});

// const selectOption = ref({
//   img: "",
//   name: "",
// });
const banks = ref([
    {name: "bank_kb"},
    {name: "bank_kakao"},
    {name: "bank_nhbank"},
    {name: "bank_nh"},
    {name: "bank_sh"},
    {name: "bank_wr"},
    {name: "bank_hn"},
    {name: "bank_sc"},
    {name: "bank_ibk"},
    {name: "bank_bnk"},
    {name: "bank_dgb"},
    {name: "bank_pb"},
    {name: "bank_kjb"},
    {name: "bank_mg"},
    {name: "bank_kbank"},
    {name: "bank_sbi"},
    {name: "bank_keb"},
    {name: "bank_citi"},
    {name: "bank_cnh"},
    {name: "bank_cu"},
]);

// const handleSelect = (active) => {
//   (1);
//   isDropdownOpen.value = !active;
// };

// const selectOptions = (option) => {
//   selectOption.value = option;
// };

const getIcon = (idx) => {
    return require("@/assets/SCCasino/bank_" + (idx + 1) + ".png");
};

const {handleSubmit, useFieldModel, resetForm, errors} = useForm({
    validationSchema: schemaSignupBank,
});

const [holder, account_number, bank_name, ref_code] = useFieldModel([
    "holder",
    "account_number",
    "bank_name",
    "ref_code",
    // "accountHolder",
    // "bankName",
    // "bankAccount",
    // "partnerCode",
]);
</script>

<style scoped lang="scss">
form {
    text-align: left;
    
    .field {
        margin-bottom: 2px;
        
        select {
            width: 100%;
            height: 35px;
            border: 1px solid;
            padding: 0 10px;
            
            &:focus {
                outline: none;
            }
            
            option {
                img {
                    background-color: red;
                }
            }
        }
        
        .label {
            color: #7a7a7a;
            font-size: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            
            svg {
                margin-right: 5px;
            }
        }
        
        #text-error {
            font-size: 12px;
            margin-left: 5px;
        }
        
        .p-dropdown {
            height: 35px;
            width: 100%;
        }
    }
    
    .dropdown {
        border: 1px solid #d4d4d8;
        padding: 6px 10px;
        border-radius: 8px;
        width: 100%;
        position: relative;
        
        .dropdown-option-label {
            font-size: 14px;
            opacity: 0.9;
            cursor: pointer;
        }
        
        .dropdown-toggle {
            font-size: 14px;
            color: #747579;
            
            &::after {
                display: none;
            }
        }
        
        .dropdown-menu {
            height: 300px;
            overflow-y: scroll;
            transform: translate(0px, 39px) !important;
            width: 100%;
            
            &::-webkit-scrollbar {
                width: 0;
            }
            
            li {
                padding: 5px 20px;
                width: 100%;
                
                img {
                    margin-right: 10px;
                }
                
                &:hover {
                    transform: scale(0.98);
                    transition: all linear 0.2s;
                    background: #90caf9;
                }
            }
            
            .active {
                background: #90caf9;
            }
        }
    }
    
    button {
        color: var(--bgSCCasino);
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        background: var(--primarySCCasino);
        padding: 10px 0;
        margin-top: 10px;
        
        &:hover {
            opacity: 0.8;
        }
    }
}
</style>
<!-- 
<style>
.p-dropdown-label {
  padding: 4px 15px !important;
}
.p-dropdown-item {
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.item-select-bank {
  display: flex;
  /* justify-content: center; */
  align-items: center;

  .label-select {
    margin-left: 10px;
  }
}

.p-dropdown-trigger {
  width: 2rem !important;
}
</style> -->
