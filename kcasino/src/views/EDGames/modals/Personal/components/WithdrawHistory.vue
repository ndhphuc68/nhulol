<template>
  <section id="withdraw-wrapper" class="wrapper" v-if="listWithDraw">
    <div class="title">
      <div>#</div>
      <div>{{ $t("withdrawName") }}</div>
      <div>{{ $t("withdrawAmount") }}</div>
      <div>{{ $t("status") }}</div>
      <div>{{ $t("date") }}</div>
    </div>
    <div v-for="(item, idx) in displayData" :key="idx">
      <div v-if="toggleAlert && idx == indexShow">
        <AlertModal
          :des="$t('do you really want to delete?')"
          :handleClose="handleToggleAlert"
          :handleAccept="() => handleDeleteWithdraw(item.wi_idx)"
        />
      </div>
      <div class="row" ref="rowTable">
        <div class="index item">
          <span class="title-mobile"> #</span>
          {{ idx + 1 }}
        </div>
        <div class="question item">
          <span class="title-mobile"> {{ $t("withdrawName") }} </span>
          {{ item.wi_member_account }}
        </div>
        <div class="amount item">
          <span class="title-mobile"> {{ $t("withdrawAmount") }} </span>
          ₩{{ convertMoney(item.wi_money) }}
        </div>
        <div class="item" :class="item.wi_status">
          <span class="title-mobile"> {{ $t("status") }} </span>
          <span>{{ $t(item.wi_status) }}</span>
        </div>
        <div class="item date">
          <span class="title-mobile"> {{ $t("date") }} </span>
          {{ converTime(item.wi_created) }}
        </div>
      </div>
    </div>
    <div class="pagination-wrapper m-auto d-flex justify-center">
      <div class="w-75 m-auto">
        <v-pagination
          class="pagination"
          v-model="currentPage"
          :length="Math.ceil(listWithDraw?.length / itemsPerPage)"
          rounded="0"
          v-if="Math.ceil(listWithDraw?.length / itemsPerPage) > 1"
        ></v-pagination>
      </div>
    </div>
  </section>
  <section v-else>
    <Loading :size="'50'" />
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { converTime } from "@/utils";
import Loading from "@/components/EDGames/Loading";
import AlertModal from "@/components/EDGames/modal/AlertModal";
import { convertMoney } from "@/utils";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const isShowAction = ref(false);
const indexShow = ref(0);
const listWithDraw = computed(() => store.state.withdraw.listWithDraw);
const userInfor = computed(() => store.state.user.userInfor);
const currentPage = ref(1);
const itemsPerPage = 7;
const rowTable = ref([]);
const toggleAlert = ref(false);

const handleClickOutSide = () => {
  isShowAction.value = false;
};

watch(currentPage, () => {
  const element = document.getElementById("withdraw-wrapper");
  element.scrollIntoView({ behavior: "smooth" });
});

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listWithDraw?.value.slice(startIndex, endIndex);
});

const handleToggleAlert = () => (toggleAlert.value = !toggleAlert.value);

const handleDeleteWithdraw = async (idx) => {
  const res = await store.dispatch("deleteWithdrawAction", {
    idx: idx,
    data: {
      memberIdx: userInfor.value.me_idx,
      mInviteCode: userInfor.value.me_invite_code,
      mNickName: userInfor.value.me_nickname,
    },
  });
  if (res?.is_success) {
    await store.dispatch("showAlert", {
      type: "success",
      message: t("delete_success"),
    });
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("delete_error"),
    });
  }
  handleClickOutSide();
};

onMounted(() => {
  store.commit("handleWithDrawCheck");
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 580px;
  text-align: center;
}

.title,
.row {
  display: grid;
  grid-template-columns: 8% 23% 23% 23% 23%;
  padding: 10px 5px;
  align-items: center;
}

.title {
  color: #71717a;
  background-color: #f7f7f9;
  padding: 15px 5px;
}

.row {
  border-bottom: 1px solid #e4e4e7;
  padding: 25px 0;
}

.index,
.date {
  color: #a1a1aa;
}

.question {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.amount {
  font-weight: 700;
}

.COMPLETED span:nth-child(2) {
  background: #f0fdf4;
  color: #15803d;
  padding: 2px 10px;
  border-radius: 15px;
}

.ADMIN_CANCEL span:nth-child(2) {
  background: #fef2f2;
  color: #b91c1c;
  padding: 2px 10px;
  border-radius: 15px;
}

.FAILED span:nth-child(2) {
  background: #fef2f2;
  color: #b91c1c;
  padding: 2px 10px;
  border-radius: 15px;
}

.REQUEST span:nth-child(2) {
  background: #fffbeb;
  color: #b45309;
  padding: 2px 10px;
  border-radius: 15px;
}

.action {
  position: relative;
}

.action-show {
  cursor: pointer;
  font-weight: 600;
}

.list-btn {
  position: absolute;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 2px;
  top: -130%;
  left: 20%;
  background: #fff;
  z-index: 1;
}

.box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: -1;
}

button {
  border: none;
  padding: 8px 25px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
}

.detail {
  text-align: center;
  background: #fafafa;
  padding: 15px 10px;
}

.pagination-wrapper {
  margin-top: 20px;
  width: 100%;
}

@media (min-width: 769px) {
  .detail.mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .wrapper {
    height: 100%;
  }

  .row {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }

  .question img {
    width: 24px;
    height: 24px;
  }

  .pagination-wrapper {
    position: static !important;
    margin: 0 auto;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 6px 0;
    padding: 8px;
  }

  .item:nth-child(odd) {
    border-radius: 4px;
    background: #fafafa;
  }

  .title {
    display: none;
  }

  .detail.laptop {
    display: none;
  }

  .detail.mobile {
    display: block;
    width: 100%;
    background: #fafafa;
    font-size: 12px;
    margin-left: 4px;
  }

  .item-question {
    display: none;
  }

  .list-btn {
    left: unset;
    top: -12px;
  }

  .list-btn button {
    border: none;
  }
}
</style>

<style scoped lang="scss">
.title-mobile {
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
}
</style>
