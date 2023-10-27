<script setup>
import { computed, defineEmits, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { questionContactRequest } from "@/api/helpCenter/request";

const { t } = useI18n();
const store = useStore();
const description = ref("");
const userInfor = computed(() => store.state.user.userInfor);

const $emits = defineEmits(["handleChangeTab"]);

const handleSubmit = async () => {
  if (description.value) {
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
        $emits("handleChangeTab", 0);
      } else {
        await store.dispatch("showAlert", {
          type: "error",
          message: t("helpCenterError"),
        });
      }
      await store.commit("handleUpdateLoading", false);
    } catch (error) {
      console.log(error);
      await store.commit("handleUpdateLoading", false);
    }
  }
};
</script>

<template>
  <div class="query">
    <div class="warning-box">
      <h4 class="warning-title">{{ $t("helpCenter") }}</h4>
      <p class="warning-content">
        {{ $t("helpCenterContent") }}
      </p>
    </div>
    <div class="query-details">
      <div class="query-item v-row">
        <p class="name v-col-4">{{ $t("name") }}</p>
        <input :value="userInfor?.me_nickname" class="v-col-8" disabled />
      </div>
      <div class="query-item v-row">
        <p class="name v-col-4">{{ $t("cellPhone") }}</p>
        <input :value="userInfor?.me_phone" class="v-col-8" disabled />
      </div>
      <div class="query-item v-row">
        <p class="name v-col-4">{{ $t("description") }}</p>
        <textarea
          maxlength="300"
          v-model="description"
          class="v-col-8"
        ></textarea>
        <!--        <input height="100px" minlength="4"   disabled />-->
      </div>
      <button class="btn-query" @click="handleSubmit">
        {{ $t("btnSend") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.query {
  max-width: 680px;
  width: 100%;
  margin: 10px auto 0;
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

.query-item {
  display: flex;
  /*justify-content: space-between;*/
  align-items: center;
  width: 100%;
  margin: 32px 0;
}

.query-item .name {
  color: var(--text);

  @media (max-width: 414px) {
    font-size: 14px;
  }
}

.query-item input,
textarea {
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  padding: 10px 14px;
  width: 50%;
}

.query-item textarea {
  max-height: 100px;
  height: 100px;
  min-height: 100px;
}

.btn-query {
  display: flex;
  background-color: var(--primaryDoplay);
  color: var(--bg);
  align-items: center;
  padding: 12px 40px;
  border-radius: 4px;
  margin-left: auto;
}

@media (max-width: 1024px) {
  .query-item input {
    /*max-width: 159px;*/
  }
}

@media (max-width: 425px) {
  .query-item {
    margin: 15px 0;
  }
}

@media (max-width: 375px) {
  .warning-content {
    font-size: 12px;
    line-height: 15px;
  }
  .query-item {
    flex-wrap: wrap;
  }

  .query-item .v-col-8,
  .query-item .name {
    width: 100%;
    max-width: 100%;
    flex-basis: 100%;
  }

  .btn-query {
    font-size: 12px;
  }
}
</style>
