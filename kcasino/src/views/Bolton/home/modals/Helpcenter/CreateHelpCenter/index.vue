<script setup>
import {handleCloseModal} from "@/utils";
import {Icons} from "@/const/Icons";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {questionContactRequest} from "@/api/helpCenter/request";

const {t} = useI18n()
const store = useStore()

const description = ref('')
const userInfor = computed(() => store.state.user.userInfor)
const handleSubmit = async () => {
  if (description.value) {
    try {
      await store.commit("handleUpdateLoading", true);
      const res = await questionContactRequest({
        UserQuestion: description.value,
        memberIdx: userInfor.value.me_idx,
        mInviteCode: userInfor.value.me_invite_code,
        mNickName: userInfor.value.me_nickname
      })

      if (res?.is_success) {
        await store.dispatch('showAlert', {
          type: 'success',
          message: t(res.message)
        })
        await store.dispatch('getListHelpAction', {
          memberIdx: userInfor.value.me_idx,
          inviteCode: userInfor.value.me_invite_code,
          nickName: userInfor.value.nickname
        })
        handleCloseModal('createHelp');
        handleCloseModal('helpCenter');
      } else {
        await store.dispatch('showAlert', {
          type: 'error',
          message: t('helpCenterError')
        })
      }
      await store.commit("handleUpdateLoading", false);
    } catch (error) {
      console.log(error)
      await store.commit("handleUpdateLoading", false);
    }
  }
}
</script>

<template>
  <div class="create-main mt-3">
    <div class="row back-row">
      <div
          @click="
          handleCloseModal('createHelp');
          handleCloseModal('helpCenter');
        "
          class="d-flex flex-row align-items-center back"
      >
        <img :src="Icons.back" alt="back"/>
        <span class="ms-2">{{ $t('back') }}</span>
      </div>
    </div>
    <div class="row create-body">
      <span class="text-start">{{ $t("queryDetails") }}</span>
      <div class="d-flex flex-column mt-4">
        <div class="d-flex flex-row">
          <img :src="Icons.grid" alt=""/>
          <span>&nbsp;{{ $t('name') }}*</span>
        </div>
        <input disabled :value="userInfor.me_nickname" class="form-control" type="text"/>
      </div>
      <div class="d-flex flex-column mt-4">
        <div class="d-flex flex-row">
          <img :src="Icons.gridNine" alt=""/>
          <span>&nbsp;{{ $t('description') }}*</span>
        </div>
        <textarea maxlength="300" v-model="description" rows="7" class="form-control" type="text"/>
      </div>
      <div class="row create-file">
        <!--        <div class="d-flex flex-column justify-content-start mt-3">-->
        <!--          <button>-->
        <!--            <img :src="Icons.paperclip" alt="" />&nbsp;Attatched file-->
        <!--          </button>-->
        <!--          <span class="text-start ms-3"-->
        <!--            >Allowed files: .jpeg, .gif, .jpg, .doc, .pdf</span-->
        <!--          >-->
        <!--        </div>-->
      </div>
      <div class="d-flex mt-4 flex-row justify-content-end btn-create">
        <button @click="
          handleCloseModal('createHelp');
          handleCloseModal('helpCenter');
        " class="me-3">{{ $t('cancel') }}
        </button>
        <button @click="handleSubmit">{{ $t('send') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-main {
  padding: 2rem;
  @media(max-width: 375px) {
    padding: 0.3rem;
  }
  .back-row {
    .back {
      width: fit-content;
      cursor: pointer;
    }

    img {
      width: 30px;
      height: 30px;
    }

    span {
      color: #de6777;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .create-body {
    margin-top: 45px;

    textarea {
      height: 250px;
      resize: none;

      @media(max-width: 375px) {
        font-size: 12px;
        height: 250px;
      }
    }

    span {
      &:first-child {
        color: var(--light-gradient);
        font-size: 22px;
      }

      color: #7a7a7a;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    img {
      width: 20px;
      height: 20px;
    }

    .create-file {
      button {
        margin-left: 10px;
        width: 200px;
        padding: 0 16px;
        border-radius: 20px;
        border: 1px solid #ccc;
        background: #e3e3e3;

        img {
          width: 32px;
          height: 32px;
        }
      }
    }

    .btn-create {
      button {
        padding: 10px 0;
        width: 150px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        &:last-child {
          color: #fafafa;
          border-radius: 20px;
          border: 1px solid #e4e4e7;
          background: var(--light-gradient);
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
        }

        &:first-child {
          color: var(--red);
          border-radius: 20px;
          border: 1px solid var(--light-red, #f1c0c7);
        }
      }
    }
  }
}
</style>
