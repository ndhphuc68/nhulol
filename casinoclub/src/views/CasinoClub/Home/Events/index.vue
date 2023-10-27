<template>
  <div class="container row my-3 p-0">
    <div class="event col-12 col-lg-4 pe-4">
      <div class="event_head">
        <h3 class="m-0">
          {{ $t("events") }}
          <svg
            width="29"
            height="37"
            viewBox="0 0 29 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0002 26.6667L18.3335 18.3333L10.0002 10"
              stroke="#3F3F46"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </h3>
      </div>
      <div class="event_body mt-5">
        <div class="event_item p-2 mt-4" v-for="(i, index) in 3" :key="index">
          <div class="content_title">
            <img
              class="me-2"
              src="@/assets/CasinoClub/event/start.png"
              alt=""
            />
            <h4 class="m-0">Roulette 101 Lucky Number {{ i }}</h4>
            <svg
              width="29"
              height="37"
              viewBox="0 0 29 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0002 26.6667L18.3335 18.3333L10.0002 10"
                stroke="#db576b"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p>
            Lorem Ipsum Donot Lorem Ipsum Donot a Lorem Ipsum Donot Lorem Ipsum
            Donot a
          </p>
        </div>
      </div>
    </div>
    <div class="event_bg col-12 col-lg-8 ps-4">
      <img src="@/assets/CasinoClub/event/pngwing_1.png" alt="..." />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.event {
  padding-left: 0;
  .event_head {
    height: 54px;
    h3 {
      height: 100%;
      line-height: 54px;
      color: var(--primaryCasinoClub);
      font-size: 32px;
      font-weight: 900;
      svg {
        margin-left: 8px;
        transform: translateY(-6%);
      }
    }
  }
  .event_body {
    .event_item {
      background-color: #d3d3d833;
      border-radius: 4px;
      transition: all 0.3s;
      &:hover {
        cursor: pointer;
        background-color: #fff;
        box-shadow: #64646f33 0px 7px 29px 0px;
        transform: translateX(1%);
      }
      .content_title {
        height: 36px;

        display: flex;
        img {
          width: 20px;
          height: 20px;
          transform: translateY(45%);
        }
        h4 {
          font-size: 20px;
          height: 100%;
          line-height: 36px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        svg {
          transform: translateY(14%);
          margin-left: auto;
          width: 28px;
          height: 28px;
        }
      }
      p {
        font-size: 14px;
        margin: 0;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.event_bg {
  padding-right: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
@media (max-width: 1200px) {
  .event_body {
    margin-top: 2rem !important;
  }
  .event_bg {
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .event {
    padding-right: 1rem !important;
    .event_body {
      .event_item {
        h4 {
          font-size: 16px !important;
        }
      }
    }
  }

  .event_bg {
    padding-left: 1rem !important;
  }
}
@media (max-width: 992px) {
  .event {
    padding-right: 0 !important;
  }
  .event_bg {
    padding-left: 0 !important;
    margin-top: 16px;
  }
}
@media (max-width: 768px) {
  .event {
    .content_title {
      h4 {
        font-size: 16px !important;
      }
    }
  }
}
@media (max-width: 575px) {
  .event {
    padding: 0 12px !important;
  }
  .event_bg {
    padding: 0 12px !important;
  }
}
@media (max-width: 768px) {
  .event {
    .content_title {
      h4 {
        font-size: 14px !important;
      }
    }
    .event_body .event_item p {
      font-size: 13px;
    }
  }
}
</style>
