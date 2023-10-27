<template>
  <section class="wrapper" v-if="listMessage">
    <div class="title">
      <div>Status</div>
      <div>Writer</div>
      <div>Subject</div>
      <div>Written Time</div>
    </div>
    <div v-for="(item, idx) in displayData" :key="idx" class="message-content">
      <div
        :class="isShowDetail && idx == indexShow ? 'row active' : 'row'"
        ref="rowTable"
        style="cursor: pointer"
      >
        <div
          :class="item.mm_read_date !== 0 ? 'item ACTIVE' : 'item FAILED'"
          @click="() => handleShowDetail(idx, item.mm_idx, item.mm_read_date)"
        >
          <span v-if="item.mm_read_date !== 0" class="status">
            <img src="@/assets/icon/have-read.png" height="21" width="20" />
            <span>Unread</span>
          </span>
          <span v-else class="status">
            <img src="@/assets/icon/un-read.png" height="21" width="20" />
            <span>Have read</span>
          </span>
        </div>
        <div class="item writer"></div>
        <div
          class="item question"
          @click="() => handleShowDetail(idx, item.mm_idx, item.mm_read_date)"
        >
          <p
            class="item-question"
            :style="isShowDetail && idx == indexShow && 'color:#2F9015'"
          >
            {{ item?.mm_subject }}
          </p>
          <p
            class="d-block d-md-none"
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
          {{ converTime(item.mm_created) }}
        </div>
        <!--        <div class="item action">-->
        <!--          <div class="action-show" @click="handleShowAction(idx)">...</div>-->
        <!--          <div class="list-btn" :style="{'display': isShowAction && idx==indexShow ? 'block': 'none' }">-->
        <!--            <button @click="() =>handleShowDetail(idx,item.mm_idx,item.mm_read_date)">{{ $t("viewdetails") }}</button>-->
        <!--            <button @click="handleToggleAlert">{{ $t("delete") }}</button>-->
        <!--            <div class="box" @click.self="handleClickOutSide"></div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div
        v-if="isShowDetail && idx == indexShow"
        class="detail laptop text-left"
      >
        {{ item.mm_content }}
      </div>
    </div>
    <div class="pagination-wrapper w-75">
      <paginate
        v-if="listMessage?.length > 0"
        v-model:currentPage="currentPage"
        :page-count="Math.ceil(listMessage?.length / itemsPerPage)"
        :page-range="3"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="`< ${$t('previous')}`"
        :next-text="`${$t('next')} >`"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
  </section>
  <section v-else>
    <Loading :size="'50'" />
  </section>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { converTime } from "@/utils";
import AlertModal from "@/components/EDGames/modal/AlertModal";
import Loading from "@/components/EDGames/Loading";
import Paginate from "vuejs-paginate-next";
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
const isMobile = ref(false);
const collums = ["#", "check_status", "title", "date", "action"];
const rowTable = ref([]);
const toggleAlert = ref(false);

const handleShowAction = (index) => {
  isShowAction.value = !isShowAction.value;
  indexShow.value = index;
};

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

// const handleClickOutSide = () => {
//   isShowAction.value = false
//   isShowDetail.value = false
// }

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listMessage?.value.slice(startIndex, endIndex);
});

// const  clickCallback = pageNum => {
//   currentPage.value = pageNum;
// }

onMounted(() => {
  store.commit("handleMessageCheck");
});
</script>

<style scoped lang="scss">
.wrapper {
  text-align: center;
  width: 100%;
  padding: 1rem 2rem 3rem 2rem;
  .message-content {
    background: red;
    height: 550px;
  }
}
.status {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title,
.row {
  display: grid;
  grid-template-columns: 15% 15% 40% 30%;
  padding: 10px 5px;
  align-items: center;
}

.title {
  color: #fff;
  background-color: #e592ed;
  padding: 15px 5px;
  font-weight: 600;
  border-radius: 6px;
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

.ACTIVE span {
  background: #f0fdf4;
  color: #15803d;
  padding: 2px 10px;
  border-radius: 15px;
}

.FAILED span {
  background: #fef2f2;
  color: #b91c1c;
  padding: 2px 10px;
  border-radius: 15px;
}

.PENDING span {
  background: #fffbeb;
  color: #b45309;
  padding: 2px 10px;
  border-radius: 15px;
}

button {
  border: none;
  padding: 5px 10px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
}

//button:first-child {
//  border-bottom: 1px solid #000;
//}

.detail {
  text-align: center;
  background: #fafafa;
  padding: 25px 25px;
  background: #fafafa;
  border-bottom: 1px solid #e4e4e7;
}

.pagination-wrapper {
  .pagination {
    background: #fff;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    bottom: 0px;
    left: 25%;
  }
}

@media (min-width: 769px) {
  .detail.mobile {
    display: none;
  }
}

@media (max-width: 768px) {
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
    flex-direction: row-reverse;
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
  }

  .list-btn button {
    border: none;
  }
}
</style>
