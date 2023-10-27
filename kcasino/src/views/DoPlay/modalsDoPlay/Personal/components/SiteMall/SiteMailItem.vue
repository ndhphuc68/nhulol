<template>
  <article class="wrapper-desktop">
    <div
      class="top"
      @click="
        handleShowContent(props.message?.mm_idx, props.message?.mm_read_date)
      "
    >
      <div v-if="props.message?.mm_read_date !== 0" class="status">
        <img src="@/assets/icon/have-read.png" height="21" width="20" />
        <span class="read">{{ $t("check_yes") }}</span>
      </div>
      <div v-else class="status">
        <img src="@/assets/icon/un-read.png" height="21" width="20" />
        <span class="read">{{ $t("check_no") }}</span>
      </div>
      <div class="writer"></div>
      <div class="subject">{{ message.mm_subject }}</div>
      <div class="date">{{ converTime(message.mm_created) }}</div>
    </div>
    <div
      class="content"
      :style="{ display: showDetail ? 'block' : 'none' }"
      v-html="message?.mm_content"
    ></div>
  </article>
  <article class="wrapper-mobile">
    <div
      class="top"
      @click="
        handleShowContent(props.message?.mm_idx, props.message?.mm_read_date)
      "
    >
      <div v-if="props.message?.mm_read_date !== 0" class="status">
        <img src="@/assets/icon/have-read.png" height="21" width="20" />
      </div>
      <div v-else class="status">
        <img src="@/assets/icon/un-read.png" height="21" width="20" />
      </div>
      <div class="subject">
        {{ message.mm_subject }}
      </div>
      <div>
        <div>{{ converTime(message.mm_created) }}</div>
        <div>by Writer</div>
      </div>
    </div>
    <div
      :style="{ display: showDetail ? 'block' : 'none' }"
      v-html="message?.mm_content"
      class="content"
    ></div>
  </article>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { converTime } from "@/utils";
import { useStore } from "vuex";

const userInfor = computed(() => store.state.user.userInfor);
const store = useStore();
const showDetail = ref(
  computed(() => {
    return props.idx === store.state.notice.idxActiveContent;
  }).value
);

const props = defineProps({
  idx: Number,
  message: Object,
});

const handleShowContent = async (idx, date) => {
  if (date === 0) {
    let data = {
      memberIdx: userInfor.value.me_idx,
      mInviteCode: userInfor.value.me_invite_code,
      mNickName: userInfor.value.me_nickname,
    };
    await store.dispatch("readMessageAction", { idx, data });
  }
  showDetail.value = !showDetail.value;
};
</script>

<style scoped lang="scss">
.wrapper-desktop {
  text-align: center;
  border-bottom: 1px solid #d4d4d8;
  .top {
    display: grid;
    grid-template-columns: 15% 15% 40% 30%;
    padding: 1rem 5px;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: #f4f4f5;
    }
    .status {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .subject {
    font-weight: 600;
  }
  .content {
    padding: 0.5rem 1rem;
    text-align: left;
    background: #fafafa;
  }
  .date {
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
}
.wrapper-mobile {
  display: none;
  border: 1px solid #e4e4e7;
  background: #fafafa;
  border-radius: 6px;
  margin-top: 1rem;
  @media (max-width: 768px) {
    display: block;
    .top {
      display: grid;
      grid-template-columns: 10% 50% 40%;
      text-align: center;
      align-items: center;
      padding: 1rem 5px;
    }
    .subject {
      font-weight: 600;
    }
    .content {
      background: #fafafa;
      color: #a1a1aa;
      padding: 5px;
      border-top: 1px solid #e4e4e7;
      font-size: 14px;
      font-weight: 500;
      @media (max-width: 375px) {
        font-size: 12px;
      }
    }
  }
  @media (max-width: 375px) {
    font-size: 12px;
  }
}
</style>
