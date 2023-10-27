<script setup>
import { useI18n } from "vue-i18n";
import Button from "@/components/DoPlay/Customs/Button";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { converTime, convertMoney } from "@/utils";
import AlertModal from "@/components/EDGames/modal/AlertModal";
import Calendar from "primevue/calendar";

const { t } = useI18n();
const store = useStore();
const listDeposit = computed(() => store.state.deposit.listDeposit);
const listDepositView = ref(store.state.deposit.listDeposit);
const pageList = ref([]);
const total = ref(store.getters.totalAmountDeposit);
const userInfor = computed(() => store.state.user.userInfor);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const dateStart = ref();
const dateEnd = ref();
const toggleAlert = ref(false);
const idDelete = ref("");

watch(currentPage, () => {
  const element = document.getElementById("deposit-wrapper");
  element.scrollIntoView({ behavior: "smooth" });
});

onMounted(() => {
  if (listDepositView.value.length > 5) {
    pageList.value = listDepositView.value.slice(0, 5);
  } else {
    pageList.value = listDepositView.value;
  }
});

const handleSearch = () => {
  if (
    dateEnd.value &&
    dateStart.value &&
    dateEnd.value.getTime() >= dateStart.value.getTime()
  ) {
    let data = listDeposit?.value.filter(
      (item) =>
        item.de_created * 1000 >= dateStart.value.getTime() &&
        item.de_created * 1000 <= dateEnd.value.getTime() + 86400000
    );
    if (data.length > 0) {
      if (data.length > 5) {
        currentPage.value = 1;
        let total1 = 0;
        data?.forEach((e) => (total1 = total1 + e.wi_money));
        total.value = total1;
        listDepositView.value = [...data];
        pageList.value = [
          ...data.slice(
            (currentPage.value - 1) * itemsPerPage.value,
            currentPage.value * itemsPerPage.value
          ),
        ];
      } else {
        let total1 = 0;
        data?.forEach((e) => (total1 = total1 + e.wi_money));
        total.value = total1;
        listDepositView.value = [...data];
        pageList.value = [...data];
      }
    } else {
      total.value = 0;
      listDepositView.value = [];
      pageList.value = [];
    }
  }
};

const updatePage = () => {
  pageList.value = listDepositView.value.slice(
    (currentPage.value - 1) * itemsPerPage.value,
    currentPage.value * itemsPerPage.value
  );
};

const handleToggleAlert = () => (toggleAlert.value = !toggleAlert.value);

const handleDeleteDeposit = async () => {
  const res = await store.dispatch("deleteDepositAction", {
    idx: idDelete.value,
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
    listDepositView.value = [...listDeposit.value];
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("delete_error"),
    });
  }
};
</script>

