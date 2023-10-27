<template>
    <div class="my-info">
        <div class="title">
            <h3>{{ $t('myPageInfo') }}</h3>
            <!-- <button v-if="!editActive" class="btn-edit" @click=" handleEditForm(editActive)">
                Edit
            </button> -->
        </div>
        <form>
            <div class="field">
                <label>{{ $t('id') }}</label>
                <input v-model="user.id" :disabled="editActive ? false : true" type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('nickName') }}</label>
                <input v-model="user.name" :disabled="editActive ? false : true" type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('phoneNumber') }}</label>
                <input v-model="user.phoneNumber" :disabled="editActive ? false : true" type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('registInfo') }}</label>
                <input :value="user.regist" disabled type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('connectionInfo') }}</label>
                <input :value="user.connection" disabled type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('dateOfRegist') }}</label>
                <input :value="formatDate(user.dateRegist)" disabled type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('registIp') }}</label>
                <input :value="user.registIp" disabled type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('lastAccessDate') }}</label>
                <input :value="formatDate(user.dateAccessLast)" disabled type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('lastAccessIp') }}</label>
                <input :value="user.lastAccessIp" disabled type="text"/>
            </div>
            <div class="field">
                <label>{{ $t('country') }}</label>
                <input :value="user.country" disabled type="text"/>
            </div>
            <div class="btn-save">
                <button v-if="editActive" type="submit" @click="handleSaveForm">
                    {{ $t('save') }}
                </button>
                <button v-if="editActive" @click=" handleEditForm(editActive)">
                    {{ $t('cancel') }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
import {formatDate} from "@/utils";

const user = reactive({
    id: '1857',
    name: "testuser",
    phoneNumber: '1234556787',
    regist: 'test',
    connection: 'test',
    dateRegist: '2023-01-04T00:00:00-06:00',
    registIp: '142.168.1.1',
    dateAccessLast: '2023-03-24T00:00:00-06:00',
    lastAccessIp: '192.168.1.1',
    country: 'england'
})

const editActive = ref(false)

const handleEditForm = (active) => {
    editActive.value = !active
}

const handleSaveForm = e => {
    e.preventDefault()
    
    console.log(user)
}

</script>

<style lang="scss" scoped>
.my-info {
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--neutral-200, #E4E4E7);
    background: #FFF;
    
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
        grid-template-columns: calc(50% - 12px) calc(50% - 12px);
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
        padding: 16px;
        
        form {
            grid-gap: 12px;
        }
    }
}
</style>