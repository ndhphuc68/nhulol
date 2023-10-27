<template>
  <Modal
    :handle-close="handleToggle"
    :styles="{ width: '1036px', height: '810px', border: 'none' }"
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
            class="company"
            :class="
              handleCheckCompany(company)
                ? companySelect === company.key && 'active-btn'
                : 'disable-item'
            "
            @click="handlePickCompany(company.id, company.key, company)"
          >
            <img
              :src="handleImage(company.key)"
              alt="logo"
              class="logo-company"
              v-show="companySelect !== company.key"
            />
            <img
              :src="handleImage(company.key)"
              alt="logo"
              class="logo-company-hover"
              v-show="companySelect !== company.key"
            />
            <img
              :src="handleImage(company.key)"
              alt="logo"
              class="logo-company active"
              v-show="companySelect === company.key"
            />
          </button>
          <button
            v-else
            :class="
              handleCheckCompany(company)
                ? companySelect === company.key && 'active-btn'
                : 'disable-item'
            "
            class="company"
            @click="handlePickCompany(company.id, company.key, company)"
          >
            <img
              :src="handleImage(company.key)"
              alt="logo"
              class="logo-company"
              v-show="companySelect !== company.key"
            />
            <img
              :src="handleImage(company.key)"
              alt="logo"
              class="logo-company-hover"
              v-show="companySelect !== company.key"
            />
            <img
              :src="handleImage(company.key)"
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
<script setup>
import { defineProps, ref, defineEmits, computed, watch } from "vue";
import Modal from "@/components/PlayGame1/modal/Modal.vue";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading/index.vue";
import { handleImage } from "@/utils";

const store = useStore();
const loadingCheck = computed(() => store.state.games2.loadingCheck);

const idxLiveActive = ref(-1);

const $emits = defineEmits(["handleFillterCasino", "handleSelectGame"]);

const customPage = computed(() => store.state.customPage.styles);
const listCompanyGame = ref(JSON.parse(customPage.value.game_vendors));
watch(customPage, (newCustomPage) => {
  listCompanyGame.value = JSON.parse(newCustomPage?.game_vendors);
});
const handleCheckCompany = (item) => {
  if (item.key === 999999) {
    let checkEvo = listCompanyGame.value?.find(
      (e) => e.key.toString() === "Evolution"
    );
    return !!(checkEvo && checkEvo.onoff === 1);
  } else if (item.key === 999991) {
    let checkPra = listCompanyGame.value?.find(
      (e) => e.key.toString() === "Pragmatic Play"
    );
    return !!(checkPra && checkPra.onoff === 1);
  } else {
    const check = listCompanyGame.value?.find(
      (e) =>
        e.key
          .toString()
          .toLowerCase()
          .includes(item?.name.toString().toLowerCase()) ||
        e.key
          .toString()
          .toLowerCase()
          .includes(item?.key.toString().toLowerCase())
    );
    return !!(check && check.onoff === 1);
  }
};

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
  typeGame: {
    type: String,
    default: "",
  },
});

function handlePickCompany(idx, key, company) {
  if (idx === idxLiveActive.value) {
    idxLiveActive.value = -1;
  } else {
    idxLiveActive.value = idx;
  }
  // $emits("handleFillterCasino", key);
  // $emits("handleSelectGame", key);
  if (props.casino) {
    $emits("handleFillterCasino", key);
    props.handleToggle();
  } else {
    if (!handleCheckCompany(company)) {
      return;
    } else {
      $emits("handleSelectGame", key);
    }
    props.handleToggle();
  }
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
  border: 1px solid var(--primaryPlayG1);
}

.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
</style>
