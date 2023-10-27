<script setup>
import { dataIntroduce } from "@/views/PlayG3/Home/Introduce/data";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import { playGameTOS } from "@/api/games/request";

const router = useRouter();
const store = useStore();
const auth = computed(() => store.state.auth.auth);

const handleClickLogin = async () => {
  if (auth.value) {
    await playGameTOS().then((res) => {
      console.log(res);
    });
  } else {
    await router.push({ name: "Login" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<template>
  <section class="introduce my-1">
    <div class="container">
      <div class="row align-center">
        <!--        <div-->
        <!--          class="col-12 col-md-6 col-lg-3 my-lg-0 my-3"-->
        <!--          v-for="(item, index) in dataIntroduce"-->
        <!--          :key="index"-->
        <!--        >-->
        <!--          <div class="items text-center">-->
        <!--            <div class="img-fluid">-->
        <!--              <img :src="item?.img" alt="" />-->
        <!--            </div>-->
        <!--            <h3 class="title">{{ $t(item.title) }}</h3>-->
        <!--            <p>{{ $t(item.text) }}</p>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="col-lg-6">
          <div class="title mb-0 mb-md-5">
            <p>{{ $t("event_bollon") }}</p>
            <h1>{{ $t("title_bollon") }}</h1>
          </div>
          <div class="desc">{{ $t("desc_bollon") }}</div>
        </div>
        <div class="col-lg-6 d-flex justify-content-center">
          <button
            class="d-block text-md-right text-center btn-hover"
            @click="handleClickLogin"
          >
            <img src="@/assets/PlayG3/images/img-bollon.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.introduce {
  background-image: url("@/assets/PlayG3/images/bgr-bollon.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;

  &:before {
    content: "";
    background: linear-gradient(
      90deg,
      #f6d83e 0%,
      #8dd554 21.35%,
      #dd8a8a 48.96%,
      #4050dc 69.79%,
      #41bd5c 85.94%,
      #cc58e9 100%
    );
    width: 100%;
    height: 5px;
    display: block;
    margin-bottom: 3rem;
  }

  &:after {
    content: "";
    background: linear-gradient(
      90deg,
      #f6d83e 0%,
      #8dd554 21.35%,
      #dd8a8a 48.96%,
      #4050dc 69.79%,
      #41bd5c 85.94%,
      #cc58e9 100%
    );
    width: 100%;
    height: 5px;
    display: block;
    margin-top: 5rem;
  }

  .title {
    p {
      color: var(--primaryPlayG3);
    }
  }

  .desc {
    color: var(--textdesc);
  }
}
</style>
