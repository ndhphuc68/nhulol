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
    title: "faqs",
    sub: "Cras molestie bibendum ut morbi. Vitae lacinia ac consectetur duis pulvinar .",
    onClick: () => {
      store.commit("handleToggle", "noticeEventFAQ");
      store.commit("handleActiveTab", 2);
    },
  },
  {
    icon: "notice.png",
    title: "notice",
    sub: "Pellentesque lacus vel aliquam lacus. Pharetra dolor lectus et rhoncus massa ut egestas sed.",
    onClick: () => {
      store.commit("handleToggle", "noticeEventFAQ");
      store.commit("handleActiveTab", 0);
    },
  },
  {
    icon: "event.png",
    title: "events",
    sub: "Malesuada consectetur etiam lacus turpis ac diam. Viverra mauris lacus fermentum ",
    onClick: () => {
      store.commit("handleToggle", "noticeEventFAQ");
      store.commit("handleActiveTab", 1);
    },
  },
];
</script>

<template>
  <section class="service my-5">
    <div class="container">
      <div class="description">
        <h3>{{ $t("titleService") }}</h3>
        <div class="title-desc">
          <h2>{{ $t("subTitleService") }}</h2>
          <p>{{ $t("desService") }}</p>
        </div>
      </div>
      <div class="row">
        <div
          v-for="(contact, index) in contacts"
          :key="index"
          class="col col-12 column-gap-lg-2 col-lg-6 contact"
          @click="contact?.onClick"
        >
          <div class="contact-item">
            <div class="contact-item-top">
              <img
                :src="require(`@/assets/PlayG3/icon/home/${contact.icon}`)"
                alt="icon"
                class="icon"
              />
            </div>
            <div class="contact-item-content">
              <h4 class="title">
                {{ $t(contact.title) }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M17 12.5L17 6.5M17 6.5L11 6.5M17 6.5L6 17.5"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </h4>
              <p class="sub">
                {{ contact.sub }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.service {
  .description {
    margin-bottom: 3rem;

    .title-desc {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 24px;
    }

    h3 {
      color: var(--primaryPlayG3);
      font-size: 20px;
    }

    p {
      color: var(--textdesc);
      font-size: 20px;
    }

    @media (max-width: 768px) {
      .title-desc {
        grid-template-columns: 1fr;
      }

      h2 {
        font-size: 24px;
      }

      h3,
      p {
        font-size: 16px;
      }
    }
  }

  .contact {
    border-bottom: 1px solid var(--borderPlayg3);
    border-right: 1px solid var(--borderPlayg3);

    &:nth-child(even) {
      border-right: 0;
    }

    &:nth-child(n + 3) {
      border-bottom: 0;
    }

    .contact-item {
      border-radius: 12px;
      padding: 24px;
      margin: 10px;
      cursor: pointer;

      .icon {
        width: 40px;
        height: 40px;
      }

      .contact-item-content {
        margin-top: 24px;

        .title {
          color: var(--text);
          text-transform: capitalize;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sub {
          color: var(--text-second);
          text-transform: capitalize;
        }
      }
    }

    @media (max-width: 991px) {
      &:not(:last-child) {
        border: 0;
        border-bottom: 1px solid var(--borderPlayg3);
      }
    }
  }
}
</style>
