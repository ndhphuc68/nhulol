<template>
  <!-- <article
    @click="handleSelectCasino(liveItem?.vendorCode)"
    class="col-5 me-1 col-sm-4 col-lg-2 mb-4 pt-2 pb-3 h-100 d-flex flex-column justify-content-between align-items-center"
  > -->
  <article
    class="item-casino"
    @click="handleSelectCasino(liveItem?.vendorCode)"
  >
    <div
      class="item-casino d-flex flex-column justify-center align-items-center m-2"
    >
      <div class="d-flex justify-content-start w-100">
        <img
          v-if="liveItem?.vendorCode !== 'bolton'"
          :src="
            require(`@/assets/logo/companies-game/${liveItem.vendorCode
              .toString()
              .toLowerCase()}Active.png`)
          "
          alt="live-logo"
          class="live-company"
        />
        <div
          v-if="liveItem?.vendorCode === 'bolton'"
          style="height: 50px"
        ></div>
      </div>
      <!-- <img
        :src="
          require(`@/assets/logo/companies-game/${liveItem.vendorCode
            .toString()
            .toLowerCase()}Active.png`)
        "
        alt="live-logo"
        class="live-company-hover"
      /> -->
      <img
        :src="
          liveItem?.vendorCode !== 'bolton'
            ? require(`@/assets/PlayG1/logos/lives/${index + 1}.png`)
            : require(`@/assets/PlayG1/logos/lives/bolton.png`)
        "
        alt="live-logo"
        class="live-img"
      />
    </div>
    <div :class="props.disable ? '' : 'disable-item'" class="btn">
      <!--      <h5>{{ props.liveItem.name }}</h5>-->
      <button
        :class="props.disable ? '' : 'disable-item'"
        class="default-button"
      >
        {{ $t("join") }}
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed, defineProps, onBeforeUnmount, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import {
  getVavagateStartRequest,
  getWithdrawAllWhenCloseGame,
  playGameTOS,
} from "@/api/games/request";
import { handleImage } from "@/utils";

const store = useStore();
const { t } = useI18n();

const props = defineProps({
  liveItem: Object,
  index: Number,
  disable: { type: Boolean, defaults: true },
});

const onWeb = computed(() => store.state.games2.onWeb);
const userInfor = computed(() => store.state.user.userInfor);

const listFillter = ref([]);
const disabledList = ref([]);

let tab = null;
let timer = null;

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

const handleBeforeUnload = () => {
  tab?.window.close();
};

window.addEventListener("beforeunload", handleBeforeUnload);

const handleSelectCasino = async (key) => {
  if (!props.disable) {
    return;
  }
  if (store.state.auth.auth) {
    let checkDisable = disabledList.value.find((e) => e === key);
    if (!checkDisable) {
      await store.commit("handleUpdateLoading", true);
      if (key === "bolton") {
        if (!onWeb.value) {
          if (tab) {
            clearInterval(timer);
            await getWithdrawAllWhenCloseGame({
              gamecode: key,
              memberIdx: userInfor.value.me_idx,
            });
            tab?.window.close();
            tab = null;
          } else {
            let config =
              "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=100, height=100, top=0,left=0";
            let check = window.open("", "popupId", config);
            check.close();
          }
        }
        await getWithdrawAllWhenCloseGame({
          gamecode: key,
          memberIdx: userInfor.value.me_idx,
        });
        setTimeout(async () => {
          const res = await playGameTOS();
          if (res.code == 0) {
            await openGamePopup(res.data, "VAG");
            store.commit("handleUpdateOnWeb", false);
          } else {
            await handleShowAlert(res);
          }
        }, 1500);
      } else {
        const gameKey = await handleSelectGame(key);
        if (gameKey) {
          if (key === "evolution_casino") {
            setTimeout(async () => {
              const res = await getVavagateStartRequest("/game/vag/play");
              if (res.code == 0) {
                await openGamePopup(res.data, "VAG");
              } else {
                await handleShowAlert(res);
              }
            }, 3000);
          } else {
            await getWithdrawAllWhenCloseGame({
              gamecode: key,
              memberIdx: userInfor.value.me_idx,
            });
            await handlePlayGame(key, gameKey);
          }
        }
      }
    }
  } else {
    store.commit("handleToggle", "login");
  }
};

