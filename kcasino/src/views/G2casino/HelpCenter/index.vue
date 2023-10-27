<script setup>
import {computed, ref, watch} from "vue";
import { useI18n } from "vue-i18n";
import { converTime } from "@/utils";
import RowHelpCenter from "./RowHelpCenter";
import BannerPage from "@/components/G2casino/BannerPage";
import { useStore } from "vuex";

const store = useStore();
const { t } = useI18n();

const listHelp = computed(() => store.state.helpCenter.listHelp);
const userInfor = computed(() => store.state.user.userInfor);

const columns = {
  no: { text: "#" },
  cu_question: {
    text: "title",
  },
  cu_status: {
    text: "state",
    callback: (state) => {
      return t(state?.cu_status);
    },
  },
  cu_created: {
    text: "dateOfRequest",
    callback: (row, date) => {
      return converTime(date);
    },
  },
  action: { text: "" },
};

const currentPage = ref(1);
const itemsPerPage = 7;

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

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listHelp?.value?.slice(startIndex, endIndex);
});

watch(currentPage, () => {
  window.scrollTo({ top: 650, behavior: "smooth" });
});

</script>

<template>
  <BannerPage :page="$t('helpCenter')" />
  <div class="helpcenter-wrapper container">
    <div class="d-flex align-center justify-content-between">
      <router-link class="btn-query" to="/query-creation">
        <span>{{ $t("queryCreation") }}</span>
        <i class="pi pi-pencil" style="font-size: 1rem"></i>
      </router-link>
    </div>
    <div class="card">
      <table class="custom">
        <tr class="table-titles">
          <th v-for="(col, key, index) in columns" :key="index">
            {{ $t(col?.text) }}
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
      <div>
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(listHelp?.length / itemsPerPage)"
          rounded="0"
          v-if="Math.ceil(listHelp?.length / itemsPerPage) > 1"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  border: none;
}

table.custom {
  border: 1px solid RGB(206 205 205 / 60%);
}

.helpcenter-wrapper {
  margin-top: 3rem;
  margin-bottom: 3rem;
  overflow: hidden;
}

.btn-query {
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: 2.5rem;
  background: #162f86;
  text-decoration: none;
  color: #ffffff;

  span {
    margin-right: 0.8rem;
  }

  &:hover {
    transform: scale(0.97);
    opacity: 0.9;
    transition: all linear 0.2s;
  }
}

@media (max-width: 768px) {
  table.custom {
    border: none;
  }
}
</style>
