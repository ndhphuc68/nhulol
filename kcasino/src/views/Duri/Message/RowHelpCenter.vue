<template>
  <tr class="action-row" @click="handleClickRow(row)">
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
            :handleViewDetail="
              () => {
                handleClickCell(row);
              }
            "
          />
        </div>
      </div>
    </td>

    <template v-for="(col, key, index) in columns" :key="index">
      <td
        v-if="key === 'mm_read_date'"
        :class="[
          {
            complete: row[key] > 0,
            failed: row[key] == 0,
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
            <span>
              {{ row[key] > 0 ? $t("check_mess") : $t("not_mess") }}
            </span>
          </div>
        </div>
      </td>
      <td
        v-else-if="row[key]"
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
          <p class="fw-bold">{{ row?.mm_subject }}</p>
          <p>{{ row?.mm_content }}</p>
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
      <p class="fw-bold">{{ row?.mm_subject }}</p>
      <p>{{ row?.mm_content }}</p>
    </td>
  </tr>
</template>

<script setup>
import { defineProps, ref, defineEmits, computed } from "vue";
import Action from "@/components/Duri/Action/index.vue";
import { useStore } from "vuex";

const store = useStore();

const $emits = defineEmits(["handleDeleteHelpCenter"]);

const userInfor = computed(() => store.state.user.userInfor);

defineProps({
  index: Number,
  row: Object,
  columns: Object,
  cellClickOnMobile: String,
  detailKey: String,
});

const isViewDetail = ref(false);

const handleClickRow = async (val) => {
  if (val.mm_read_date === 0) {
    let data = {
      memberIdx: userInfor.value.me_idx,
      mInviteCode: userInfor.value.me_invite_code,
      mNickName: userInfor.value.me_nickname,
    };

    await store.dispatch("readMessageAction", { idx: val.mm_idx, data });
  }
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
  $emits("handleDeleteHelpCenter", row.mm_idx);
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
