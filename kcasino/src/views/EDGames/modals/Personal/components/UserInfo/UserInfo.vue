<script setup>
import { useStore } from "vuex";
import { computed, defineEmits } from "vue";
import { convertMoney } from "@/utils";

const store = useStore();
const userInfor = computed(() => store.state.user.userInfor).value;
defineEmits(["handleChangeTab"]);
</script>

<template>
  <div class="user-info v-row">
    <div class="v-col-12 v-col-md-6">
      <div class="info-item">
        <div class="d-flex justify-space-between align-center mt-4">
          <h4 class="info-title">{{ $t("mypageinfo") }}</h4>
          <!--          <button class="d-flex align-center btn-edit">-->
          <!--            {{ $t('btn-edit') }}-->
          <!--            <img class="btn-edit-img" alt="" src="@/assets/icon/edit.png"/>-->
          <!--          </button>-->
        </div>
        <div class="details">
          <div class="detail-item">
            <p class="detail-item-title">ID</p>
            <h4 class="detail-item-content">{{ userInfor?.me_account }}</h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("nickname") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.me_nickname }}</h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("phonenumber") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.me_phone }}</h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("registinfo") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.me_join_done }}</h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("connectioniInfo") }}</p>
            <h4 class="detail-item-content">ON</h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("dateofregist") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.me_created }}</h4>
          </div>
          <!--          <div class="detail-item">
                                <p class="detail-item-title">{{ $t("registIP") }}</p>
                                <h4 class="detail-item-content">{{ userInfor?.me_join_ip }}</h4>
                              </div>-->
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("lastaccessdate") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.me_last_date }}</h4>
          </div>
          <!--          <div class="detail-item">
                                <p class="detail-item-title">{{ $t("lastaccessIP") }}</p>
                                <h4 class="detail-item-content">{{ userInfor?.me_last_ip }}</h4>
                              </div>-->
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("country") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.country }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="v-col-12 v-col-md-6">
      <div class="info-item">
        <div class="d-flex justify-space-between align-center mt-4">
          <h4 class="info-title">{{ $t("bankaccountinfo") }}</h4>
          <!--          <button class="d-flex align-center btn-edit">-->
          <!--            {{ $t('btn-edit') }}-->
          <!--            <img class="btn-edit-img" alt="" src="@/assets/icon/edit.png"/>-->
          <!--          </button>-->
        </div>
        <div class="details">
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("bankname") }}</p>
            <h4 class="detail-item-content">
              {{ userInfor?.me_bank_name && $t(userInfor?.me_bank_name) }}
            </h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("banknumber") }}</p>
            <h4 class="detail-item-content">{{ userInfor?.me_bank_number }}</h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("accountholder") }}</p>
            <h4 class="detail-item-content">
              {{ userInfor?.me_bank_account }}
            </h4>
          </div>
          <div class="detail-item">
            <p class="detail-item-title">{{ $t("totalbalance") }}</p>
            <h4 class="detail-item-content">
              {{ convertMoney(userInfor?.me_money) }}
            </h4>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-hover btn-edit" @click="$emit('handleChangeTab', 1)">
      {{ $t("edit") }}
    </button>
  </div>
</template>

<style scoped>
.user-info {
  /*margin: 0 16px;*/
  /*display: flex;*/
  /*justify-content: center;*/
  width: 100%;
  padding-bottom: 20px;
}

.info-title {
  color: var(--text);
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
}

.details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

.detail-item {
  margin: 24px 0;
}

.info-item {
  /*width: 50%;*/
  border: 1px solid #e4e4e7;
  border-radius: 12px;
  padding: 0 12px;
  margin: 0 12px;
}

.detail-item-title {
  font-size: 14px;
  line-height: 19px;
  color: var(--text-second);
}

.detail-item-content {
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: var(--text);
  margin-top: 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  min-height: 38px;
  overflow: hidden;
  -webkit-line-clamp: 2;
}

.btn-edit {
  padding: 8px 30px;
  border-radius: 8px;
  color: #fff;
  border: 1px solid #d0d5dd;
  background: var(--primary);
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .user-info {
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }

  .info-item {
    width: 100%;
    margin: 12px 0;
  }
}

@media (max-width: 375px) {
  .details {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 0px;
  }
  .detail-item {
    margin: 5px 0;
  }
}
</style>
