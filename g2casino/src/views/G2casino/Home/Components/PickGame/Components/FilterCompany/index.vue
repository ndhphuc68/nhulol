<script setup>
import {defineProps, ref, defineEmits} from "vue";
import Modal from "@/components/G2casino/Modal/Modal.vue";

const idxLiveActive = ref(-1);

const $emits = defineEmits(["handleFilterCasino", "handleSelectGame"])

const props = defineProps({
    handleToggle: Function,
    companySelect: {
        type: String,
        default: ''
    },
    listCompany: {
        type: Array,
        default: () => []
    },
    casino: {
        type: Boolean,
        default: true
    }
});

function handlePickCompany(idx, key) {
    if (idx === idxLiveActive.value) {
        idxLiveActive.value = -1;
    } else {
        idxLiveActive.value = idx;
    }
    $emits("handleFilterCasino", key)
    $emits("handleSelectGame", key)
    props.handleToggle()
}
</script>

<template>
    <Modal
        :handle-close="handleToggle"
        :styles="{ width: '1036px', height: '810px', border: 'none' }"
    >
        <div class="modal-content">
            <v-row>
                <v-col v-if="casino"
                       class="v-col-lg-2 v-col-sm-3 d-flex align-center justify-content-center"
                       cols="6"
                >
                    <button :class="companySelect === '' && 'active-btn'" class="company" @click="handlePickCompany()">
                        <span class="font-weight-bold">{{ $t('all') }}</span>
                    </button>
                </v-col>
                <v-col
                    v-for="company in listCompany"
                    :key="company.id"
                    class="v-col-lg-2 v-col-sm-3 d-flex align-center justify-content-center"
                    cols="6"
                >
                    <button v-if="casino" :class="companySelect === company.key && 'active-btn'" class="company"
                            @click="handlePickCompany(company.id,company.key)">
                        <img
                            :src="
                require(`@/assets/G2casino/logo/companies-casino/${company.key.split('_')[0]}.png`)
              "
                            alt="logo"
                            class="logo-company"
                            v-show="companySelect !== company.key"
                        />
                        <img
                            :src="
                require(`@/assets/G2casino/logo/companies-casino/${company.key.split('_')[0]}Active.png`)
              "
                            alt="logo"
                            class="logo-company-hover logo-company"
                            v-show="companySelect !== company.key"
                        />
                        <img
                            :src="
                require(`@/assets/G2casino/logo/companies-casino/${company.key.split('_')[0]}Active.png`)
              "
                            alt="logo"
                            class="logo-company active"
                            v-show="companySelect === company.key"
                        />
                    </button>
                    <button v-else :class="companySelect === company.key && 'active-btn'" class="company"
                            @click="handlePickCompany(company.id,company.key)">
                        <img
                            :src="require(`@/assets/G2casino/logo/companies-slot/${company.key.split('_')[0] === 'aux' ? company.key.split('_')[0]+'x' : company.key.split('_')[0]}.png`)"
                            alt="logo"
                            class="logo-company"
                            v-show="companySelect !== company.key"
                        />
                        <img
                            :src="require(`@/assets/G2casino/logo/companies-slot/${company.key.split('_')[0] === 'aux' ? company.key.split('_')[0]+'x' : company.key.split('_')[0]}_activated.png`)"
                            alt="logo"
                            class="logo-company-hover logo-company"
                            v-show="companySelect !== company.key"
                        />
                        <img
                            :src="require(`@/assets/G2casino/logo/companies-slot/${company.key.split('_')[0] === 'aux' ? company.key.split('_')[0]+'x' : company.key.split('_')[0]}_activated.png`)"
                            alt="logo"
                            class="logo-company active"
                            v-show="companySelect === company.key"
                        />
                    </button>
                </v-col>
            </v-row>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
.modal-content {
    padding: 40px;
    max-height: 74vh;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        display: none;
    }
}

.company {
    margin: 10px 0;
    height: 60px;
    padding: 0 5px;
    
    .logo-company-hover {
        display: none;
    }
    
    .logo-company {
        width: 100%;
        height: 100%;
    }
    
    &:hover {
    transform: scale(1.03); transition: transform linear 0.2s;
        
        .logo-company {
            display: none;
        }
        
        .logo-company-hover {
            display: block;
        }
        
        .logo-company.active {
            display: block;
        }
    }
}

.active-btn {
    border: 1px solid var(--primary);
}
</style>