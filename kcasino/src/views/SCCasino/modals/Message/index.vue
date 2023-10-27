<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { formatDate } from "@/utils/SCCasino";

import RowMessage from "./RowMessage.vue";
import { useStore } from "vuex";

import EmptyData from "@/components/SCCasino/EmptyData";

const { t } = useI18n();
const store = useStore();

const listMessage = computed(() => store.state.message.listMessage);

const columns = {
  no: {
    text: "no.",
  },
  mm_read_date: {
    text: t("status"),
    isStatus: true,
  },
  mm_subject: {
    text: t("subject"),
  },

  mm_created: {
    text: t("date"),
    callback: (date) => {
      return formatDate(date, "LL");
    },
  },
  action: {
    text: t("action"),
  },
};

const currentPage = ref(1);
const itemsPerPage = 7;

const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listMessage?.value.slice(startIndex, endIndex);
});

// const handleDeleteDeposit = async (idx) => {};
</script>

<template>
  <div class="message" v-if="listMessage">
    <div class="card">
      <table class="custom">
        <tr class="table-titles">
          <th v-for="(col, key, index) in columns" :key="index">
            {{ col?.text }}
          </th>
        </tr>
        <template v-for="(row, index) in displayData" :key="index">
          <RowMessage
            detailKey="mm_content"
            cellClickOnMobile="mm_subject"
            :columns="columns"
            :index="index + 1"
            :row="row"
          />
        </template>
      </table>
      <EmptyData v-if="displayData.length === 0" />
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(listMessage?.length / itemsPerPage)"
        rounded="0"
        prev-icon="<-"
        next-icon="->"
      ></v-pagination>
    </div>
  </div>
  <!--    <div v-else>-->
  <!--        <Loading :size="'50'"/>-->
  <!--    </div>-->
</template>

<style lang="scss" scoped>
.message {
  padding: 0;

  th {
    background-color: #e3e3e3;
    color: var(--textSCCasino);
  }
}

h2 {
  font-size: 1.5rem;
}

.card {
  margin: 3rem 0;
}

.message .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .message {
    height: auto;
    max-height: 100%;
    margin-bottom: 50px;
  }
  .card {
    border: unset;
  }
}
</style>
<style lang="scss">
.message .pagination {
  margin: 30px 20px 0;
  display: flex;
  justify-content: space-between;
}

.message .page-item {
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
