<template>
  <form @submit="handleSubmit">
    <div class="field">
      <div class="title">
        <IconTitle />
        <span>{{ $t("title") }}*</span>
      </div>
      <input
        :value="userInfor.me_nickname"
        disabled
        type="text"
        placeholder="Enter the title"
      />
    </div>
    <div class="field">
      <div class="title">
        <IconContent />
        <span>{{ $t("content") }}*</span>
      </div>
      <textarea
        v-model="description"
        :placeholder="`${t('content')}`"
        maxlength="200"
        rows="4"
        style="min-height: 100px"
      />
    </div>
    <div class="wrap-btn">
      <button
        @click="
          store.commit('handleToggle', 'serviceCenter');
          store.commit('handleActiveSidebar', -1);
        "
      >
        {{ $t("cancel") }}
      </button>
      <button class="submit" type="submit">{{ $t("save") }}</button>
    </div>
  </form>
</template>

<script setup>
import { computed, ref, defineEmits } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import IconTitle from "@/assets/SCCasino/icon/IconTitle.vue";
import IconContent from "@/assets/SCCasino/icon/IconContent.vue";
import { questionContactRequest } from "@/api/helpCenter/request";

const store = useStore();
const { t } = useI18n();

const userInfor = computed(() => store.state.user.userInfor);

const description = ref("");

const $emit = defineEmits(["click"]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (description.value) {
    try {
      await store.commit("handleUpdateLoading", true);
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
        $emit("handleChangeTag", 0);
        description.value = "";
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

<style scoped lang="scss">
.field {
  margin-bottom: 20px;

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      color: var(--black-600, #7a7a7a);
      font-size: 16px;
      font-weight: 600;
      margin-left: 5px;
    }
  }

  input[type="text"] {
    padding: 6px 16px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--neutral-300, #d4d4d8);

    &:disabled {
      background: #e3e3e3;
    }
  }

  textarea {
    padding: 6px 16px;
    width: 100%;
    border-radius: 8px;
    max-height: 300px;
    border: 1px solid var(--neutral-300, #d4d4d8);

    &:hover,
    &:focus {
      outline: none;
    }
  }
}

.wrap-btn {
  width: 100%;
  text-align: right;

  button {
    padding: 10px 30px;
    border-radius: 8px;
    border: 1px solid var(--primarySCCasino);
    color: var(--500, #2196f3);
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s;

    @media (max-width: 375px) {
      padding: 10px;
    }

    &:last-child {
      margin-left: 15px;
    }

    &:hover {
      opacity: 0.8;
      transform: scale(0.9);
      transition: all 0.3s;
    }
  }

  .submit {
    background: var(--primarySCCasino);
    color: #fff;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 7.5px));
    grid-gap: 15px;

    button {
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
