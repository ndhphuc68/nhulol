<template>
  <div class="my-info">
    <!-- <div class="title"> -->
    <!-- <h3>{{ $t("myPageInfo") }}</h3> -->
    <!-- <button v-if="!editActive" class="btn-edit" @click=" handleEditForm(editActive)">
              Edit
          </button> -->
    <!-- </div> -->
    <form>
      <div class="field">
        <label>{{ $t("id") }}</label>
        <input
          :value="userInfor?.me_account"
          :disabled="editActive ? false : true"
          type="text"
        />
      </div>
      <div class="field">
        <label>{{ $t("nickName") }}</label>
        <input
          :value="userInfor?.me_nickname"
          :disabled="editActive ? false : true"
          type="text"
        />
      </div>
      <div class="field">
        <label>{{ $t("phoneNumber") }}</label>
        <input
          :value="userInfor?.me_phone"
          :disabled="editActive ? false : true"
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
    </form>
    <div class="btn-save">
      <!-- <button
        v-if="!editActive"
        class="primary-button edit"
        @click="handleEditForm(editActive)"
      >
        <IconEdit />{{ $t("edit") }}
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
import { ref } from "vue";
// import { useStore } from "vuex";
import IconEdit from "@/assets/SCCasino/icon/IconEdit.vue";

// const store = useStore();
// const userInfor = computed(() => store.state.user.userInfor);
const userInfor = {
  me_account: "123123",
  me_nickname: "test",
  me_phone: 12312375717,
  me_join_done: "ON",
  me_created: "2023/02/08  06:27:31",
  me_last_date: "2023/02/08  06:27:31",
  country: "vietnam",
};

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

      label {
        color: #a1a1aa;
        font-size: 14px;
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
  }

  .btn-save {
    display: flex;
    margin-top: 30px;
    justify-content: end;

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
    margin: 30px 0 100px;
    form {
      grid-template-columns: 1fr;
      grid-gap: 12px;
      padding: 32px;
    }

    .edit {
      width: 100%;
    }

    .save,
    .cancel {
      width: 50%;
    }
  }
}
</style>
