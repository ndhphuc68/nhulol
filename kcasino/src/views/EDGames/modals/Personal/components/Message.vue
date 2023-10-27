<template>
  <section id="message-wrapper" class="wrapper" v-if="listMessage">
    <div class="title">
      <div>#</div>
      <div>{{ $t("check_status") }}</div>
      <div>{{ $t("title") }}</div>
      <div>{{ $t("date") }}</div>
      <div>{{ $t("action") }}</div>
    </div>
    <div v-for="(item, idx) in displayData" :key="idx">
      <div v-if="toggleAlert && idx == indexShow">
        <AlertModal
          :des="$t('do you really want to delete?')"
          :handleClose="handleToggleAlert"
          :handleAccept="() => handleDeleteMessage(item.mm_idx)"
        />
      </div>
      <div
        :class="isShowDetail && idx == indexShow ? 'row active' : 'row'"
        ref="rowTable"
        style="cursor: pointer"
      >
        <div class="item index">
          <span class="title-mobile"> # </span>
          {{ idx + 1 }}
        </div>
        <div
          :class="item.mm_read_date !== 0 ? 'item ACTIVE' : 'item FAILED'"
          @click="() => handleShowDetail(idx, item.mm_idx, item.mm_read_date)"
        >
          <span class="title-mobile"> {{ $t("check_status") }} </span>
          <span>
            {{
              item.mm_read_date !== 0 ? $t("check_yes") : $t("check_no")
            }}</span
          >
        </div>
        <div
          class="item question"
          @click="() => handleShowDetail(idx, item.mm_idx, item.mm_read_date)"
        >
          <span class="title-mobile"> {{ $t("title") }} </span>
          <p
            class="item-question"
            :style="isShowDetail && idx == indexShow && 'color:#2F9015'"
          >
            {{ item?.mm_subject }}
          </p>
          <p
            class="text-mobile"
            :style="isShowDetail && idx == indexShow && 'color:#2F9015'"
          >
            {{ item?.mm_subject }}
          </p>
        </div>
        <span
          v-if="isShowDetail && idx == indexShow"
          class="detail mobile text-left"
        >
          {{ item?.mm_content }}
        </span>
        <div
          class="item date"
          @click="() => handleShowDetail(idx, item.mm_idx, item.mm_read_date)"
        >
          <span class="title-mobile"> {{ $t("date") }} </span>
          {{ converTime(item.mm_created) }}
        </div>
        <div class="item action">
          <span class="title-mobile"> {{ $t("action") }} </span>
          <div class="action-show" @click="handleShowAction(idx)">...</div>
          <div
            class="list-btn"
            :style="{
              display: isShowAction && idx == indexShow ? 'block' : 'none',
            }"
          >
            <!--            <button-->
            <!--              @click="-->
            <!--                () => handleShowDetail(idx, item.mm_idx, item.mm_read_date)-->
            <!--              "-->
            <!--            >-->
            <!--              {{ $t("viewdetails") }}-->
            <!--            </button>-->
            <button @click="handleToggleAlert">{{ $t("delete") }}</button>
            <div class="box" @click.self="handleClickOutSide"></div>
          </div>
        </div>
      </div>
      <div
        v-if="isShowDetail && idx == indexShow"
        class="detail laptop text-left"
      >
        {{ item.mm_content }}
      </div>
    </div>
    <div class="pagination-wrapper m-auto d-flex justify-center">
      <div class="w-75 m-auto">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(listMessage?.length / itemsPerPage)"
          rounded="0"
          v-if="Math.ceil(listMessage?.length / itemsPerPage) > 1"
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
import AlertModal from "@/components/EDGames/modal/AlertModal";
import Loading from "@/components/EDGames/Loading";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const isShowAction = ref(false);
const isShowDetail = ref(false);
const indexShow = ref(0);
const listMessage = computed(() => store.state.message.listMessage);
const userInfor = computed(() => store.state.user.userInfor);
const currentPage = ref(1);
const itemsPerPage = 7;
const rowTable = ref([]);
const toggleAlert = ref(false);

const handleShowAction = (index) => {
  isShowAction.value = !isShowAction.value;
  indexShow.value = index;
};

watch(currentPage, () => {
  const element = document.getElementById("message-wrapper");
  element.scrollIntoView({ behavior: "smooth" });
});

const handleShowDetail = async (index, idx, date) => {
  indexShow.value = index;
  isShowAction.value = false;
  isShowDetail.value = !isShowDetail.value;
  if (date === 0) {
    let data = {
      memberIdx: userInfor.value.me_idx,
      mInviteCode: userInfor.value.me_invite_code,
      mNickName: userInfor.value.me_nickname,
    };
    await store.dispatch("readMessageAction", { idx, data });
  }
};

const handleClickOutSide = () => {
  isShowAction.value = false;
  isShowDetail.value = false;
};

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listMessage?.value.slice(startIndex, endIndex);
});

// const  clickCallback = pageNum => {
//   currentPage.value = pageNum;
// }

const handleToggleAlert = () => (toggleAlert.value = !toggleAlert.value);

const handleDeleteMessage = async (idx) => {
  const res = await store.dispatch("deleteMessageAction", {
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
  store.commit("handleMessageCheck");
});
</script>

<style scoped>
.wrapper {
  text-align: center;
  width: 100%;
}
.text-mobile {
  display: none;
}

.item-question {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title,
.row {
  display: grid;
  grid-template-columns: 5% 20% 45% 20% 10%;
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
}

.row.active {
  background: #f7f7f9;
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

.ACTIVE span:nth-child(2) {
  background: #f0fdf4;
  color: #15803d;
  padding: 2px 10px;
  border-radius: 15px;
}

.FAILED span:nth-child(2) {
  background: #fef2f2;
  color: #b91c1c;
  padding: 2px 10px;
  border-radius: 15px;
}

.PENDING span:nth-child(2) {
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
  top: -150%;
  left: 15%;
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
  padding: 5px 10px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
}

.detail {
  text-align: center;
  background: #fafafa;
  padding: 25px 25px;
  background: #fafafa;
  border-bottom: 1px solid #e4e4e7;
}

.pagination-wrapper {
  margin-top: 1rem;
}

@media (min-width: 769px) {
  .detail.mobile {
    display: none;
  }
}

@media (max-width: 768px) {
  .text-mobile {
    display: block;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
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

  .item-question {
    max-width: 50%;
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
    font-size: 14px;
    margin-left: 4px;
  }

  .item-question {
    display: none;
  }

  .list-btn {
    left: unset;
    top: -12px;
    right: 0;
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
