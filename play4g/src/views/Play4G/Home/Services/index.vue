<script setup>
import { useStore } from "vuex";

const store = useStore();
const contacts = [
  {
    icon: "event.png",
    title: "events",
    sub: "subEvents",
    onClick: () => {
      store.commit("handleToggle", "noticeEventFAQ");
      store.commit("handleActiveTab", 1);
    },
  },
  {
    icon: "faqs.png",
    title: "faqs",
    sub: "subFaqs",
    onClick: () => {
      store.commit("handleToggle", "noticeEventFAQ");
      store.commit("handleActiveTab", 2);
    },
  },
  {
    icon: "partnership.png",
    title: "partnership",
    sub: "subPartnership",
    onClick: () => {
      store.commit("handleToggle", "partnership");
    },
  },
  {
    icon: "notice.png",
    title: "notice",
    sub: "subNotice",
    onClick: () => {
      store.commit("handleToggle", "noticeEventFAQ");
      store.commit("handleActiveTab", 0);
    },
  },
];
</script>

<template>
  <section class="service my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="description">
            <h3>{{ $t("titleService") }}</h3>
            <div class="title-desc">
              <h2>{{ $t("subTitleService") }}</h2>
              <p>{{ $t("desService") }}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div
                v-for="(contact, index) in contacts"
                :key="index"
                class="col col-12 column-gap-lg-2 col-lg-6 contact"
                @click="contact?.onClick"
            >
              <div class="contact-item btn-hover">
                <div class="contact-item-top">
                  <img
                      :src="require(`@/assets/Play4G/icon/Home/${contact.icon}`)"
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
                    {{ $t(contact.sub) }}
                  </p>
                </div>
              </div>
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

    }

    h3 {
      color: var(--primaryPlay4G);
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
    .contact-item {
      border-radius: 12px;
      padding: 24px;
      margin: 10px;
      cursor: pointer;
      background-color: #2F3136;

      .icon {
        width: 40px;
        height: 40px;
      }

      .contact-item-content {
        margin-top: 24px;

        .title {
          color: #fff;
          text-transform: capitalize;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sub {
          color: #CBCBDB;
          text-transform: capitalize;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 20px;
          -webkit-line-clamp: 3;
          height: 60px;
          margin-bottom: 0;
        }
      }
    }

    @media (max-width: 991px) {
      &:not(:last-child) {
        border: 0;
        border-bottom: 1px solid var(--borderPlay4G);
      }
    }
  }
}
</style>
