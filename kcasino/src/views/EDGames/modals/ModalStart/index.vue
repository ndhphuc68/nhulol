<script setup>
import { useStore } from "vuex";
import { computed, defineProps, ref } from "vue";
import { getCookie, setCookie } from "@/utils/cookie";

const store = useStore();

const dataPopUp = computed(() => store.getters.getPopup);
const dataNotice = ref(computed(() => store.state.notice.list));

defineProps({
  imageLogo: String,
  bgColor: String,
  checkIcon: {
    type: Boolean,
    default: true,
  },
});

const handleCloseModal = (key) => {
  dataNotice.value.find((e) => {
    if (e.no_type === "NOTICE_POPUP" && e.no_idx === key) {
      e.no_status = "NO_ACTIVE";
    }
  });
  store.commit("handleUpdateNoticeListPopUp", dataNotice.value);
};

const handleClose = () => {
  for (let i = 0; i < dataNotice.value.length; i++) {
    if (
      dataNotice.value[i].no_type === "NOTICE_POPUP" &&
      dataNotice.value[i].no_status === "ACTIVE"
    ) {
      dataNotice.value[i].no_status = "NO_ACTIVE";
      break;
    }
  }
  store.commit("handleUpdateNoticeListPopUp", dataNotice.value);
};

const handleCloseToday = (key) => {
  const dataCookie = getCookie("MDS");
  if (dataCookie) {
    const dataSave = {
      no_idx: key,
      dataCreate: new Date(),
    };
    dataCookie.push(dataSave);
    setCookie("MDS", dataCookie);
    handleCloseModal(key);
  } else {
    const dataSave = [
      {
        no_idx: key,
        dataCreate: new Date(),
      },
    ];
    setCookie("MDS", JSON.stringify(dataSave));
    handleCloseModal(key);
  }
};

const handleCheckModal = (id) => {
  const dataCookie = getCookie("MDS");
  if (dataCookie) {
    const check = dataCookie.find((e) => e.no_idx === id);
    if (!check) {
      return true;
    } else {
      return new Date() > check.dataCreate;
    }
  } else {
    return true;
  }
};
</script>

<template>
  <div class="w-100 main-start">
    <div class="w-100 h-100 opacity"></div>
    <div class="main w-100">
      <div
        class="d-md-flex flex-row justify-space-evenly w-100 h-100"
        @click.self="handleClose"
      >
        <div
          :class="
            item.no_status === 'ACTIVE' && handleCheckModal(item.no_idx)
              ? 'item d-md-flex justify-center align-center'
              : 'd-none'
          "
          :key="index"
          v-for="(item, index) in dataPopUp.slice(0, 2)"
        >
          <div
            v-if="item.no_status === 'ACTIVE' && handleCheckModal(item.no_idx)"
            :style="bgColor && `background:${bgColor}`"
            class="item-start"
          >
            <div class="item-header d-flex justify-center">
              <img class="logo" alt="logo" :src="imageLogo" />
              <button class="btn-close1" @click="handleCloseModal(item.no_idx)">
                <img
                  v-if="checkIcon"
                  alt=""
                  src="@/assets/icon/close-icon.png"
                  height="24"
                  width="24"
                />
                <img
                  v-else
                  alt=""
                  src="@/assets/icon/close-white.png"
                  height="24"
                  width="24"
                />
              </button>
            </div>
            <div class="w-100 item-banner">
              <img v-if="item.no_img_base64"
                class="banner"
                alt="banner"
                :src="
                  item.no_img_base64 &&
                  `data:image/png;base64,${item.no_img_base64}`
                "
              />
              <div v-else class="banner-content" alt="banner" v-html="item.no_content" style="
              max-height: 100%;
           ">
              </div>
            </div>
            <div class="w-100 d-flex justify-center align-center item-footer">
              <button
                @click="handleCloseToday(item.no_idx)"
                class="btn-close-modal mb-3 mt-3"
              >
                {{ $t("not_open_today") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-start {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 889;
}

.opacity {
  opacity: 0.5;
  background-color: #1c2529;
  z-index: 55;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.main {
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
}

.item {
  width: 30%;
}

.item-start {
  background-color: white;
  width: 100%;
  height: 80%;
}

.item-header {
  position: relative;
  height: 10%;
}

.item-header .logo {
  height: 50px;
  margin-top: 0.5rem;
}

.btn-close1 {
  font-weight: 200;
  font-size: 30px;
  position: absolute;
  z-index: 9;
  top: 15%;
  right: 10px;
}

.item-banner {
  height: 80%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #000;
}

.banner {
  width: 100%;
  object-fit: revert;
  height: 100%;
}

.btn-close-modal {
  padding: 10px 30px;
  background-color: #00b0ff;
  border-radius: 25px;
  color: #fff;
}

.item-footer {
  height: 10%;
}

// @media (max-width: 1024px) and (min-width: 769px) {
//   .item {
//     width: 40%;
//   }
// }

@media (max-width: 991.98px) {
  .item-start {
    height: 100%;
  }

  .item {
    width: 60%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@media (max-width: 425px) {
  .item {
    width: 90%;
  }
}

@media (max-height: 700px) {
  .item-header {
    align-items: center;
    height: 13% !important;
    .logo {
      width: 150px !important;
      height: 60px !important;
    }
  }

  .item-banner {
    height: 77% !important;
  }
  .btn-close1 {
    position: absolute;
    z-index: 9;
    top: 15% !important;
    right: 10px;
  }
}

@media (max-height: 600px) {
  .main {
    height: 100%;
    max-height: 600px;
  }
  .item {
    width: 30%;
  }

  .item-header {
    height: 15% !important;
    .logo {
      width: 80px !important;
      height: 45px !important;
    }
  }

  .item-banner {
    height: 75% !important;
  }

  .btn-close-modal {
    padding: 2px 16px;
    font-size: 12px;
    border-radius: 32px;
    margin: 0 !important;
  }

  .btn-close1 {
    position: absolute;
    z-index: 9;
    top: 0 !important;
    right: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
