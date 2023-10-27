<template>
    <div class="my-info">
        <div class="title">
            <h3> {{ $t('bankAccountInfo') }}</h3>
            <!-- <button v-if="!editActive" class="btn-edit" @click=" handleEditForm(editActive)">
                Edit
            </button> -->
        </div>
        <form>
            <div class="field">
                <label> {{ $t('bankName') }}</label>
                <input :value="userInfor?.me_bank_name" :disabled="editActive ? false : true" type="text"/>
            </div>
            <div class="field">
                <label> {{ $t('bankAccount') }}</label>
                <input :value="userInfor?.me_bank_number" :disabled="editActive ? false : true" type="text"/>
            </div>
            <div class="field">
                <label> {{ $t('accountHolder') }}</label>
                <input :value="userInfor?.me_bank_account" :disabled="editActive ? false : true" type="text"/>
            </div>
            <div class="field">
                <label> {{ $t('totalBalance') }}</label>
                <input :value="convertMoney(userInfor?.me_money)" disabled type="text"/>
            </div>
            <div class="btn-save">
                <button v-if="editActive" type="submit" @click="handleSaveForm">
                    {{ $t('save') }}
                </button>
                <button v-if="editActive" @click="handleEditForm(editActive)">
                    {{ $t('cancel') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useStore} from "vuex";
import {convertMoney} from "@/utils";

const store = useStore()
const userInfor = {
    me_bank_name:'test',
    me_bank_number: 1172362122,
    me_bank_account: 'test',
    me_money: 999999
}

const editActive = ref(false)

const handleEditForm = (active) => {
    editActive.value = !active
}

const handleSaveForm = e => {
    e.preventDefault()
}
</script>

<style lang="scss" scoped>
.my-info {
    max-width: 1440px;
    width: 80%;
    margin: 0 auto;
    padding: 24px;
    
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        
        h3 {
            color: #000;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
        
        .btn-edit {
            padding: 8px 14px;
            border-radius: 8px;
            border: 1px solid #D0D5DD;
            background: #FFF;
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
        }
    }
    
    form {
        display: grid;
        grid-template-columns: repeat(2,300px);
        grid-gap: 24px;
        
        .field {
            display: flex;
            flex-direction: column;
            margin-bottom: 8px;
            
            label {
                color: #A1A1AA;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                text-align: left;
            }
            
            input {
                padding: 8px 12px;
                margin-top: 5px;
                color: var(--neutral-900, #18181B);
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                line-height: 20px;
                border-radius: 4px;
                border: 1px solid var(--neutral-200, #E4E4E7);
                
                &:disabled {
                    border: none;
                    padding: 8px 0px;
                }
                
                &:focus {
                    outline: none;
                }
            }
        }
        
        .btn-save {
            display: flex;
            
            button {
                color: var(--neutral-900, #18181B);
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                padding: 12px 24px;
                border-radius: 8px;
                border: 1px solid var(--neutral-200, #E4E4E7);
                
                &:hover,
                &:focus {
                    background: #254EE0;
                    color: #ffffff;
                }
                
                &:first-child {
                    margin-right: 10px;
                }
            }
        }
    }
    
    @media (max-width: 768px) {
        width: 100%;
        padding: 16px;
        
        form {
            grid-template-columns: calc(50% - 6px) calc(50% - 6px);
            grid-gap: 12px;
        }
    }
}
</style>