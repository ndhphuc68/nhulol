<template>
  <div class="confirmWrap2">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <img src="" alt="logo"/>
      </div>
    </div>
    <div class="confirmFormWrap">
      <div class="confirmInnerFormWrap">
        <div class="confirmWarning" style="font-size: 18px; margin-top: 20px;">
          {{ t(confirmText) }}
        </div>
        <div class="buttonWrap" style="margin-top: 30px;">
          <button v-if="buttonStatus == buttonStatusType[1] || buttonStatus == buttonStatusType[2]" @click="clickConfirm()">{{ t('confirm') }}</button>
          <button v-if="buttonStatus == buttonStatusType[1]" @click="toggleShow('confirm');">{{ t('cancel') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleShow} from "@/utils/modals";
import { useI18n } from 'vue-i18n';
import {notify} from "@kyvg/vue3-notification";
import {fn as listFn} from "@/views/list/list";
import {computed, onMounted, ref} from "vue";
const { t } = useI18n();

const buttonStatusType = ['NO_BUTTON', 'OK_CANCEL', 'OK'];

const buttonStatus = ref(buttonStatusType[0]);

const props = defineProps({
  payload: {
    type: Object,
    default: () => {
      return {}
    }
  }
});

const confirmText = ref('');

onMounted(() => {
  switch (props.payload.value.key)
  {
    case 'delete':
    {
      confirmText.value = 'confirm_delete';
      buttonStatus.value = buttonStatusType[1];
    }
  }
});

const clickConfirm = async () => {
  if(props.payload.value.key == 'delete')
  {
    if(buttonStatus.value == buttonStatusType[1])
    {
      confirmText.value = 'delete_process';
      buttonStatus.value = buttonStatusType[0];
      let res = await listFn.confirmDeleteRow(props.payload.value.flag, props.payload.value.data);
      if(res.is_success == true)
      {
        confirmText.value = 'delete_complete';
      }
      else
      {
        let errMessage;
        if(res?.error_code == '-10000008')
        {
          errMessage = 'processNoDelete';
        }
        else if(res?.ErrorCode == '-200002')
        {
          errMessage = 'processNoDelete_Note';
        }
        else
        {
          errMessage = 'processFailDelete';
        }

        confirmText.value = errMessage;
      }
      buttonStatus.value = buttonStatusType[2];
    }
    else if(buttonStatus.value == buttonStatusType[2])
    {
      toggleShow('confirm');
    }
  }
}

</script>
<style>
.confirmWrap2 .logoWrap {
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_box.png");
  background-size: 100% 100%;
}
.confirmWrap2 .logoInnerWrap {
  width: calc(100% - 2px);
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_innerbox.png");
  background-size: 100% 100%;
}
.confirmWrap2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.confirmWrap2 .confirmFormWrap {
  display: flex;
  width: 100%;
  height: calc(100% - 68px);
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/loginpopup/login_box.png");
  background-size: 100% 100%;
}
.confirmWrap2  .confirmInnerFormWrap {
  display: flex;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-image: url("../../assets/loginpopup/login_innerbox.png");
  background-size: 100% 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.confirmInnerFormWrap .confirmWarning{
  width: 90%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.confirmInnerFormWrap .buttonWrap{
  margin-top: auto;
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-around;
}

.confirmInnerFormWrap .buttonWrap button{
  background-image: url("../../assets/box/blueInputBox2.png");
  width: 180px;
  height: 40px;
  font-size: 14px;
  color: #eaf1fb;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}

@media (max-width: 1024px) {
  .confirmWrap2 .logoWrap {
    width: 100%;
    height: 68px;
  }
  .confirmWrap2 .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .confirmWrap2 .confirmFormWrap {
    width: 100%;
    height: calc(100% - 68px);
  }
  .confirmWrap2 .confirmInnerFormWrap {
    width: calc(100% - 2px);
    height:calc(100% - 2px);
  }

  .confirmInnerFormWrap .buttonWrap button{
    background-image: url("../../assets/box/blueInputBox2.png");
    width: 150px;
    height: 40px;
    font-size: 14px;
    color: #eaf1fb;
  }

  .confirmWrap2 .confirmInnerFormWrap div div{
    min-width: unset;
    width: calc(100% - 2px);
  }
}
</style>