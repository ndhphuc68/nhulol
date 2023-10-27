<template>
  <Modal
    :handle-close="handleToggle"
    :styles="{ width: '1036px', height: '800px', border: 'none' }"
  >
    <div class="modal-content">
      <v-row>
        <v-col
          v-for="company in companies"
          :key="company.id"
          :class="{ active: idxLiveActive === company.id }"
          class="v-col-lg-2 v-col-sm-3"
          cols="6"
        >
          <button class="company" @click="handlePickCompany(company.id)">
            <img
              :src="
                require(`@/assets/PlayG1/logos/filters-companies/${company.logo}`)
              "
              alt="logo"
              class="logo-company"
            />
            <img
              :src="
                require(`@/assets/PlayG1/logos/filters-companies/${company.activeLogo}`)
              "
              alt="logo"
              class="logo-company active"
            />
          </button>
        </v-col>
      </v-row>
    </div>
  </Modal>
</template>
<script setup>
import { defineProps, ref } from "vue";
import { companies } from "@/views/PlayG1/Components/FilterCompany/data";
import Modal from "@/components/PlayG1/modal/Modal.vue";

const idxLiveActive = ref(-1);
defineProps({
  handleToggle: Function,
});

function handlePickCompany(idx) {
  if (idx === idxLiveActive.value) {
    idxLiveActive.value = -1;
  } else {
    idxLiveActive.value = idx;
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

  .logo-company {
    height: 60px;
    width: 120px;
  }

  .logo-company.active {
    display: none;
  }

  &:hover {
    transform: scale(1.03);
    transition: transform linear 0.2s;

    .logo-company {
      display: none;
    }

    .logo-company.active {
      display: block;
    }
  }

  &.active {
    //border: 1px solid var(--primary);

    .logo-company {
      display: none;
    }

    .logo-company.active {
      display: block;
      border: 1px solid var(--primary);
    }
  }
}
</style>