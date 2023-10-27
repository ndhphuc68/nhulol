<template>
  <div class="description">
    <h2 class="description-title">{{ $t("ifyouhave") }}</h2>
    <p class="description-sub">
      {{ $t("ifyouhave2") }}
    </p>
  </div>
  <div class="row contact">
    <div
      v-for="(contact, index) in contacts"
      :key="index"
      class="col col-12 column-gap-lg-2 col-lg-6"
      @click="contact?.onClick"
    >
      <div class="contact-item">
        <div class="contact-item-top">
          <img
            :src="require(`@/assets/Duri/icon/home/${contact.icon}`)"
            alt="icon"
            class="icon"
          />
        </div>
        <div class="contact-item-content">
          <h4 class="title">
            {{ $t(contact.title) }}
          </h4>
          <!--          <p class="sub">-->
          <!--            {{ contact.sub }}-->
          <!--          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";

const store = useStore();
const contacts = [
  {
    icon: "partnership.png",
    title: "partnership",
    sub: "Et etiam nibh orci fringilla integer metus eget aliquam in. Eu id hac egestas velit in lorem augue",
    onClick: () => {
      store.commit("handleToggle", "partnership");
    },
  },
  {
    icon: "faqs.png",
    title: "FAQs",
    sub: "Cras molestie bibendum ut morbi. Vitae lacinia ac consectetur duis pulvinar .",
    onClick: () => {
      store.commit("handleToggle", "faq");
    },
  },
  {
    icon: "notice.png",
    title: "notice",
    sub: "Pellentesque lacus vel aliquam lacus. Pharetra dolor lectus et rhoncus massa ut egestas sed.",
    onClick: () => {
      store.commit("handleToggle", "notice");
    },
  },
  {
    icon: "event.png",
    title: "events",
    sub: "Malesuada consectetur etiam lacus turpis ac diam. Viverra mauris lacus fermentum ",
    onClick: () => {
      store.commit("handleToggle", "event");
    },
  },
];
</script>
<style lang="scss" scoped>
.description {
  text-align: center;
  margin: 40px 0;

  .description-sub {
    color: var(--text-second);
  }
}

.contact {
  margin: 20px -20px;
}

.contact-item {
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e4e4e7;
  margin: 10px;
  background: #fff;

  .icon {
    width: 64px;
    height: 64px;
  }

  &:hover {
    cursor: pointer;
    background: #0b1743;

    .contact-item-content {
      .title,
      .sub {
        color: #fff;
      }
    }
  }

  .contact-item-content {
    margin-top: 24px;

    .title {
      color: var(--text);
      text-transform: capitalize;
    }

    .sub {
      color: var(--text-second);
      text-transform: capitalize;
    }
  }
}
</style>
<style>
@media (min-width: 992px) {
  .contact-item.col-lg-6 {
    width: 48%;
  }
}
</style>
