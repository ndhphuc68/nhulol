<template>
  <div class="confirmPassWrap">
    <div class="logoWrap">
      <div class="logoInnerWrap">
        <img :src="themeUtils.getLogoImage()" style="height: 80%; cursor: pointer;"
             @click="themeUtils.refresh()"/>
      </div>
    </div>
    <div class="confirmFormWrap">
      <div class="confirmInnerFormWrap">
        <div>
          <div>{{ t('withdrawPassword') }}</div>
          <div class="InputWrap2" >
            <div class="InputInnerWrap2" stype="margin-top: 10px;" >
              <input v-model="wpText" :placeholder="t('withdrawPassword')" type="password"/>
            </div>
          </div>
        </div>

        <div class="buttonWrap" style="margin-top: 30px;">
          <button v-if="buttonStatus == buttonStatusType[1]"  @click="clickConfirm()">{{ t('confirm') }}</button>
          <button v-if="buttonStatus == buttonStatusType[1]"  @click="toggleShow('confirmPassword');">{{ t('cancel') }}</button>
          <button v-if="buttonStatus == buttonStatusType[2]"  @click="toggleShow('confirmPassword');">{{ t('confirm') }}</button>
        </div>

        <div v-if="isWarnText" class="confirmWarning" style="font-size: 12px; margin-top: 1px;">
          {{ t(confirmText) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleShow} from "@/utils/modals";
import { useI18n } from 'vue-i18n';
import {notify} from "@kyvg/vue3-notification";
//import {fn as listFn} from "@/views/list/list";
import {fn as listFn} from "@/views/transaction/transaction";
import {computed, onMounted, ref} from "vue";
import { themes, themeUtils } from "@/const/themeData";
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
const wpText = ref('');
let isWarnText = ref(false);

onMounted(() => {

  //console.log('onMounted: ' + props.payload.value.key);
  //console.log('onMounted: ' + props.payload.value.data);

  confirmText.value = 'warn_widthdrawpass';
  buttonStatus.value = buttonStatusType[1];

  /*switch (props.payload.value.key)
  {
    case 'delete':
    {
      confirmText.value = 'confirm_delete';
      buttonStatus.value = buttonStatusType[1];
    }
  }*/
});

const clickConfirm = async () => {

  //console.log('clickConfirm data: ' + props.payload.value.data);
  //console.log('clickConfirm input: ' + wpText.value);

  if(props.payload.value.data == wpText.value){
    listFn.withdraw();
    isWarnText.value = false;

    buttonStatus.value = buttonStatusType[2];

    //console.log('start req withdraw');
    hide();
  }
  else{
    isWarnText.value = true;
  }


  /*
  if(props.payload.value.key == 'delete')
  {
    if(buttonStatus.value == buttonStatusType[1])
    {
      confirmText.value = 'delete_process';
      buttonStatus.value = buttonStatusType[0];

     /* let res = await listFn.confirmDeleteRow(props.payload.value.flag, props.payload.value.data);
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
      */
/*
      buttonStatus.value = buttonStatusType[2];
    }
    else if(buttonStatus.value == buttonStatusType[2])
    {
      toggleShow('confirmPassWord');
    }
  }*/
}

const hide = () => {
  toggleShow('confirmPassWord');
}


</script>
<style>
.confirmPassWrap .logoWrap {
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_box.png");
  background-size: 100% 100%;
}
.confirmPassWrap .logoInnerWrap {
  width: calc(100% - 2px);
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/loginpopup/logo_innerbox.png");
  background-size: 100% 100%;
}
.confirmPassWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
}
.confirmPassWrap .confirmFormWrap {
  display: flex;
  width: 100%;
  height: calc(100% - 68px);
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/loginpopup/login_box.png");
  background-size: 100% 100%;
}
.confirmPassWrap  .confirmInnerFormWrap {
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
  /*width: 90%;*/
  /*height: 120px;*/
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  /*flex-wrap: wrap;*/
  color: red;
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
  .confirmPassWrap .logoWrap {
    width: 100%;
    height: 68px;
  }
  .confirmPassWrap .logoInnerWrap {
    width: calc(100% - 2px);
    height: 66px;
  }
  .confirmPassWrap .confirmFormWrap {
    width: 100%;
    height: calc(100% - 68px);
  }
  .confirmPassWrap .confirmInnerFormWrap {
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

  .confirmPassWrap .confirmInnerFormWrap div div{
    min-width: unset;
    width: calc(100% - 2px);
  }
}

.confirmPassWrap .InputWrap2 {
  background-image: url("../../assets/box/blueInputBox.png");
  background-size: 100% 100%;
  width: 278px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirmPassWrap .InputInnerWrap2{
  background-color: black;
  width: 276px;
  height: 38px;
}

</style>