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
        <input :value="userInfor?.me_created" disabled type="text" />
      </div>
      <!--            <div class="field">-->
      <!--                <label>{{ $t('registIp') }}</label>-->
      <!--                <input :value="userInfor?.me_join_ip" disabled type="text"/>-->
      <!--            </div>-->
      <div class="field">
        <label>{{ $t("lastAccessDate") }}</label>
        <input :value="userInfor?.me_last_date" disabled type="text" />
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
</template>

<script setup>
import { computed, ref } from "vue";
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
</script>

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
      color: #000;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .btn-edit {
      padding: 8px 14px;
      border-radius: 8px;
      border: 1px solid #d0d5dd;
      background: #fff;
      box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
    }
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 300px);
    grid-gap: 24px;

    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;

      label {
        color: #a1a1aa;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: left;
      }

      input {
        padding: 8px 12px;
        margin-top: 5px;
        color: var(--neutral-900, #18181b);
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
        border-radius: 4px;
        border: 1px solid var(--neutral-200, #e4e4e7);

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

    form {
      grid-template-columns: calc(50% - 6px) calc(50% - 6px);
      grid-gap: 12px;
    }
  }
}
</style>
