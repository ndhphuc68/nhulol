<script setup>
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const languages = ref([
  {
    key: "ko",
    text: "한글",
    sub: "Korean",
    idx: 1,
  },
  {
    key: "en",
    text: "English",
    sub: "English",
    idx: 2,
  },
  {
    key: "th",
    text: "แบบไทย",
    sub: "Thai",
    idx: 3,
  },
  // {
  //     key: "mon",
  //     text: "Монгол",
  //     sub: "Mon",
  //     idx: 3,
  // },
]);

const lang = ref({
  key: locale.value,
});

watch(locale, () => {
  lang.value = {
    key: locale.value,
  };
});
const handleClickLang = (option) => {
  locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    lang: option.text,
  };
};
</script>

<template>
  <div class="language">
    <img src="@/assets/PlayG3/icon/header/globe.png" alt="lang" />
    <div class="custom-seclect-language">
      <div class="dropdown">
        <button
          aria-expanded="false"
          class="btn dropdown-toggle"
          data-bs-toggle="dropdown"
          type="button"
        >
          <!--                                <img :src="lang.image" alt="lang"/> {{ lang.key }}-->
          <span>{{ lang.key }}</span>
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="(item, index) in languages"
            :key="index"
            @click="handleClickLang(item)"
            class="btn-hover"
          >
            <button class="dropdown-item d-flex flex-column">
              <!--                                        <img :src="item.image" alt="img"/>-->
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
