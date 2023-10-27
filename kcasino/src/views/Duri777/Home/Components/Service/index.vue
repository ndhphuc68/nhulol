<template>
  <section id="partner">
    <div class="description">
      <h3>{{ $t("titleService") }}</h3>
      <h1>{{ $t("subTitleService") }}</h1>
      <!--            <p>{{ $t('desService') }}</p>-->
    </div>
    <div class="list mt-4">
      <div
        class="item"
        v-for="(item, index) in services"
        :key="index"
        @click="handleCloseModal(item.title)"
      >
        <div class="icon-item"><component :is="item.icon" /></div>
        <div class="content">
          <div class="title">{{ $t(item.title) }}</div>
          <!--                    <div class="des">{{ (item.sub) }}</div>-->
        </div>
        <div class="discover">{{ $t('DiscoverNow') }}<ArrowRight /></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  Event,
  Faq,
  PartnerShip,
  Notice,
  ArrowRight,
} from "@/assets/Duri777/icon/Home/Service";
import { handleCloseModal } from "@/utils";

const services = [
  {
    icon: PartnerShip,
    title: "partnership",
    sub: "Et etiam nibh orci fringilla integer metus eget aliquam in. Eu id hac egestas velit in lorem augue",
  },
  {
    icon: Faq,
    title: "faqs",
    sub: "Cras molestie bibendum ut morbi. Vitae lacinia ac consectetur duis pulvinar .",
    // onClick: () => {
    //   const faqsElement = document.getElementById("faqsElement");
    //   faqsElement.scrollIntoView({ behavior: "smooth" });
    // },
  },
  {
    icon: Notice,
    title: "notice",
    sub: "Pellentesque lacus vel aliquam lacus. Pharetra dolor lectus et rhoncus massa ut egestas sed.",
    // onClick: () => {
    //   const faqsElement = document.getElementById("faqsElement");
    //   faqsElement.scrollIntoView({ behavior: "smooth" });
    // },
  },
  {
    icon: Event,
    title: "event",
    sub: "Malesuada consectetur etiam lacus turpis ac diam. Viverra mauris lacus fermentum ",
    // onClick: () => {
    //   const faqsElement = document.getElementById("faqsElement");
    //   faqsElement.scrollIntoView({ behavior: "smooth" });
    // },
  },
];
</script>
<style lang="scss">
.item {
  &:hover {
    .discover {
      svg {
        path {
          fill: white;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.description {
  max-width: 600px;
  margin: 120px auto 0;
  h3 {
    color: #254ee0;
    text-align: center;
    font-size: 20px;
  }

  h1 {
    text-align: center;
    font-size: 40px;
    width: 80%;
    margin: 0 auto;
  }

  p {
    color: #52525b;
    text-align: center;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
    }

    h3,
    p {
      font-size: 16px;
    }
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  .item {
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e4e4e7;
    text-align: left;
    height: fit-content;
    background: #fff;
    .icon-item {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #e9edfc;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .content {
      margin: 24px 0;
      .title {
        font-size: 24px;
      }

      .des {
        color: #5c5c5c;
        font-size: 14px;

        display: -webkit-box;
        height: 60px;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
      }
    }

    .discover {
      margin-top: auto;
      cursor: pointer;
      width: fit-content;
      svg {
        path {
          fill: #000 !important;
        }
      }
    }

    &:hover {
      background: #0b1743;
      transition: all ease-in-out 0.5s;
      cursor: pointer;
      .icon-item {
        background: #1f2a52 !important;
      }

      .content {
        .title {
          color: #fff;
        }

        .des {
          color: #fff !important;
        }
      }

      .discover {
        color: #fff;
      }
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
