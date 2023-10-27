<script setup>
import {defineProps, ref} from "vue";

const props = defineProps({
  index: Number,
  row: Object,
  columns: Object,
  cellClickOnMobile: String,

});

const isViewDetail = ref(false);


const handleClickCell = () => {
  if (window.innerWidth < 769) {
    isViewDetail.value = !isViewDetail.value;
  }
};

</script>

<template>
  <tr class="action-row">
    <td>
      <div class="cell">
        <div class="d-flex justify-center">
          <span class="in-mobile">No.</span>
          <span>{{ index+1 }} </span>
        </div>
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
          }
          ]"
      >
        <div
            :class="{
            actionOnMobile: cellClickOnMobile === key,
          }"
            class="cell"
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
    </template>
  </tr>
</template>

<style scoped lang="scss">
@media (max-width: 375px) {
  .cell {
    font-size: 12px;
  }
}
</style>