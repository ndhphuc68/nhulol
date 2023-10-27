<script setup>
import {ref} from 'vue';
import {companies} from './data';

const isViewMore = ref(false);
const idxLiveActive = ref(-1);

function handleToggleGetMoreCompany() {
  isViewMore.value = !isViewMore.value
}

function handlePickCompany(idx) {
  if (idx === idxLiveActive.value) {
    idxLiveActive.value = -1
  } else {
    idxLiveActive.value = idx
  }
}
</script>

<template>
  <v-row>
    <v-col v-for="(company) in companies.slice(0,6)" :key="company.id" :class="{'active': idxLiveActive === company.id}"
           class="v-col-lg-2 company" cols="3">
      <button @click="handlePickCompany(company.id)">
        <img :src="require(`@/assets/logos/filters-companies/${company.logo}`)" alt="logo" class="logo-company">
        <img :src="require(`@/assets/logos/filters-companies/${company.activeLogo}`)" alt="logo"
             class="logo-company active">
      </button>
    </v-col>
    <template v-for="(company) in companies.slice(6)" :key="company.id">
      <v-col v-if="isViewMore" :class="{'active': idxLiveActive === company.id}" class="v-col-lg-2 company" cols="3">
        <button @click="handlePickCompany(company.id)">
          <img :src="require(`@/assets/logos/filters-companies/${company.logo}`)" alt="logo" class="logo-company">
          <img :src="require(`@/assets/logos/filters-companies/${company.activeLogo}`)" alt="logo"
               class="logo-company active">
        </button>
      </v-col>
    </template>
  </v-row>
  <div class="choose-tab">
    <div class="filter-tab d-flex justify-center align-center w-100">
      <hr/>
      <button class="btn-more d-flex align-center justify-center" @click="handleToggleGetMoreCompany">
        <img :class="{'close': !isViewMore}" alt="view-more" class="view-more"
             src="@/assets/icon/commons/more-down.png">
        <p> {{ $t('choose-other') }} </p>
        <img :class="{'close': !isViewMore}" alt="view-more" class="view-more"
             src="@/assets/icon/commons/more-down.png">
      </button>
      <hr/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.choose-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  margin: 30px 0;
}

.choose-tab button {
  margin: 0 70px;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
}

.choose-tab img {
  width: 30px;
  margin: 0 5px;
}

.btn-more img.close {
  transform: rotate(180deg);
}

hr {
  width: 30%;
  height: 0;
  border: 1px solid #000000;
  margin: 0
}

@media (max-width: 1024px) {
  hr {
    width: 10%;
  }

}

</style>