const handleSelectGame = async (key) => {
  if (!onWeb.value) {
    if (tab) {
      clearInterval(timer);
      await getWithdrawAllWhenCloseGame({
        gamecode: key,
        memberIdx: userInfor.value.me_idx,
      });
      tab?.window.close();
      tab = null;
    } else {
      let config =
        "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=100, height=100, top=0,left=0";
      let check = window.open("", "popupId", config);
      check.close();
    }
  }
  store.commit("handleUpdateOnWeb", false);
  const data = {
    provider_id: key,
  };
  if (
    key === "microgaming_casino" ||
    key === "orientalgame_casino" ||
    key === "vivo_casino"
  ) {
    const ipRes = await fetch("https://jsonip.com/").then((res) => res.json());
    if (ipRes.country != "KR") {
      await store.commit("handleUpdateLoading", false);
      await store.dispatch("showAlert", {
        type: "error",
        message: t("error_play_game2"),
      });
      return;
    }
  }
  const res = await store.dispatch("getListGameCompanyActionsV3", data);
  // listFillter.value = listGameDetailProviderCasino.value;
  // const res = listFillter.value.find((e) => e.key === key);
  if (res) {
    if (key === "pragmatic_casino") {
      return 101;
    } else {
      return res[0]?.gameCode && res[0].gameCode;
    }
  } else {
    await store.commit("handleUpdateLoading", false);
    await store.dispatch("showAlert", {
      type: "error",
      message: t("error_vendor"),
    });
    return null;
  }
};
const handlePlayGame = async (key, gameKey) => {
  setTimeout(async () => {
    const data = {
      provider_id: key,
      game_id: gameKey,
    };
    /*if (key === 'pragmatic_slot') {
      const ipRes = await fetch('https://jsonip.com/').then(res => res.json());
      if (ipRes.country != 'KR') {
        await store.commit("handleUpdateLoading", false);
        await store.dispatch("showAlert", {
          type: "error",
          message: t("error_play_game2"),
        });
        return;
      }
    }*/
    const res = await store.dispatch(
      "getPlayGameSelectV3",
      JSON.stringify(data)
    );
    if (res?.code != 0) {
      await handleShowAlert(res);
      disabledList.value.push(key);
    } else {
      setTimeout(async () => {
        await store.commit("handleUpdateLoading", false);
        await openGamePopup(res.data, "KGN");
      }, 1000);
    }
  }, 1000);
};

const openGamePopup = async (res, key) => {
  if (res?.length > 0) {
    store.commit("handleUpdateLoading", false);
    let config =
      "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
    tab = window.open(res.replace(/['"]+/g, ""), "popupId", config);
    if (!tab) {
      await getWithdrawAllWhenCloseGame({
        gamecode: key,
        memberIdx: userInfor.value.me_idx,
      });
      await store.dispatch("showAlert", {
        type: "error",
        message: t(`blockbr`),
      });
      return;
    }
    timer = setInterval(async function () {
      if (tab?.closed) {
        clearInterval(timer);
        await getWithdrawAllWhenCloseGame({
          gamecode: key,
          memberIdx: userInfor.value.me_idx,
        });
        tab = null;
      }
    }, 100);
  }
};

const handleShowAlert = async (res) => {
  await store.commit("handleUpdateLoading", false);
  await store.dispatch("showAlert", {
    type: "error",
    message: t(`error_play_game_code${res.code}`),
  });
};
</script>

<style scoped lang="scss">
.disable-item {
  cursor: not-allowed !important;
  filter: grayscale(100%);
}
article {
  border-radius: 8px;
  border: 1px solid #fafafa;
  background: linear-gradient(
    219deg,
    rgba(221, 221, 221, 0.5) 0%,
    rgba(252, 250, 250, 0.5) 100%
  );
  border: 1px solid #a6a6a6;
  transition: all 0.2s ease;

  //padding: 1.5rem;
  //margin: auto;
  /* min-height: 414px; */
  @media (max-width: 575.98px) {
    /* min-height: 370px; */
  }
  //@media (max-width: 768px) {
  //  min-height: 370px;
  //}

  .item-casino {
    .live-company {
      height: 50px;
      width: 75px;
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }

    .live-company-hover {
      height: 50px;
      display: none;
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.2);
    scale: 1.02;

    .item-casino {
      background-image: url(@/assets/FSCasino/gifs/hover.gif);
    }

    .default-button {
      background: #de6777;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
      color: var(--white);
      border-color: #fff;
    }

    .item-casino {
      .live-company {
        -webkit-filter: grayscale(0);
        filter: grayscale(0);
      }

      .live-company-hover {
        height: 40px;
        display: block;
      }
    }
  }
}

h5 {
  text-align: center;
  font-size: 20px;
  font-family: "Poppins-Bold";
  margin: 1.5rem 0;
  color: #d23449;
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
}

.live-img {
  height: 180px;
}

.btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  .default-button {
    padding: 4px 20px;
    font-size: 14px;
  }
}
</style>
