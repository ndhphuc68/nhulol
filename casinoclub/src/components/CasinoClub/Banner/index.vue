<template>
  <section id="banner">
    <img
      :src="require(`@/assets/CasinoClub/banner/${image}.png`)"
      class="w-100"
      style="max-height: 320px; min-height: 120px"
    />
    <div class="title-banner">
      <h3>{{ $t(title) }}</h3>
      <p>{{ description }}</p>
      <div v-if="search" class="search">
        <input type="text" :placeholder="$t('search')" />
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.2662 12.0275C16.3053 10.6878 16.7951 9.00258 16.6358 7.3146C16.4765 5.62662 15.6801 4.06273 14.4086 2.94109C13.1372 1.81945 11.4862 1.22431 9.79153 1.27675C8.09687 1.32919 6.48583 2.02527 5.28617 3.22338C4.08547 4.42232 3.38711 6.03398 3.33342 7.72993C3.27973 9.42589 3.87474 11.0785 4.9972 12.351C6.11966 13.6235 7.68509 14.4201 9.37448 14.5785C11.0639 14.7368 12.7501 14.2451 14.0895 13.2034L14.1253 13.2409L17.6603 16.7767C17.7378 16.8541 17.8297 16.9156 17.9308 16.9575C18.032 16.9994 18.1404 17.0209 18.2499 17.0209C18.3594 17.0209 18.4678 16.9994 18.569 16.9575C18.6702 16.9156 18.7621 16.8541 18.8395 16.7767C18.9169 16.6993 18.9783 16.6074 19.0202 16.5062C19.0622 16.405 19.0837 16.2966 19.0837 16.1871C19.0837 16.0776 19.0622 15.9692 19.0202 15.868C18.9783 15.7669 18.9169 15.675 18.8395 15.5975L15.3037 12.0625C15.2915 12.0505 15.279 12.0389 15.2662 12.0275ZM13.5362 4.40255C14.0067 4.86545 14.3809 5.41692 14.6372 6.02516C14.8935 6.6334 15.0268 7.28637 15.0295 7.9464C15.0322 8.60643 14.9042 9.26046 14.6528 9.87076C14.4015 10.4811 14.0318 11.0356 13.5651 11.5023C13.0984 11.969 12.5439 12.3387 11.9336 12.59C11.3232 12.8414 10.6692 12.9694 10.0092 12.9667C9.34916 12.964 8.69619 12.8307 8.08795 12.5744C7.47971 12.3181 6.92824 11.9439 6.46534 11.4734C5.54027 10.5331 5.02422 9.26541 5.02959 7.9464C5.03496 6.62738 5.56132 5.36392 6.49401 4.43122C7.42671 3.49853 8.69017 2.97217 10.0092 2.9668C11.3282 2.96143 12.5959 3.47748 13.5362 4.40255Z"
              fill="#7A7A7A"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

console.log(router.currentRoute.value.path);

defineProps({
  description: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "123",
  },

  search: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
#banner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.img {
  position: absolute;
  z-index: 0;
  height: 100%;
}
.title-banner {
  position: absolute;
  z-index: 1;
  /* top: calc(50% - 42px); */
  width: 100%;
  text-align: center;

  h3 {
    margin-bottom: 0;
    font-size: 40px;
    font-weight: 700;
    color: var(--white-color);
    text-transform: uppercase;
  }

  p {
    margin-bottom: 0;
    margin-top: 5px;
    color: #616161;
    font-family: Poppins;
    font-size: 20px;
  }

  .search {
    width: 400px;
    margin: 10px auto 0;
    position: relative;

    input {
      border-radius: 20px;
      background: #f2f2f2;
      width: 100%;
      padding: 8px 6px 8px 40px;
    }

    button {
      position: absolute;
      left: 10px;
      top: calc(50% - 12px);
    }
  }
}

@media (max-width: 768px) {
  h3 {
    font-size: 20px !important;
  }

  p {
    font-size: 14px !important;
  }

  .search {
    width: 60% !important;
  }
}
</style>
