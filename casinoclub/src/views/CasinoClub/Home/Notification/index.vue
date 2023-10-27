<template>
  <section id="notification">
    <div class="container d-flex align-items-center py-2">
      <Notification />
      <marquee class="ms-4" scrollamount="20">
        Lorem ipsum dolor sit amet, con sec tetur adipiscing elit. In vitae
        ultrices nibh.Lorem ipsum dolor sit amet, con sec tetur adipiscing elit.
        Lorem ipsum dolor sit amet, con sec tetur adipiscing elit. In vitae
        ultrices nibh.Lorem ipsum dolor sit amet, con sec tetur adipiscing elit.
      </marquee>
    </div>
  </section>
</template>
<script setup>
import Notification from "@/assets/CasinoClub/icon/svg/Notification.vue";
</script>

<style lang="scss" scoped>
#notification {
  margin: 20px 0;
}

.container {
  border-top: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
}

@media (max-width: 576px) {
  #notification {
    padding: 0 12px;
  }
}
</style>
