<template>
  <div class="deposit-wrapper" v-if="listWithDraw" >
    <div class="card">
      <table class="custom" id="body-table">
        <tr class="table-titles">
          <th v-for="(col, key, index) in columns" :key="index">
            {{ $t(col?.text) }}
          </th>
        </tr>
        <template v-for="(row, index) in displayData" :key="index">
          <RowWithdrawal
            @handleDeleteDeposit="handleDeleteWithdrawal"
            :columns="columns"
            :index="index"
            :row="row"
          />
        </template>
      </table>
      <div class="w-75 m-auto">
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(listWithDraw?.length / itemsPerPage)"
        rounded="0"
        v-if="Math.ceil(listWithDraw?.length / itemsPerPage) > 1"
      ></v-pagination>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { convertMoney, formatDate } from "@/utils";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading";
import RowWithdrawal from "@/views/G2casino/Withdrawals/WithdrawalHistory/RowWithdrawal";

const store = useStore();
const listWithDraw = computed(() => store.state.withdraw.listWithDraw);

const { t } = useI18n();
const columns = {
  no: { text: "#" },
  wi_member_account: {
    text: "withdrawUser",
  },
  wi_status: {
    text: "status",
    callback: (status) => {
      return t(status.wi_status);
    },
  },
  wi_created: {
    text: "dateOfRequest",
    callback: (date) => {
      return formatDate(date.wi_created);
    },
  },
  wi_money: {
    text: "withdrawAmount",
    isMoney: true,
    callback: (amount) => {
      return convertMoney(amount.wi_money);
    },
  },
};

const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listWithDraw?.value.slice(startIndex, endIndex);
});

const handleDeleteWithdrawal = async (idx) => {};

watch(currentPage, () => {
  // let table = document.getElementById("body-table");
  window.scrollTo({ top: 650, behavior: "smooth" });
  // table.scrollTo({ top: 0, behavior: "smooth" });
});

</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.5rem;
}

.card {
  margin: 3rem 1rem;
  @media(max-width: 375px) {
    margin: 0;
  }
}

.deposit-wrapper .pagination {
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
.deposit-wrapper .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}

.deposit-wrapper .page-item {
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
