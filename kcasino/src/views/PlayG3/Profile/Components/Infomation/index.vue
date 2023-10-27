<script setup>
import BankInformation from "./BankInfomation";

import { computed, defineEmits, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userInfor = computed(() => store.state.user.userInfor);

const editActive = ref(false);

const handleEditForm = (active) => {
  editActive.value = !active;
};

const handleSaveForm = (e) => {
  e.preventDefault();
};

defineEmits(["handleChangeTab"]);
</script>

<template>
  <div class="my-info">
    <div class="title">
      <h3>{{ $t("myPageInfo") }}</h3>
      <!-- <button v-if="!editActive" class="btn-edit" @click=" handleEditForm(editActive)">
                      Edit
                  </button> -->
    </div>
    <form>
      <div class="field">
        <label>{{ $t("id") }}</label>
        <input
          :value="userInfor?.me_account"
          :disabled="!editActive"
          type="text"
        />
      </div>
      <div class="field">
        <label>{{ $t("nickName") }}</label>
        <input
          :value="userInfor?.me_nickname"
          :disabled="!editActive"
          type="text"
        />
      </div>
      <div class="field">
        <label>{{ $t("phoneNumber") }}</label>
        <input
          :value="userInfor?.me_phone"
          :disabled="!editActive"
          type="text"
        />
      </div>
      <div class="field">
        <label>{{ $t("registInfo") }}</label>
        <input :value="userInfor?.me_join_done" disabled type="text" />
      </div>
      <div class="field">
        <label>{{ $t("connectionInfo") }}</label>
        <input value="ON" disabled type="text" />
      </div>
      <div class="field">
        <label>{{ $t("dateOfRegist") }}</label>
        <!--        <input :value="userInfor?.me_created" disabled type="text" />-->
        <div>{{ userInfor?.me_created }}</div>
      </div>
      <!--            <div class="field">-->
      <!--                <label>{{ $t('registIp') }}</label>-->
      <!--                <input :value="userInfor?.me_join_ip" disabled type="text"/>-->
      <!--            </div>-->
      <div class="field">
        <label>{{ $t("lastAccessDate") }}</label>
        <!--        <input :value="userInfor?.me_last_date" disabled type="text" />-->
        <div>{{ userInfor?.me_last_date }}</div>
      </div>
      <!--            <div class="field">-->
      <!--                <label>{{ $t('lastAccessIp') }}</label>-->
      <!--                <input :value="userInfor?.me_last_ip" disabled type="text"/>-->
      <!--            </div>-->
      <div class="field">
        <label>{{ $t("country") }}</label>
        <input :value="userInfor?.country" disabled type="text" />
      </div>
      <div class="btn-save">
        <button v-if="editActive" type="submit" @click="handleSaveForm">
          {{ $t("save") }}
        </button>
        <button v-if="editActive" @click="handleEditForm(editActive)">
          {{ $t("cancel") }}
        </button>
      </div>
    </form>
  </div>
  <div class="line"></div>
  <BankInformation />
  <div class="d-flex justify-center">
    <button class="btn-edit btn-contained" @click="$emit('handleChangeTab', 1)">
      {{ $t("edit") }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.my-info {
  max-width: 1440px;
  width: 80%;
  margin: 50px auto 0;
  padding: 24px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    h3 {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
    }
  }

  form {
    display: flex;
    flex-wrap: wrap;

    @media (max-width: 375px) {
      justify-content: space-between;
    }

    .field {
      width: 20%;
      display: flex;
      flex-direction: column;
      margin: 16px 0;

      @media (max-width: 1200px) {
        width: 50%;
      }

      @media (max-width: 375px) {
        width: calc(100% / 2 - 5px);
      }
      label {
        color: #a1a1aa;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: left;

        @media (max-width: 375px) {
          font-size: 12px;
        }
      }

      input,
      div {
        border: none;
        padding: 8px 0px;
        margin-top: 5px;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;

        @media (max-width: 600px) {
          font-size: 12px;
        }

        &:disabled {
          border: none;
          padding: 8px 0px;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .btn-save {
      display: flex;

      button {
        color: var(--neutral-900, #18181b);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        padding: 12px 24px;
        border-radius: 8px;
        border: 1px solid var(--neutral-200, #e4e4e7);

        &:hover,
        &:focus {
          background: #254ee0;
          color: #ffffff;
        }

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 16px;
    margin: 25px auto 0;
  }
}
.btn-edit {
  padding: 12px 35px;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
}
.line {
  width: 100%;
  height: 1px;
  background: rgba(82, 82, 91, 1);
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .line {
    margin-bottom: 24px;
  }
}
</style>
