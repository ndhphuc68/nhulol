<template>
  <div class="deposit-wrapper" v-if="listwithdrawla">
    <div class="card">
      <table class="custom">
        <tr class="table-titles">
          <th v-for="(col, key, index) in columns" :key="index">
            {{ col?.text }}
          </th>
        </tr>
        <template v-for="(row, index) in displayData" :key="index">
          <RowWithdrawal @handleDeleteDeposit="handleDeleteWithdrawal" :columns="columns" :index="index"
                             :row="row" />
        </template>
      </table>
      <v-pagination
          v-model="currentPage"
          :length="Math.ceil(listwithdrawla?.length/itemsPerPage)"
          rounded="0"
          prev-icon="<-"
          next-icon="->"
      ></v-pagination>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'"/>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useI18n} from 'vue-i18n';
import {convertMoney, formatDate} from "@/utils";
import {useStore} from 'vuex';
import RowWithdrawal from "@/views/G2casino/Withdrawals/WithdrawalHistory/RowWithdrawal"

const store = useStore()
// const listwithdrawla = computed(() => store.state.deposit.listwithdrawla)
const listwithdrawla = ref([
  {
    de_member_account: 'Casino',
    de_status: 'Pending',
    de_created:"2023-06-27 08:37:16",
    de_money: 13000,

  },
  {
    de_member_account: 'Bomb Runner',
    de_status: 'Failed',
    de_created:"2023-06-27 08:37:16",
    de_money: 12000,
  },
  {
    de_member_account: 'TukTuk',
    de_status: 'Complete',
    de_created:"2023-06-27 08:37:16",
    de_money: 22000,
  },
  {
    de_member_account: 'Golden Unicorn',
    de_status: 'Pending',
    de_created:"2023-06-27 08:37:16",
    de_money: 32000,
  }
]);

const {t} = useI18n()
const columns = {
  no: {text: '#'},
  de_member_account: {
    text: t('depositUser')
  },
  de_status: {
    text: t('status'),
  },
  de_created: {
    text: t('dateOfRequest'),
    callback: (date) => {
      return formatDate(date, 'LL')
    }
  },
  de_money: {
    text: t('depositAmount'),
    isMoney: true,
    callback: (amount) => {
      return convertMoney(amount.de_money)
    },
  },
}

const currentPage = ref(1)
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return listwithdrawla?.value.slice(startIndex, endIndex)
})

const handleDeleteWithdrawal = async (idx) => {

};


</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.5rem;
}

.card {
  margin: 3rem 1rem;
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
      background: #E9EDFC;
      border-radius: 8px;
      border: unset;
      color: var(--text);
    }
  }

  .page-link {
    background: #FAFAFA;
    border-radius: 8px;
  }
}

</style>

