<template>
  <!-- <article class="col-6 mt-3 col-md-6 col-xl-4 d-flex justify-center"> -->
  <article class="item-slot">
    <img :src="image" class="banner" alt="slot" />
    <div class="bottom d-flex justify-content-center px-3 px-lg-0 w-100">
      <div class="mr-5">
        <img
          :src="
            require(`@/assets/logo/companies-game/${slotItem.vendorCode
              .toString()
              .toLowerCase()}Active.png`)
          "
          alt="logo"
          class="logo-company"
        />
      </div>
      <div class="ml-5">
        <button
          :class="props.disable ? '' : 'disable-item'"
          @click="handleButton(slotItem.vendorCode)"
        ></button>
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
const props = defineProps({
  slotItem: Object,
  image: String,
  disable: Boolean,
});

const handleButton = (key) => {
  if (!props.disable) {
    return;
  }
  store.commit("handleUpdateGameKeyV3", key);
  router.push("/slot");
};
</script>

<style scoped lang="scss">
article {
  position: relative;
  background: transparent;
  transition: all 0.3s ease;
  //width: fit-content;
  padding: 0;
  height: fit-content;

  .bottom {
    position: absolute;
    width: 100%;
    bottom: 5px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .disable-item {
      cursor: not-allowed !important;
      filter: grayscale(100%);
    }
  }

  .logo-company {
    height: 40px;
    width: 76px;
    object-fit: contain;
  }

  button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: url("@/assets/FSCasino/slots/button-play.png") no-repeat;
    background-size: 130% 130%;
    background-position: center;
  }

  &:hover {
    cursor: pointer;
    /* scale: 1.04; */
    scale: 1.02;

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
