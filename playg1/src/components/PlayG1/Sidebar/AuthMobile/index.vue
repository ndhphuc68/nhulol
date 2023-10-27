<template>
  <div class="wrapper-auth-mobile">
    <div class="row">
      <div v-if="auth" class="col col-6">
        <div>
          <h4 class="user-name">Test user</h4>
          <span class="welcome">{{ $t("welcome") }}</span>
        </div>
        <button class="btn-logout">
          <span>{{ $t("logout") }}</span>
          <img
            src="../../../../assets/PlayG1/icon/commons/logout.png"
            alt="logout icon"
          />
        </button>
      </div>
      <div class="dropdown col-6" v-if="isLang">
        <button
          aria-expanded="false"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
        >
          <img :src="lang.image" alt="lang" /> {{ lang.key }}
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="(item, index) in languages"
            :key="index"
            @click="handleClickLang(item)"
          >
            <a class="dropdown-item" href="#">
              <img :src="item.image" alt="img" />
              {{ item.key }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { languages } from "@/components/PlayG1/Header/data";
import { defineProps, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

const handleClickLang = (option) => {
  i18n.locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    image: option.image,
  };
};
defineProps({
  isLang: {
    type: Boolean,
    default: true,
  },
});
const i18n = useI18n();
const store = useStore();

const auth = computed(() => store.state.auth.auth);
const lang = ref({
  key: i18n.locale.value,
  image: languages.find((item) => item.key === i18n.locale.value).image,
});
</script>
<style scoped>
.wrapper-auth-mobile {
  margin: 0 24px;

  .btn-logout {
    margin-top: 24px;
  }
}

img {
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 50%;
}

.dropdown-toggle {
  text-transform: uppercase;
  border: 1px solid #e4e4e7;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

a.dropdown-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.user-name {
  font-size: 1rem;
  max-width: 95.95px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style>
.wrapper-auth-mobile .dropdown-menu {
  min-width: unset;
}
</style>