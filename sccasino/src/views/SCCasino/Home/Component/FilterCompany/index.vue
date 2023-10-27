<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  listCompanyHeader: {
    type: Array,
    default: () => [],
  },
  listCompany: {
    type: Array,
    default: () => [],
  },
  companySelect: {
    type: String,
    default: "",
  },
  casino: {
    type: Boolean,
    default: true,
  },
});

const $emits = defineEmits(["handleFillter"]);
</script>

<template>
  <div class="col-12">
    <button
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
        class="w-100 btn-more d-flex align-center justify-center flex-row"
    >
      <span class="text-uppercase">{{ $t("choose-other") }}</span>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
      >
        <path
            d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z"
            fill="#2196F3"
        />
      </svg>
    </button>
  </div>
  <div class="collapse col-12" id="collapseExample">
    <div class="card card-body">
      <div class="row">
        <div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-2" v-if="casino">
          <div
              @click="$emits('handleFillter', '')"
              :class="companySelect === '' && 'logo-select'"
              class="d-flex justify-center align-center h-100 logo-company-div"
          >
            <span class="font-weight-bold">{{ $t("all") }}</span>
          </div>
        </div>
        <div
            :key="index"
            class="col-6 col-md-4 col-lg-3 col-xl-2 mb-5"
            v-for="(item, index) in listCompany"
        >
          <div
              v-if="casino"
              @click="$emits('handleFillter', item.key)"
              :key="index"
              :class="companySelect === item.key && 'logo-select'"
              class="d-flex justify-center align-center logo-company-div h-100"
          >
            <img
                :src="
                require(`@/assets/SCCasino/logos/companies-game/${
                  item.key.split('_')[0]
                }.png`)
              "
                alt="logo"
                class="logo-company"
                v-show="companySelect !== item.key"
            />
            <img
                :src="
                require(`@/assets/SCCasino/logos/companies-game/${
                  item.key.split('_')[0]
                }Active.png`)
              "
                alt="logo"
                class="logo-company-hover"
                v-show="companySelect !== item.key"
            />
            <img
                :src="
                require(`@/assets/SCCasino/logos/companies-game/${
                  item.key.split('_')[0]
                }Active.png`)
              "
                alt="logo"
                class="logo-company-active"
                v-show="companySelect === item.key"
            />
          </div>
          <div
              v-else
              @click="$emits('handleFillter', item.key)"
              :key="item.key"
              :class="companySelect === item.key && 'logo-select'"
              class="d-flex justify-center align-center logo-company-div h-100"
          >
            <img
                :src="
                require(`@/assets/SCCasino/logo/home/${
                  item.key.split('_')[0] === 'aux'
                    ? item.key.split('_')[0] + 'x'
                    : item.key.split('_')[0]
                }.png`)
              "
                alt="logo"
                class="logo-company logo-slot"
                v-show="companySelect !== item.key"
            />
            <img
                :src="
                require(`@/assets/SCCasino/logo/home/${
                  item.key.split('_')[0] === 'aux'
                    ? item.key.split('_')[0] + 'x'
                    : item.key.split('_')[0]
                }_activated.png`)
              "
                alt="logo"
                class="logo-company-hover logo-slot"
                v-show="companySelect !== item.key"
            />
            <img
                :src="
                require(`@/assets/SCCasino/logo/home/${
                  item.key.split('_')[0] === 'aux'
                    ? item.key.split('_')[0] + 'x'
                    : item.key.split('_')[0]
                }_activated.png`)
              "
                alt="logo"
                class="logo-company-active logo-slot"
                v-show="companySelect === item.key"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn-more {
  border-radius: 20px;
  border: 1px solid #42A5F5;
  background: #F1F8FE;
  padding: 12px 32px;

  span {
    color: #2196F3;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}

.card-body {
  border: none;
}
.logo-company-div {
  padding: 20px 5px;
  cursor: pointer;

  &:hover {
    .logo-company {
      display: none;
    }

    .logo-company-hover {
      display: block;
    }
  }

  .logo-company {
    height: 50px;
  }

  .logo-company-hover {
    display: none;
    height: 50px;
  }

  .logo-company-active {
    height: 50px;
  }

  .logo-slot {
    height: 66px;
  }
}

.logo-select {
  border: 1px solid var(--primaryFSCasino);
  border-radius: 10px;
}
</style>
