<template>
  <div class="my-info">
    <!-- <div class="title"> -->
    <!-- <h3> {{ $t('bankAccountInfo') }}</h3> -->
    <!-- <button v-if="!editActive" class="btn-edit" @click=" handleEditForm(editActive)">
              Edit
          </button> -->
    <!-- </div> -->
    <form>
      <div class="field">
        <label> {{ $t("bankName") }}</label>
        <input
          :value="userInfor?.me_bank_name && $t(userInfor?.me_bank_name)"
          :disabled="editActive ? false : true"
          type="text"
        />
      </div>
      <div class="field">
        <label> {{ $t("banknumber") }}</label>
        <input
          :value="userInfor?.me_bank_number"
          :disabled="editActive ? false : true"
          type="text"
        />
      </div>
      <div class="field">
        <label> {{ $t("accountHolder") }}</label>
        <input
          :value="userInfor?.me_bank_account"
          :disabled="editActive ? false : true"
          type="text"
        />
      </div>
      <div class="field">
        <label> {{ $t("totalBalance") }}</label>
        <input
          :value="convertMoney(userInfor?.me_money)"
          disabled
          type="text"
        />
      </div>
    </form>
    <div class="btn-save">
      <!-- <button
        v-if="!editActive"
        class="primary-button edit"
        @click="handleEditForm(editActive)"
      >
        <IconEdit /> {{ $t("edit") }}
      </button> -->
      <button
        class="save"
        v-if="editActive"
        type="submit"
        @click="handleSaveForm"
      >
        {{ $t("save") }}
      </button>
      <button
        class="cancel"
        v-if="editActive"
        @click="handleEditForm(editActive)"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
// import IconEdit from "@/assets/SCCasino/icon/IconEdit.vue";
import { convertMoney } from "@/utils/SCCasino";

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
  background: #fff;
  margin: 40px 0;

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
    grid-template-columns: calc(50% - 12px) calc(50% - 12px);
    grid-gap: 24px;
    border: 1px solid var(--neutral-200, #e4e4e7);
    padding: 24px;
    border-radius: 12px;

    .field {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
      text-align: left;

      label {
        color: #a1a1aa;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
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
  }

  .btn-save {
    display: flex;
    margin-top: 30px;
    justify-content: flex-end;

    .cancel,
    .save {
      color: var(--neutral-900, #18181b);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      padding: 12px 24px;
      border-radius: 8px;
      border: 1px solid var(--neutral-200, #e4e4e7);
      transition: all linear 0.2s;

      &:hover,
      &:focus {
        color: #ffffff;
        background: var(--primarySCCasino);
        opacity: 0.8;
        transform: scale(0.98);
        transition: all 0.2s;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
  }

  @media (max-width: 768px) {
    margin: 30px 0;
    form {
      grid-template-columns: 1fr;
      grid-gap: 12px;
      padding: 32px;
    }
  }
}
</style>
