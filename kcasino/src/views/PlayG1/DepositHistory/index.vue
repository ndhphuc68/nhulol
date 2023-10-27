<template>
  <div class="deposit-wrapper" v-if="listDeposit">
    <h2>{{ $t("depositHistory") }}</h2>
    <EmptyData v-if="listDeposit?.length === 0" />
    <div class="card" v-else>
      <table class="custom">
        <tr class="table-titles">
          <th v-for="(col, key, index) in columns" :key="index">
            {{ $t(col?.text) }}
          </th>
        </tr>

        <tr v-for="(row, index) in displayData" :key="index">
          <td>
            <div class="cell">
              <div class="d-flex justify-center">
                <span class="in-mobile">No.</span>
                <span>{{ index + 1 }} </span>
              </div>
              <!--                            <div class="in-mobile">-->
              <!--                                <Action :handle-delete="()=>{}" :handleViewDetail="()=>{}" :isDelete="false"/>-->
              <!--                            </div>-->
            </div>
          </td>
          <template v-for="(col, key, index) in columns" :key="index">
            <td
              v-if="row[key]"
              :class="[
                {
                  complete: row[key] === 'COMPLETED',
                  failed: row[key] === 'ADMIN_CANCEL',
                  pending: row[key] === 'REQUEST',
                },
              ]"
            >
              <div class="cell text-start">
                <div class="in-mobile">
                  <span>{{ $t(columns[key]?.text) }}</span>
                </div>
                <div class="value">
                  <span v-if="columns[key]?.isMoney"> ₮ </span>
                  <span v-if="columns[key]?.callback">
                    {{ columns[key]?.callback(row[key]) }}
                  </span>
                  <span v-else>
                    {{ row[key] }}
                  </span>
                </div>
              </div>
            </td>
          </template>
        </tr>
      </table>
      <div class="wrapper-pagination">
        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(listDeposit?.length / itemsPerPage)"
          rounded="0"
        ></v-pagination>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading :size="'50'" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { convertMoney, converTime } from "@/utils";
import { useStore } from "vuex";
import {useRouter} from "vue-router";
import Loading from "@/components/EDGames/Loading";
import EmptyData from "@/components/PlayG1/EmptyData";

const store = useStore();
const router = useRouter()
const listDeposit = computed(() => store.state.deposit.listDeposit);
const transaction = computed(() => store.getters.getTransaction)

const { t } = useI18n();
const columns = {
  no: { text: "#" },
  de_member_account: {
    text: "depositUser",
  },
  de_money: {
    text: "depositAmount",
    isMoney: true,
    callback: (amount) => {
      return convertMoney(amount);
    },
  },
  de_status: {
    text: "status",
    callback: (status) => {
      return t(status);
    },
  },
  de_created: {
    text: "dateOfRequest",
    callback: (date) => {
      return converTime(date);
    },
  },
};

const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listDeposit?.value.slice(startIndex, endIndex);
});

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

onMounted(()=> {
  transaction.value === "YES" && router.push('/')
})
</script>

<style lang="scss" scoped>
h2 {
  font-size: 1.5rem;
}

.card {
  padding: 32px 0;
  margin-top: 32px;
}
.wrapper-pagination {
  width: 80%;
  margin: auto;
}

.deposit-wrapper .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}
@media (max-width: 768px) {
  .card {
    border: unset;
    margin-top: 0;
    padding: 16px 0;
  }
}
@media (max-width: 375px) {
  .cell {
    font-size: 12px;
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
