<script setup>
import { defineProps, defineEmits } from "vue";
import { handleImage } from "@/utils";

const $emits = defineEmits(["handleChangeCasino"]);

defineProps({
  casino: Object,
  index: Number,
  disable: { type: Boolean, defaults: true },
});
</script>

<template>
  <div
    class="casino-item d-flex align-items-center justify-content-center flex-column"
  >
    <img
      loading="lazy"
      alt=""
      class="logo-company"
      :src="
        handleImage(casino.key)
          ? handleImage(casino.key)
          : require(`@/assets/logo/companies-game/${casino.key
              .toString()
              .toLowerCase()}Active.png`)
      "
    />
    <img
      loading="lazy"
      alt=""
      class="logo-company active"
      :src="
        handleImage(casino.key)
          ? handleImage(casino.key)
          : require(`@/assets/logo/companies-game/${casino.key
              .toString()
              .toLowerCase()}Active.png`)
      "
    />

    <img
      loading="lazy"
      class="game-img"
      alt="game.name"
      :src="require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)"
    />
    <div class="casino-name">
      <div class="card-content d-flex flex-column align-center justify-center">
        <button
          :class="disable ? '' : 'disable-item'"
          class="button mt-0 mt-md-3 btn-contained"
          @click="$emits('handleChangeCasino', casino.key, casino)"
        >
          <span> {{ $t("betNow") }} </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.13 2H11.87C6.43 2 2 6.43 2 11.87V12.13C2 17.57 6.43 22 11.87 22H12.13C17.57 22 22 17.57 22 12.13V11.87C22 6.43 17.57 2 12.13 2ZM15.62 12.53L13.16 15C13.01 15.14 12.82 15.22 12.63 15.22C12.44 15.22 12.24 15.14 12.1 15C11.8 14.7 11.8 14.23 12.1 13.94L13.28 12.75H8.91C8.49 12.75 8.16 12.41 8.16 12C8.16 11.59 8.49 11.25 8.91 11.25H13.28L12.1 10.06C11.8 9.77 11.8 9.3 12.1 9C12.39 8.71 12.86 8.71 13.16 9L15.62 11.47C15.92 11.76 15.92 12.24 15.62 12.53Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo-company {
  width: 60%;
  object-fit: contain;
  height: 60px;
  margin-top: 10px;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);

  @media (max-width: 541px) {
    margin-top: 0;
  }
}

.game-img {
  width: 296px;
  height: 250px;
  border-radius: 6px;
  z-index: 2;

  @media (max-width: 541px) {
    height: 200px;
  }

  @media (max-width: 375px) {
    height: 150px;
  }
}

.logo-company.active {
  display: none;
}

.casino-item:hover .logo-company.active {
  display: block;
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}

.casino-item:hover .logo-company {
  display: none;
}

.casino-item {
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid #52525b;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background-color: white;
}

.casino-company {
  top: 5px;
  right: 10px;
  height: 48px;
}

.casino-company.active {
  display: none;
}

.casino-item:hover .casino-company.active {
  display: block;
}

.casino-item:hover .casino-company.no-active {
  display: none;
}

.casino-item:hover {
  background-image: url("@/assets/PlayG3/gifs/hover.gif");
  transform: scale(0.97);
  transition: all linear 0.3s;
  box-shadow: rgba(17, 12, 46, 0.15) 0 48px 100px 0;
}
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}

@keyframes movie {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0.9);
  }
}

.casino-name {
  padding: 1rem 5px;
  //border-top: 1px solid #52525b;

  @media (max-width: 541px) {
    padding: 0.5rem 2px;
  }
}

.card-content {
  color: #fff;
  font-size: 24px;
  font-weight: 700;

  .button {
    font-size: 1rem;

    @media (max-width: 541px) {
      & {
        padding: 0.5rem;
      }
    }

    @media (max-width: 375px) {
      font-size: 0.7rem;
    }

    span {
      margin-right: 0.625rem;
      font-weight: 700;
    }
  }

  .title-game {
    color: var(--bgPlayG3);
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 98%;
    white-space: nowrap;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }

  .title-company {
    display: block;
    color: var(--text-secondPlayG3);
    font-weight: normal;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
}

.casino-img {
  height: 308px;
  max-width: 100%;
}

@media (max-width: 768px) {
  .casino-item {
    .card-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0.5rem;

      > div {
        width: 50%;
        text-align: left;
      }

      .title-company {
        margin-bottom: 0;
        text-align: left;
      }
    }
  }
}
</style>
