<script setup>
import { computed, defineEmits } from "vue";
import { useStore } from "vuex";
import { convertMoney } from "@/utils";
import EditIcon from "@/assets/Bolton/icons/editIcon.vue";

const store = useStore();
const userInfor = computed(() => store.state.user.userInfor);
defineEmits(["handleChangeTab"]);
</script>

<template>
  <div class="user-main">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="row mb-3">
          <span class="user-title">{{ $t("myPageInfo") }}</span>
        </div>
        <div class="row user-info px-1 py-3 px-sm-4 py-sm-4">
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("id") }}</span>
            <span class="text-start">{{ userInfor?.me_account }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("nickname") }}</span>
            <span class="text-start">{{ userInfor?.me_nickname }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("phoneNumber") }}</span>
            <span class="text-start">{{ userInfor?.me_phone }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("registInfo") }}</span>
            <span class="text-start">{{ userInfor?.me_join_done }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("connectionInfo") }}</span>
            <span class="text-start">ON</span>
          </div>
          <!--          <div class="d-flex flex-column col-6 mb-3 item-user">-->
          <!--            <span class="text-start">{{ $t('registIp') }}</span>-->
          <!--            <span class="text-start">{{ userInfor?.me_join_ip }}</span>-->
          <!--          </div>-->
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("dateOfRegist") }}</span>
            <span class="text-start">{{ userInfor?.me_created }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("lastAccessDate") }}</span>
            <span class="text-start">{{ userInfor?.me_last_date }}</span>
          </div>
          <!--          <div class="d-flex flex-column col-6 mb-3 item-user">-->
          <!--            <span class="text-start">{{$t('lastAccessIp') }}</span>-->
          <!--            <span class="text-start">{{ userInfor?.me_last_ip }}</span>-->
          <!--          </div>-->
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("country") }}</span>
            <span class="text-start">{{ userInfor?.country }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-4 mb-2 mt-lg-0">
        <div class="row mb-3">
          <span class="user-title">{{ $t("bankAccountInfo") }}</span>
        </div>
        <div class="row user-info px-1 py-3 px-sm-4 py-sm-4">
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("bankName") }}</span>
            <span class="text-start">{{ userInfor?.me_bank_name && $t(userInfor?.me_bank_name) }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("banknumber") }}</span>
            <span class="text-start">{{ userInfor?.me_bank_number }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("accountHolder") }}</span>
            <span class="text-start">{{ userInfor?.me_bank_account }}</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">{{ $t("totalBalance") }}</span>
            <span class="text-start"
            >₩ {{ convertMoney(userInfor?.me_money) }}</span
            >
          </div>
        </div>
        <div class="d-flex">
          <button
              class="btn-edit btn-hover"
              @click="$emit('handleChangeTab', 1)"
          >
            <component class="icon-edit" :is="EditIcon" />
            <span> {{ $t("edit") }} </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-main {
  margin-top: 5rem;
  @media (max-width: 991.98px) {
    //height: 800px;
    //overflow-y: scroll;
    margin-top: 2rem;
  }

  .user-info {
    border-radius: 20px;
    background: #fafafa;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);

    .item-user {
      span {
        font-size: 14px;
        font-style: normal;
        line-height: normal;
        @media(max-width: 375px) {
          font-size: 12px;
        }

        &:first-child {
          color: #a1a1aa;
          font-weight: 500;
          margin-bottom: 5px;
        }

        &:last-child {
          color: #3f3f46;
          font-weight: 700;
        }
      }
    }
  }

  .user-title {
    color: var(--light-gradient);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
    margin-left: 10px;
  }

  .btn-edit {
    margin-top: 20px;
    margin-left: auto;
    background-color: var(--primaryFSCasino);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;

    .icon-edit {
      margin-right: 5px;
    }
  }
}
</style>
