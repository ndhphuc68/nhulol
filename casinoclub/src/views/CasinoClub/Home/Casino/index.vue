<template>
  <section id="casino-home">
    <div class="container p-0">
      <div class="title-home mb-2">{{ $t("casino") }} <ArrowRight /></div>
      <div class="list-casino">
        <div class="item" v-for="(item, index) in data" :key="index">
          <CasinoItem :liveItem="item" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import CasinoItem from "./CasinoItem.vue";
import ArrowRight from "@/assets/CasinoClub/icon/svg/ArrowRight.vue";

const data = [
  {
    key: "evolution",
  },
  {
    key: "wmcasino",
  },
  {
    key: "cq9",
  },
  {
    key: "bg",
  },
  {
    key: "ag",
  },
  {
    key: "pragmatic",
  },
];
</script>

<style lang="scss" scoped>
#casino-home {
  margin: 20px auto 50px;
}
.list-casino {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;

  .item {
    background: linear-gradient(
      180deg,
      rgba(231, 141, 155, 0.7) 0%,
      rgba(220, 94, 111, 0.7) 100%
    );
    border-radius: 16px;
    height: 150px;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &:nth-child(2n + 2) {
      background: url("@/assets/CasinoClub/bg-companies/bg-1.png");
      background-size: cover;
    }

    &:nth-child(2n + 4) {
      background: url("@/assets/CasinoClub/bg-companies/bg-2.png");
      background-size: cover;
    }

    &:nth-child(2n + 6) {
      background: url("@/assets/CasinoClub/bg-companies/bg-3.png");
      background-size: cover;
    }

    &:hover {
      box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.3);
      scale: 1.02;
    }
  }
}

@media (max-width: 992px) {
  .list-casino {
    grid-gap: 20px;
  }
}

@media (max-width: 768px) {
  #casino-home {
    padding: 0 12px;
  }

  .title-home {
    font-size: 20px;
    font-weight: 700;
  }
  .list-casino {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
  }
}

@media (max-width: 320px) {
  .list-casino {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 12px;
  }
}
</style>
