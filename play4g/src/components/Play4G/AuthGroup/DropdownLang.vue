<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { languages } from "@/components/Play4G/Header/data";

const { locale } = useI18n();
const i18n = useI18n();

const lang = ref({
  key: locale.value,
  text: languages.find((item) => item.key === i18n.locale.value).text,
  image: languages.find((item) => item.key === i18n.locale.value).image,
});

watch(locale, () => {
  lang.value = {
    key: locale.value,
    text: languages.find((item) => item.key === i18n.locale.value).text,
    image: languages.find((item) => item.key === i18n.locale.value).image,
  };
});
const handleClickLang = (option) => {
  locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    lang: option.text,
    image: option.image,
  };
};
</script>

<template>
  <div class="language">
    <div class="custom-select-language">
      <div class="dropdown">
        <button
          aria-expanded="false"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
        >
          <img :src="lang.image" alt="lang"/>
          <span>{{ lang.key }}</span>
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="(item, index) in languages"
            :key="index"
            @click="handleClickLang(item)"
            class="btn-hover"
          >
            <button class="dropdown-item">
              <img :src="item.image" alt="img"/>
              {{ item.text }}
              <span>
                {{ item?.sub }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.language {
  display: flex;
  align-items: center;
  position: relative;

  &:focus-visible,
  .dropdown-language:focus-visible {
    outline: none;
  }

  .dropdown-menu {
    min-width: 7rem;
    //transform: unset !important;
    //top: 40px !important;
    left: -30px !important;

    .dropdown-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: uppercase;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      span {
        font-size: 0.8rem;
      }
    }
  }

  .dropdown-toggle {
    border: none;
    color: #fafafa;
    padding-left: 0.1rem;

    span {
      text-transform: uppercase;
    }
  }

  img {
    width: 24px;
    margin-right: 5px;
  }
}
</style>
