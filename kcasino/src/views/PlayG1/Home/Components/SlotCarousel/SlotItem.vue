<template>
  <article class="col-12 me-0 me-md-3 col-md-6 col-xl-4 d-flex justify-center">
    <img :src="image" class="banner" alt="slot" />
    <div class="bottom row px-lg-0 w-100">
      <div class="col-8">
        <img
          :src="
            handleImage(slotItem?.key)
              ? handleImage(slotItem?.key)
              : require(`@/assets/logo/companies-game/${
                  slotItem?.key.split('_')[0]
                }Active.png`)
          "
          alt="logo"
          class="logo-company"
        />
      </div>
      <div class="col-4 d-flex justify-content-end">
        <button @click="handleButton(slotItem)"></button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { handleImage } from "@/utils";

const store = useStore();
const router = useRouter();
defineProps({
  slotItem: Object,
  image: String,
});

const handleButton = (key) => {
  store.commit("handleUpdateGameKey", key);
  router.push("/slot");
};
</script>

<style scoped lang="scss">
article {
  position: relative;
  background: transparent;
  transition: all 0.3s ease;

  .bottom {
    position: absolute;
    width: 100%;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo-company {
    width: 100%;
    height: 48px;
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: url("@/assets/FSCasino/slots/button-play.png") no-repeat;
    background-size: 130% 130%;
    background-position: center;
  }

  &:hover {
    cursor: pointer;
    scale: 1.04;

    .banner {
      box-shadow: 0px 4px 30px 8px rgba(0, 0, 0, 0.2);
    }

    button {
      background: url("@/assets/FSCasino/slots/button-play-hover.png") no-repeat;
      background-size: 130% 130%;
      background-position: center;
    }
  }
}
</style>
