<template>
  <tr class="action-row" @click="handleClickRow">
    <td>
      <div class="cell">
        <div class="d-flex justify-center">
          <span class="in-mobile">No.</span>
          <span>{{ index }} </span>
        </div>
        <div class="in-mobile">
          <Action
            :handle-delete="
              () => {
                handleDelete(row);
              }
            "
            :handleViewDetail="handleClickCell"
          />
        </div>
      </div>
    </td>

    <template v-for="(col, key, index) in columns" :key="index">
      <td
        v-if="row[key]"
        :class="[
          {
            complete: row[key] === 'COMPLETE',
            failed: row[key] === 'failed',
            pending: row[key] === 'ACTIVE',
          },
        ]"
      >
        <div
          :class="{
            actionOnMobile: cellClickOnMobile === key,
          }"
          class="cell text-start"
          @click="
            () => {
              if (cellClickOnMobile === key) handleClickCell();
            }
          "
        >
          <div class="in-mobile">
            <span> {{ columns[key]?.text }} </span>
          </div>
          <div class="value">
            <span v-if="columns[key]?.callback">
              {{ columns[key]?.callback(row, row[key]) }}
            </span>
            <span v-else>
              {{ row[key] }}
            </span>
          </div>
        </div>
      </td>
      <td v-if="isViewDetail && cellClickOnMobile === key" class="in-mobile">
        <div class="detail-content text-start">
          <p class="fw-bold">{{ row?.cu_question }}</p>
          <p>{{ row?.cu_answer }}</p>
        </div>
      </td>
    </template>

    <td class="cell-action in-desktop">
      <Action
        :handle-delete="
          () => {
            handleDelete(row);
          }
        "
        :handleViewDetail="handleClickRow"
      />
    </td>
  </tr>
  <tr v-if="isViewDetail" class="in-desktop">
    <td :colspan="Object.keys(columns).length" class="text-start">
      <p class="fw-bold">{{ row?.cu_question }}</p>
      <p>{{ row?.cu_answer }}</p>
    </td>
  </tr>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
import Action from "@/components/Duri/Action/index.vue";

const $emits = defineEmits(["handleDeleteHelpCenter"]);

defineProps({
  index: Number,
  row: Object,
  columns: Object,
  cellClickOnMobile: String,
  detailKey: String,
});

const isViewDetail = ref(false);

const handleClickRow = () => {
  if (window.innerWidth >= 769) {
    isViewDetail.value = !isViewDetail.value;
  }
};

const handleClickCell = () => {
  if (window.innerWidth < 769) {
    isViewDetail.value = !isViewDetail.value;
  }
};

const handleDelete = (row) => {
  $emits("handleDeleteHelpCenter", row.cu_idx);
};
</script>

<style scoped lang="scss">
@media (min-width: 769px) {
  .action-row {
    cursor: pointer;

    &:hover {
      transform: scale(0.98);
      transition: transform linear 0.2s;
    }
  }
}

@media (max-width: 768px) {
  .cell.actionOnMobile {
    cursor: pointer;

    &:hover {
      transform: scale(0.98);
      transition: transform linear 0.2s;
    }
  }
}
@media (max-width: 375px) {
  .cell {
    font-size: 12px;
  }
}
</style>
