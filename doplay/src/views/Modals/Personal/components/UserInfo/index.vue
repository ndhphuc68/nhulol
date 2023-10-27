<script setup>
import {ref} from "vue"
import {convertMoney} from '@/utils/function'

const userInfo = ref({})
</script>
<template>
  <div>
    <v-row :style="{margin : 0}">
      <v-col class="v-col-md-6" cols="12">
        <div class="info-item">
          <div class="d-flex justify-space-between align-center mt-4">
            <h4 class="info-title">{{ $t("mypageinfo") }}</h4>
            <button class="d-flex align-center btn-edit">
              {{ $t('btn-edit') }}
              <img alt="" class="btn-edit-img" src="@/assets/icon/commons/edit.png"/>
            </button>
          </div>
          <div class="details">
            <div class="detail-item">
              <p class="detail-item-title">ID</p>
              <h4 class="detail-item-content">{{ userInfo?.me_account }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("nickname") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_nickname }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("phonenumber") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_phone }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("registinfo") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_join_done }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("connectioniInfo") }}</p>
              <h4 class="detail-item-content">ON</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("dateofregist") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_created }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("registIP") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_join_ip }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("lastaccessdate") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_last_date }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("lastaccessIP") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_last_ip }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("country") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.country }}</h4>
            </div>
          </div>
        </div>
      </v-col>
      <v-col class="v-col-md-6" cols="12">
        <div class="info-item">
          <div class="d-flex justify-space-between align-center mt-4">
            <h4 class="info-title">{{ $t("bankaccountinfo") }}</h4>
            <button class="d-flex align-center btn-edit">
              {{ $t('btn-edit') }}
              <img alt="" class="btn-edit-img" src="@/assets/icon/commons/edit.png"/>
            </button>
          </div>
          <div class="details">
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("bankname") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_bank_name }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("bankaccount") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_bank_account }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("accountholder") }}</p>
              <h4 class="detail-item-content">{{ userInfo?.me_bank_account }}</h4>
            </div>
            <div class="detail-item">
              <p class="detail-item-title">{{ $t("totalbalance") }}</p>
              <h4 class="detail-item-content">{{ convertMoney(userInfo?.me_money) }}</h4>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.detail-item {
  width: 50%;
  margin: 24px 0;
}

.info-item {
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
}

.btn-edit {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #D0D5DD;
  background: #FFF;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
}

.btn-edit img {
  margin-left: 10px;
}
</style>
