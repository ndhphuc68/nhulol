<template>
  <Modal
    :handle-close="handleToggle"
    :styles="{
      width: '1036px',
      height: '70vh',
      border: 'none',
      overflowY: 'auto',
    }"
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
                handleImage(company?.key)
                  ? handleImage(company?.key)
                  : require(`@/assets/logo/companies-game/${
                      company.key.split('_')[0]
                    }Active.png`)
              "
              alt="logo"
              class="logo-company"
              v-show="companySelect !== company.key"
            />
            <img
              :src="
                handleImage(company?.key)
                  ? handleImage(company?.key)
                  : require(`@/assets/logo/companies-game/${
                      company.key.split('_')[0]
                    }Active.png`)
              "
              alt="logo"
              class="logo-company-hover"
              v-show="companySelect !== company.key"
            />
            <img
              :src="
                handleImage(company?.key)
                  ? handleImage(company?.key)
                  : require(`@/assets/logo/companies-game/${
                      company.key.split('_')[0]
                    }Active.png`)
              "
              alt="logo"
              class="logo-company active"
              v-show="companySelect === company.key"
            />
          </button>
          <button
            v-else
            :class="companySelect === company.key && 'active-btn'"
            class="company"
            @click="handlePickCompany(company.id, company)"
          >
            <img
              :src="
                handleImage(company?.key)
                  ? handleImage(company?.key)
                  : require(`@/assets/logo/companies-game/${
                      company.key.split('_')[0]
                    }Active.png`)
              "
              alt="logo"
              class="logo-company"
              v-show="companySelect !== company.key"
            />
            <img
              :src="
                handleImage(company?.key)
                  ? handleImage(company?.key)
                  : require(`@/assets/logo/companies-game/${
                      company.key.split('_')[0]
                    }Active.png`)
              "
              alt="logo"
              class="logo-company-hover"
              v-show="companySelect !== company.key"
            />
            <img
              :src="
                handleImage(company?.key)
                  ? handleImage(company?.key)
                  : require(`@/assets/logo/companies-game/${
                      company.key.split('_')[0]
                    }Active.png`)
              "
              alt="logo"
              class="logo-company active"
              v-show="companySelect === company.key"
            />
          </button>
        </v-col>
        <v-col
          v-if="loadingCheck"
          class="v-col-lg-2 v-col-sm-3 d-flex align-center justify-content-center"
          cols="6"
        >
          <Loading />
        </v-col>
      </v-row>
    </div>
  </Modal>
</template>
<script setup>
import { defineProps, ref, defineEmits, computed } from "vue";
import Modal from "@/components/Duri777/Modal/Modal.vue";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading/index.vue";
import { handleImage } from "@/utils";

const store = useStore();
const loadingCheck = false;

const idxLiveActive = ref(-1);

const $emits = defineEmits(["handleFillterCasino", "handleSelectGame"]);

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
<style scoped>
.modal-content {
  padding: 40px;
  overflow-y: auto;
}

.company {
  margin: 10px 0;
  height: 60px;
  width: 120px;
  padding: 0 5px;
  //background-color: gray;

  .logo-company-hover {
    display: none;
    width: 100%;
    height: 100%;
  }

  .logo-company {
    width: 100%;
    height: 100%;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }

  &:hover {
    transform: scale(1.03);
    transition: transform linear 0.2s;
    box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
    border-radius: 8px;
    padding: 5px;

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

  .logo-company.active {
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
  }
}

.active-btn {
  border: 1px solid var(--primary);
}
</style>
