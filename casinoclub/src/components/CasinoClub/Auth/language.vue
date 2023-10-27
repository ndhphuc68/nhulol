<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import images from "@/assets";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const auth = computed(() => store.state.auth.auth);

const { locale } = useI18n();
const languages = ref([
  {
    key: "ko",
    text: "한글",
    sub: "Korean",
    idx: 1,
    img: images.ko,
  },
  {
    key: "en",
    text: "English",
    sub: "English",
    idx: 2,
    img: images.en,
  },
  {
    key: "th",
    text: "แบบไทย",
    sub: "Thai",
    idx: 3,
    img: images.th,
  },
  // {
  //   key: "mon",
  //   text: "Монгол",
  //   sub: "Mon",
  //   idx: 3,
  // },
]);

const lang = ref({
  key: locale.value,
  img: languages.value.filter((lang) => lang.key === locale.value)[0].img,
  text: languages.value.filter((lang) => lang.key === locale.value)[0].text,
});

const handleClickLang = (option) => {
  locale.value = option.key;
  localStorage.setItem("lang", option.key);
  lang.value = {
    key: option.key,
    lang: option.text,
    img: languages.value.filter((lang) => lang.key === option.key)[0].img,
  };
};
</script>

<template>
  <div class="language" :class="!auth ? 'mr-5' : ''">
    <div class="custom-seclect-language">
      <div class="dropdown">
        <button
          aria-expanded="false"
          class="btn dropdown-toggle d-flex align-items-center"
          data-bs-toggle="dropdown"
          type="button"
        >
          <img :src="lang.img" />
          <span>{{ lang.key }}</span>
        </button>
        <ul class="dropdown-menu">
          <li
            v-for="(item, index) in languages"
            :key="index"
            @click="handleClickLang(item)"
            class="btn-hover"
          >
            <button class="dropdown-item d-flex align-items-center">
              <div class="mr-2"><img :src="item.img" alt="img" /></div>
              <div>
                {{ item.text }}
                <p class="m-0">
                  {{ item?.sub }}
                </p>
              </div>
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

    .dropdown-item {
      &:hover {
        background: var(--primaryCasinoClub);
        color: var(--white-grey);
      }
      span {
        font-size: 0.8rem;
      }
    }
  }

  .dropdown-toggle {
    border: 1px solid #fff;
    border-radius: 20px;
    background: #fff;
    padding: 5px 20px;

    &:focus {
      background: #fff;
    }

    span {
      text-transform: uppercase;
    }
  }

  img {
    width: 24px;
    margin-right: 5px;
  }

  @media (max-width: 992px) {
    .dropdown-toggle {
      padding: 5px 10px;
    }
  }

  @media (max-width: 768px) {
    margin-right: 0 !important;
  }
}
</style>
