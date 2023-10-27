<script setup>
import { useRouter } from "vue-router";
import {computed} from "vue";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore()
const auth = computed(()=> store.state.auth.auth)

const handleClickRegister = () => {
  router.push({ name: "Signup" });
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <section class="banner-hero">
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-lg-6">
          <div class="title mb-0 mb-md-5">
            <p>{{ $t("event_banner") }}</p>
            <h1>{{ $t("title_banner") }}</h1>
          </div>
<!--          <div class="desc">{{ $t("desc_banner") }}</div>-->
          <button class="btn-signup" @click="handleClickRegister" v-if="!auth">
            {{ $t("signup") }}
          </button>
        </div>
        <div class="col-lg-6">
          <div class="images">
            <img
              src="@/assets/PlayG3/images/banner.png"
              alt=""
              class="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner-hero {
    .img-fluid {
        max-width: 100%;
        max-height: 360px;
    }
  
  .title {
    p {
      color: var(--primaryPlayG3);
    }
  }

  .desc {
    color: var(--textdesc);
  }

  .btn-signup {
    background-color: var(--primaryPlayG3);
    padding: 12px 24px;
    margin-top: 1rem;
  }
    .images {
        @media (min-width: 1000px) {
            text-align: right;
        }
    }
}
</style>
