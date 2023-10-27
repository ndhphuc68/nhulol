<script setup>
import {defineProps, ref, defineEmits} from "vue";
import Modal from "@/components/PlayG3/Modal/Modal.vue";

const idxLiveActive = ref(-1);

const $emits = defineEmits(["handleFilterCasino", "handleSelectGame"]);

const props = defineProps({
    handleToggle: Function,
    companySelect: {
        type: String,
        default: "",
    },
    listCompany: {
        type: Array,
        default: () => [],
    },
    casino: {
        type: Boolean,
        default: true,
    },
});

function handlePickCompany(idx, key) {
    if (idx === idxLiveActive.value) {
        idxLiveActive.value = -1;
    } else {
        idxLiveActive.value = idx;
    }
    $emits("handleFilterCasino", key);
    $emits("handleSelectGame", key);
    props.handleToggle();
}
</script>

<template>
    <Modal
        :handle-close="handleToggle"
        :styles="{ width: '1036px', height: '810px', border: 'none' , backgroundColor : '#FAFAFA'}"
    >
        <div class="modal-content">
            <v-row>
                <v-col
                    v-if="casino"
                    class="v-col-lg-2 v-col-sm-3 d-flex align-center justify-content-center"
                    cols="6"
                >
                    <button
                        :class="companySelect === '' && 'active-btn'"
                        class="company"
                        @click="handlePickCompany()"
                    >
                        <span class="font-weight-bold">{{ $t("all") }}</span>
                    </button>
                </v-col>
                <v-col
                    v-for="company in listCompany"
                    :key="company.id"
                    class="v-col-lg-2 v-col-sm-3 d-flex align-center justify-content-center"
                    cols="6"
                >
                    <button
                        v-if="casino"
                        :class="companySelect === company.key && 'active-btn'"
                        class="company"
                        @click="handlePickCompany(company.id, company.key)"
                    >
                        <img
                            :src="
                require(`@/assets/PlayG3/logo/companies-game/${
                  company.key.split('_')[0]
                }Active.png`)
              "
                            alt="logo"
                            class="logo-company"
                        />
                    </button>
                    <button
                        v-else
                        :class="companySelect === company.key && 'active-btn'"
                        class="company"
                        @click="handlePickCompany(company.id, company.key)"
                    >
                        <img
                            :src="
                require(`@/assets/PlayG3/logo/home2/${
                  company.key.split('_')[0] === 'aux'
                    ? company.key.split('_')[0] + 'x'
                    : company.key.split('_')[0]
                }_activated.png`)
              "
                            alt="logo"
                            class="logo-company "
                        
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
    width: 120px;
    padding: 0 5px;
    
    span {
        color: #0F172A;
    }
    
    .logo-company {
        width: 100%;
        height: 100%;
        -webkit-filter: grayscale(1);
        filter: grayscale(1);
    }
    
    &:hover, &.active-btn {
        transform: scale(1.03);
        transition: transform linear 0.2s;
        box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
        
        .logo-company {
            -webkit-filter: grayscale(0);
            filter: grayscale(0);
        }
    }
}

.active-btn {
    border: 1px solid var(--primaryPlayG3);
}
</style>
