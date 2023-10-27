<template>
  <div class="helpcenter-wrapper">
    <div class="d-flex align-center justify-content-between">
      <h2>{{ $t("helpCenter") }}</h2>
      <button class="btn-query" @click="handleNavigateCreateQuery">
        <span>{{ $t("queryCreation") }}</span>
        <svg
          class="ml-2"
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.38397 17.7003L17.709 5.37532L14.6256 2.29199L2.30063 14.617L2.2923 17.7087L5.38397 17.7003Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.792 5.1084L14.892 7.20839"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <EmptyData v-if="listHelp?.length === 0" />
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
            cellClickOnMobile="cu_question"
            detailKey="cu_answer"
          />
        </template>
      </table>
      <v-pagination
        @click="scrollToTop"
        v-model="currentPage"
        :length="Math.ceil(listHelp?.length / itemsPerPage)"
        rounded="0"
      ></v-pagination>
      <!--      <paginate-->
      <!--          v-model:currentPage="currentPage"-->
      <!--          :click-handler="clickCallback"-->
      <!--          :container-class="'pagination'"-->
      <!--          :margin-pages="2"-->
      <!--          :next-text="'Next ->'"-->
      <!--          :page-class="'page-item'"-->
      <!--          :page-count="Math.ceil(listHelp?.length/itemsPerPage)"-->
      <!--          :page-range="3"-->
      <!--          :prev-text="'<- Prev'"-->
      <!--      >-->
      <!--      </paginate>-->
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import RowHelpCenter from "@/views/Duri/HelpCenter/RowHelpCenter.vue";
import EmptyData from "@/components/Duri/EmptyData";
import { useRouter } from "vue-router";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const { t } = useI18n();
const store = useStore();
const listHelp = computed(() => store.state.helpCenter.listHelp);
const userInfor = computed(() => store.state.user.userInfor);

const columns = computed(() => ({
  no: { text: "#" },
  cu_question: {
    text: t("title"),
    callback: (data) => {
      return data?.cu_question?.length > 50
        ? data?.cu_question?.slice(0, 50) + "..."
        : data?.cu_question;
    },
  },
  cu_status: {
    text: t("state"),
    callback: (status) => {
      return t(status?.cu_status);
    },
  },
  cu_created: {
    text: t("dateOfRequest"),
    callback: (row, date) => {
      return converTime(date);
    },
  },
  action: { text: "" },
}));

const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = 7;
const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listHelp?.value?.slice(startIndex, endIndex);
});

const handleDeleteHelpCenter = async (idx) => {
  const res = await store.dispatch("deleteHelpCenterAction", {
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
};

const handleNavigateCreateQuery = () => {
  router.push("Query-creation");
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // document.getElementsByTagName("html").animate({scrollTop:0},"smooth")
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

  //&.disable {
  //    .page-link {
  //        padding: 8px 14px;
  //        border-radius: 8px;
  //        border: 1px solid #D0D5DD;
  //        background: #FFF !important;
  //    }
  //}
}
</style>
