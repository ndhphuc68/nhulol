<template>
  <div class="helpcenter-wrapper">
    <div class="d-flex align-center justify-content-between">
      <h2>{{ $t("message") }}</h2>
    </div>
    <EmptyData v-if="listMessage?.length === 0" />
    <div class="card" v-else>
      <table class="custom">
        <tr class="table-titles">
          <th v-for="(col, key, index) in columns" :key="index">
            {{ col?.text }}
          </th>
        </tr>
        <template v-for="(row, index) in displayData" :key="index">
          <RowHelpCenter
            @handleDeleteHelpCenter="handleDeleteHelpCenter"
            :columns="columns"
            :index="index + 1"
            :row="row"
            cellClickOnMobile="mm_subject"
            detailKey="mm_content"
          />
        </template>
      </table>
      <v-pagination
        @click="scrollToTop"
        v-model="currentPage"
        :length="Math.ceil(listMessage?.length / itemsPerPage)"
        rounded="0"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import RowHelpCenter from "@/views/PlayGame1/Message/RowHelpCenter.vue";
import EmptyData from "@/components/PlayGame1/EmptyData";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const { t } = useI18n();
const store = useStore();
const listMessage = computed(() => store.state.message.listMessage);
const userInfor = computed(() => store.state.user.userInfor);

const columns = computed(() => ({
  no: { text: "#" },
  mm_subject: {
    text: t("title"),
  },
  mm_read_date: {
    text: t("checkOrNot"),
  },
  mm_created: {
    text: t("dateOfRequest"),
    callback: (row, date) => {
      return converTime(date);
    },
  },
  action: { text: "" },
}));

const currentPage = ref(1);
const itemsPerPage = 7;
const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listMessage?.value?.slice(startIndex, endIndex);
});

const handleDeleteHelpCenter = async (id) => {
  const res = await store.dispatch("deleteMessageAction", {
    idx: id,
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
};


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.5rem;
}

.btn-query {
  display: flex;
  align-items: center;
  padding: 8px 14px;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  border: 1px solid #d0d5dd;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    color: var(--primaryPlayG1);
    opacity: 0.8;
    transform: scale(0.97);

    svg path {
      stroke: var(--primaryPlayG1);
    }
  }
}

.card {
  padding: 32px 0;
  margin-top: 32px;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 20px 0 0;
  }
}

.helpcenter-wrapper .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .card {
    border: unset;
  }
}
</style>
<style lang="scss">
.helpcenter-wrapper .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}

.helpcenter-wrapper .page-item {
  margin: 5px !important;
  border-radius: 8px;

  &.active {
    .page-link {
      background: #e9edfc;
      border-radius: 8px;
      border: unset;
      color: var(--text);
    }
  }

  .page-link {
    background: #fafafa;
    border-radius: 8px;
  }
}
</style>
