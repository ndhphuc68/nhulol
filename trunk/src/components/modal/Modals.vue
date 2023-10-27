<template>
  <Modal v-if="modals['login'] && pageType == 'test1' "
         @hide="toggleShow('login')"
         :styles="{ width: '400px', height: '358px', border: 'none'}">
          <Login2/>
  </Modal>
  <!--Signup -->
  <Modal v-if="modals['signup'] && pageType == 'test1' "
         @hide="toggleShow('signup')"
         :styles="{ width: '802px', height: '788px', border: 'none'}">
          <SignUpView2/>
  </Modal>
    <!--GUIDE -->
  <Modal v-if="modals['gameGuide'] && pageType == 'test1' "
         @hide="toggleShow('gameGuide')"
         :styles="{ width: '1022px', height: '728px', border: 'none'}">
          <Guide2/>
  </Modal>

    <!--LIST -->
    <Modal2
        v-if="modalMenus.find(v => v.key == activeModal) && activeModal && pageType == 'test1' "
        :title="activeModal"
        @hide="toggleShow(activeModal)"
        :styles="{ width: '1022px', height: '728px'}"
        :modalType = "'normal'"
    >
        <DynamicComponent :componentSrc="modalInfo?.componentSrc" :data="modalInfo?.data" :key="modalInfo?.key"/>
    </Modal2>
    <Modal2
        v-if="communityModalMenus.find(v => v.key == activeModal) && activeModal && pageType == 'test1' "
        :title="activeModal"
        @hide="toggleShow(activeModal)"
        :styles="{ width: '494px', height: '630px'}"
        :modalType = "'community'"
    >
        <DynamicComponent :componentSrc="communityModalInfo?.componentSrc" :data="communityModalInfo?.data" :key="communityModalInfo?.key"/>
    </Modal2>
  <!--WriteView -->
  <Modal v-if="modals['writeHelp'] && pageType == 'test1' "
         @hide="toggleShow('writeHelp')"
         :styles="{ width: '494px', height: '610px', border: 'none'}">
        <WriteView2/>
  </Modal>
  <!--BankSelect -->
  <Modal v-if="modals['bankSelect'] && pageType == 'test1' "
           @hide="toggleShow('bankSelect')"
           :styles="{ width: '494px', height: '570px', border: 'none'}">
        <BankSelect2/>
    </Modal>
    <!--Partnership -->
  <Modal v-if="modals['partnership'] && pageType == 'test1' "
           @hide="toggleShow('partnership')"
           :styles="{ width: '494px', height: '570px', border: 'none'}">
        <Partnership2/>
  </Modal>
<!--GameModal -->
  <Modal v-if="(modals['liveCasino'] || modals['slotGame'] || modals['miniGame'])&& pageType == 'test1' "
           @hide="toggleShow(activeModal)"
           :styles="{ width: '1114px', height: '890px', border: 'none'}">
        <GameModal2 :modalType="activeModal"/>
    </Modal>
<!--Confirm -->
  <Modal v-if="modals['confirm'] && pageType == 'test1' "
           @hide="toggleShow('confirm')"
           :styles="{ width: '450px', height: '300px', border: 'none'}">
        <Confirm2 :payload="confirmPayload"/>
  </Modal>
<!--History -->
  <Modal v-if="modals['history'] && pageType == 'test1' "
           @hide="toggleShow('history')"
           :styles="{ width: '1022px', height: '728px', border: 'none'}">
        <History2>
            <DynamicComponent :componentSrc="historyModalInfo?.componentSrc" :data="historyModalInfo?.data" :key="historyModalInfo?.key"/>
        </History2>
  </Modal>
  <Modal v-if="modals['confirmPassword']"
           @hide="toggleShow('confirmPassword')"
           :styles="{ width: '450px', height: '300px', border: 'none'}">
        <ConfirmPassword :payload="confirmPasswordPayload"/>
  </Modal>

   <!-- <Modal v-if="modals['popupNotice']"
           @hide="toggleShow('popupNotice')"
           :styles="{ width: '450px', height: '300px', border: 'none'}">
        <PopupNotice :payload="popupNoticePayload"/>
    </Modal>-->

</template>
<script setup>
  import Modal from '@/components/modal/Modal.vue';
  import Modal2 from '@/components/modal/Modal2.vue';
  import Login2 from '@/views/login/Login2.vue';
  import SignUpView2 from '@/views/signup/SignUpView2';
  import WriteView2 from '@/views/help/WriteView2';
  import BankSelect2 from '@/views/signup/BankSelect2';
  import Partnership2 from '@/views/partnership/Partnership2';
  import GameModal2 from '@/views/game/GameModal2';
  import Guide2 from '@/views/guide/Guide2';
  import Confirm2 from '@/views/confirm/Confirm2';
  import History2 from '@/views/history/History2';
  import ConfirmPassword from '@/views/confirm/ConfirmPassword';
  import DynamicComponent from '@/components/DynamicComponent';

  //import PopupNotice from '@/views/popup/PopupNotice';
  //import { modals, toggleShow, activeModal, confirmPayload, confirmPasswordPayload, popupNoticePayload } from '@/utils/modals';
  import { modals, toggleShow, activeModal, confirmPayload, confirmPasswordPayload } from '@/utils/modals';

  import { useStore } from 'vuex';
  const store = useStore();
  import { modalMenus, communityModalMenus, historyModalMenus } from "@/const/menu";
  import { computed } from 'vue';
  const pageType = process.env.VUE_APP_PAGE_TYPE;
  const modalInfo = computed(() => {
      return modalMenus.find(v => v.key == activeModal.value);
  });
  const communityModalInfo = computed(() => {
    return communityModalMenus.find(v => v.key == activeModal.value);
  });
  const historyModalInfo = computed(() => {
    return historyModalMenus.find(v => v.key == activeModal.value);
  });
</script>