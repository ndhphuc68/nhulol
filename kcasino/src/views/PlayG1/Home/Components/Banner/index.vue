<template>
  <div class="banner-container">
    <div class="row">
      <div class="col col-12 col-md-6 banner-item">
        <img
          alt="banner-slot"
          class="banner-img"
          src="../../../../../assets/PlayG1/banner/home/banner_slot.png"
        />
        <div class="banner-content">
          <div class="d-flex banner-content-top">
            <img
              alt="card"
              class="card-icon"
              src="../../../../../assets/PlayG1/icon/home/card.png"
            />
            <p class="sub-banner">
              {{ $t('slotBannerTitle') }}
            </p>
          </div>
          <Button @click="router.push('/slot')"
            :style="{ backgroundColor: '#9E61EC', color: 'var(--bg)' }"
            bg
            is-full-width
            variant="contained"
            >{{ $t("slot") }}
          </Button>
        </div>
      </div>
      <div class="col col-12 col-md-6 banner-item">
        <img
          alt="banner-slot"
          class="banner-img"
          src="../../../../../assets/PlayG1/banner/home/banner_casino.png"
        />
        <div class="banner-content">
          <div class="d-flex banner-content-top">
            <img
              alt="card"
              class="card-icon"
              src="../../../../../assets/PlayG1/icon/home/card.png"
            />
            <p class="sub-banner">
              {{ $t('liveBannerTitle') }}
            </p>
          </div>
          <Button @click="router.push('/casino')"
            :style="{ backgroundColor: '#41BD5C', color: 'var(--bg)' }"
            bg
            is-full-width
            variant="contained"
            >{{ $t("casino") }}
          </Button>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script setup>
import Button from "@/components/PlayG1/customs/Button/index.vue";
import {useRouter} from "vue-router";

const router = useRouter()
</script>
<style lang="scss" scoped>
.banner-container {
  margin: 40px 0;
}

.banner-img {
  width: 100%;
}

.banner-item {
  .banner-content {
    padding: 16px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    border-radius: 3px;
  }
}

.banner-content-top {
  .card-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }

  .sub-banner {
    color: var(--text-second);
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .banner-item {
    margin: 10px 0;
  }
}
</style>