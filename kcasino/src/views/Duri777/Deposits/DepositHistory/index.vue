<template>
    <div class="deposit-wrapper" v-if="listDeposit" id="body-table">
        <div class="card">
            <table class="custom">
                <tr class="table-titles">
                    <th v-for="(col, key, index) in columns" :key="index">
                        {{ col?.text }}
                    </th>
                </tr>
                <template v-for="(row, index) in displayData" :key="index">
                    <RowDepositHistory @handleDeleteDeposit="handleDeleteDeposit" :columns="columns" :index="index"
                                       :row="row"/>
                </template>
            </table>
          <v-pagination
              v-model="currentPage"
              :length="Math.ceil(listDeposit?.length / itemsPerPage)"
              rounded="0"
              v-if="Math.ceil(listDeposit?.length / itemsPerPage) >1"
          ></v-pagination>
        </div>
    </div>
    <div v-else>
        <Loading :size="'50'"/>
    </div>
</template>

<script setup>
import {ref, computed, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {convertMoney, formatDate} from "@/utils";
import {useStore} from 'vuex';
import Loading from "@/components/EDGames/Loading";
import RowDepositHistory from "@/views/Duri777/Deposits/DepositHistory/RowDepositHistory"

const store = useStore()
// const listDeposit = computed(() => store.state.deposit.listDeposit)
const listDeposit = computed(() => store.state.deposit.listDeposit);

const {t} = useI18n()
const columns = computed(() => ({
    no: {text: '#'},
    de_member_account: {
        text: t('depositUser')
    },
    de_status: {
        text: t('status'),
        callback: (status) => {
            return t(status.de_status)
        }
    },
    de_created: {
        text: t('dateOfRequest'),
        callback: (date) => {
            return formatDate(date.de_created)
        }
    },
    de_money: {
        text: t('depositAmount'),
        isMoney: true,
        callback: (amount) => {
            return convertMoney(amount.de_money)
        },
    }
}));

const currentPage = ref(1)
const itemsPerPage = 7;

const displayData = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return listDeposit?.value.slice(startIndex, endIndex)
})

const handleDeleteDeposit = async (idx) => {

};

watch(currentPage, () => {
  window.scrollTo({ top: 650, behavior: "smooth" });
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

