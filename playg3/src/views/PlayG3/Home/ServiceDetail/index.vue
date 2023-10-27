<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { Titles, data } from "./data";
import TabItem from "@/views/PlayG3/Home/ServiceDetail/Component/TabItems.vue";

const CurrentTab = ref(0);
const store = useStore();
const ListItem = ref(data.filter((item) => item.type === "notice"));

const handleActiveTab = (idx, type) => {
  const newData = data.filter((item) => item.type === type);
  ListItem.value = newData;
  CurrentTab.value = idx;
};

const handleClickItem = (idx, type) => {
  store.commit("handleToggle", "noticeEventFAQ");
  switch (type) {
    case "notice":
      store.commit("handleActiveTab", 0);
      break;
    case "event":
      store.commit("handleActiveTab", 1);
      break;
    case "faq":
      store.commit("handleActiveTab", 2);
      break;
    default:
      store.commit("handleActiveTab", 0);
  }
};
</script>

<template>
  <section id="service-detail">
    <div class="container">
      <div class="description">
        <h3>{{ $t("titleFaq") }}</h3>
        <div class="title-desc">
          <h2>{{ $t("titleFaq") }}</h2>
          <p>{{ $t("desFaq") }}</p>
        </div>
      </div>
      <div class="content">
        <div class="content-left">
          <img src="@/assets/PlayG3/banner/banner-service.png" alt="banner" />
        </div>
        <div class="content-right">
          <div class="tab-title">
            <div
              class="item"
              :class="CurrentTab === index ? 'active' : ''"
              v-for="(item, index) in Titles"
              :key="index"
              v-on:click="handleActiveTab(item.idx, item.type)"
            >
              {{ $t(item.type) }}
            </div>
          </div>
          <div class="tab-content">
            <TabItem :list="ListItem" :handleClickItem="handleClickItem" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#service-detail {
  margin-top: 100px;
  padding-top: 20px;
  margin-bottom: 150px;

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
      h2 {
        font-size: 24px;
      }

      h3,
      p {
        font-size: 16px;
      }
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 24px;

    .content-left {
      display: flex;

      img {
        width: 100%;
        border-radius: 8px;
      }
    }

    .content-right {
      .tab-title {
        display: flex;

        .item {
          padding: 4px 16px;
          margin-right: 24px;
          border-radius: 81px;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            opacity: 0.7;
          }
        }

        .active {
          background: var(--primaryPlayG3);

          &:hover {
            opacity: 1;
          }
        }
      }

      .tab-content {
        margin-top: 12px;
      }
    }
  }

  @media (max-width: 768px) {
    .content,
    .title-desc {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 500px) {
    .content {
      .content-right {
        .tab-title {
          .item {
            display: flex;
            align-items: center;
            font-size: 16px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