<template>
  <div class="w-100">
    <div class="title-group">
      <h5 class="text-center title-tab">{{ $t("depositreport") }}</h5>
    </div>
    <v-row class="w-100 mx-0 my-0">
      <v-col cols="12">
        <div class="item-report">
          <p>{{ $t("totalAmount") }}</p>
          <p class="price">₩{{ convertMoney(total) }}</p>
        </div>
      </v-col>
    </v-row>
    <div class="table-date">
      <div class="search-box v-row mb-2 w-100">
        <div
          class="v-col-12 px-0 py-0 v-col-md-6 d-flex flex-row justify-center div-calendar-370 align-center"
        >
          <Calendar dateFormat="mm/dd/yy" v-model="dateStart" showIcon />
          <span class="calendar-280">&nbsp;-&nbsp;</span>
          <Calendar dateFormat="mm/dd/yy" v-model="dateEnd" showIcon />
        </div>
        <Button
          @click="handleSearch"
          class="v-col-12 mt-2 mb-2 mb-md-0 v-col-md-4"
          variant="contained"
          >{{ $t("search") }}
        </Button>
      </div>
      <v-table id="deposit-wrapper" fixed-header height="300px">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">
              {{ $t("depositamount") }}
            </th>
            <th class="text-center">
              {{ $t("depositor") }}
            </th>
            <th class="text-center">
              {{ $t("date") }}
            </th>
            <th class="text-center">
              {{ $t("status") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pageList" :key="item.name">
            <td class="text-center">
              <div class="d-flex align-center h-100 justify-space-between">
                <span class="d-md-none">#</span>
                <span class="desktop">{{ index + 1 }}</span>
              </div>
            </td>
            <td class="text-center">
              <div class="d-flex align-center h-100 justify-space-between">
                <span class="d-md-none">{{ $t("depositamount") }}</span>
                <span class="money desktop"
                  >₩{{ convertMoney(item.de_money) }}</span
                >
              </div>
            </td>
            <td class="text-center">
              <div class="d-flex align-center h-100 justify-space-between">
                <span class="d-md-none"> {{ $t("depositor") }}</span>
                <span class="money desktop">{{ item.de_member_account }}</span>
              </div>
            </td>
            <td class="text-center">
              <div class="d-flex align-center h-100 justify-space-between">
                <span class="d-md-none">{{ $t("date") }}</span>
                <span class="desktop">{{ converTime(item.de_created) }}</span>
              </div>
            </td>
            <td class="text-center" :class="item.de_status">
              <div class="d-flex align-center h-100 justify-space-between">
                <span class="d-md-none">{{ $t("status") }}</span>
                <span class="desktop">{{ $t(item.de_status) }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-pagination
        v-model="currentPage"
        @click="updatePage"
        :length="Math.ceil(listDepositView?.length / itemsPerPage)"
        rounded="0"
      ></v-pagination>
    </div>
  </div>
  <div v-if="toggleAlert">
    <AlertModal
      :des="$t('do you really want to delete?')"
      :handleClose="handleToggleAlert"
      :handleAccept="() => handleDeleteDeposit()"
    />
  </div>
</template>

<style scoped>
.COMPLETED span:last-child {
  background: #f0fdf4;
  color: #15803d;
  padding: 2px 10px;
  border-radius: 15px;
}

.ADMIN_CANCEL span:last-child {
  background: #fef2f2;
  color: #b91c1c;
  padding: 2px 10px;
  border-radius: 15px;
}

.ADMIN_CANCEL span:last-child {
  background: #fef2f2;
  color: #b91c1c;
  padding: 2px 10px;
  border-radius: 15px;
}

.REQUEST span:last-child {
  background: #fffbeb;
  color: #b45309;
  padding: 2px 10px;
  border-radius: 15px;
}

thead th {
  background: #f2f2f2 !important;
}

.search-box {
  margin: 10px 10px 0;
  align-items: center;
  justify-content: center;
}

.delete {
  cursor: pointer;
}

.delete svg {
  width: 24px;
  height: 24px;
}

.item-report {
  border-radius: 8px;
  background: #f4f4f5;
  padding: 10px;
  text-align: center;
}

.title-group {
  margin: 10px 0;
}

.title-tab {
  font-size: 22px;
  font-weight: 700;
}

.price {
  font-size: 22px;
  font-weight: 700;
}

@media (max-width: 991.98px) {
  .money {
    color: #52525b;
    text-align: right;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  thead {
    display: none;
  }

  tbody tr {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #e4e4e7;
  }

  tbody tr td {
    border: none !important;
  }
}

@media (min-width: 991.98px) {
  .desktop {
    width: 100%;
  }
}

@media (max-width: 425px) {
  .title-tab {
    font-size: 14px;
  }
  .price {
    font-size: 14px;
  }
  .calendar-280 {
    display: none;
  }
}

@media (max-width: 375px) {
  .money,
  tbody {
    font-size: 12px;
  }
  .div-calendar-370 {
    flex-wrap: wrap;
  }
}
</style>

<style>
@media (max-width: 991.98px) {
  .v-table__wrapper {
    height: 100% !important;
    overflow-y: hidden !important;
  }
}
@media (max-width: 425px) {
  .p-calendar {
    margin-bottom: 8px;
    width: 100%;
  }
}
</style>
