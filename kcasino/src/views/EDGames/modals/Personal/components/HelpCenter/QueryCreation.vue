<template>
  <div class="deposit">
    <div class="warning-box">
      <h4 class="warning-title">{{ $t("helpCenter") }}</h4>
      <p class="warning-content">
        {{ $t("helpCenterContent") }}
      </p>
    </div>
    <div class="deposit-details">
      <div class="deposit-item v-row">
        <p class="name v-col-4">{{ $t("name") }}</p>
        <input
          class="v-col-8 input-280"
          :value="userInfor?.me_nickname"
          disabled
        />
      </div>
      <div class="deposit-item v-row">
        <p class="name v-col-4">{{ $t("cellPhone") }}</p>
        <input
          class="v-col-8 input-280"
          :value="userInfor?.me_phone"
          disabled
        />
      </div>
      <div class="deposit-item v-row">
        <p class="name v-col-4">{{ $t("description") }}</p>
        <textarea
          maxlength="300"
          class="v-col-8 input-280"
          v-model="description"
        ></textarea>
        <!--        <input height="100px" minlength="4"   disabled />-->
      </div>
      <button class="btn-deposit" @click="handleSubmit">
        {{ $t("btnSend") }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, defineProps } from "vue";
import { useStore } from "vuex";
import { questionContactRequest } from "@/api/helpCenter/request";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const description = ref("");
const userInfor = computed(() => store.state.user.userInfor);
const props = defineProps({
  changeTab: Function,
});

const handleSubmit = async () => {
  if (description.value.trim()) {
    try {
      store.commit("handleUpdateLoading", true);
      const res = await questionContactRequest({
        UserQuestion: description.value,
        memberIdx: userInfor.value.me_idx,
        mInviteCode: userInfor.value.me_invite_code,
        mNickName: userInfor.value.me_nickname,
      });

      if (res?.is_success) {
        await store.dispatch("showAlert", {
          type: "success",
          message: t(res.message),
        });
        await store.dispatch("getListHelpAction", {
          memberIdx: userInfor.value.me_idx,
          inviteCode: userInfor.value.me_invite_code,
          nickName: userInfor.value.nickname,
        });
        props.changeTab(0);
      } else {
        await store.dispatch("showAlert", {
          type: "error",
          message: t("helpCenterError"),
        });
      }
      store.commit("handleUpdateLoading", false);
    } catch (error) {
      console.log(error);
      store.commit("handleUpdateLoading", false);
    }
  }
};
</script>
<style scoped>
.deposit {
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
}

.warning-box {
  text-align: center;
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 24px;
}

.warning-content {
  font-style: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: var(--text-second);
  margin-top: 16px;
}
.warning-title {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  margin-top: 16px;
  color: var(--text);
}

.deposit-item {
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  width: 100%;
  margin: 32px 0;
}

.deposit-item .name {
  color: var(--text);
}

.deposit-item input,
textarea {
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  padding: 10px 14px;
  width: 50%;
}

.deposit-item textarea {
  max-height: 100px;
  height: 100px;
  min-height: 100px;
}

.btn-deposit {
  display: flex;
  background-color: var(--primary);
  color: var(--bg);
  align-items: center;
  padding: 12px 40px;
  border-radius: 4px;
  margin-left: auto;
}

@media (max-width: 425px) {
  .deposit-item {
    margin: 15px 0;
  }
}

@media (max-width: 280px) {
  .warning-content {
    font-size: 12px;
  }
  .deposit-item {
    flex-wrap: wrap;
  }
  .name,
  .input-280 {
    width: 100% !important;
    max-width: 100%;
    flex: 0 0 100%;
  }
}
</style>
