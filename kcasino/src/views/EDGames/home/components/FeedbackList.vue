<template>
  <div class="container">
    <div class="card-list v-row">
      <div
        class="v-col-12 v-col-sm-6 v-col-lg-3 mt-sm-3 mb-sm-3 card-item"
        v-for="(feedback, index) in feedbacks"
        :key="feedback.id"
      >
        <button
          class="d-flex flex-row align-center justify-left"
          :key="feedback.id"
          @click="handleToggleModal(feedback.modal, index - 1)"
        >
          <img
            class="icon"
            alt=""
            :src="require(`@/assets/icon/home/${feedback.image}`)"
          />
          <div class="card-item-text">
            <div>
              <p class="introduce">
                {{ $t(feedback.description) }}
              </p>
            </div>
            <div>
              <h6 class="name">
                {{ $t(feedback.key) }}
              </h6>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { utils } from "@/utils/common";
import { feedbacks } from "@/utils/datas";
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

const handleToggleModal = (modal, idx) => {
  document.querySelector("html").style.overflowY = "hidden";
  store.commit("handleToggle", modal);
  store.commit("handleActiveMenu", idx);
};

onMounted(async () => await store.dispatch("getPartnershipAction"));
</script>
<style scoped>
.container {
  margin-top: 48px;
  text-align: left;
  border: 1px solid #e4e4e7;
  border-radius: 6px;

  @media (max-width: 1024px) {
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
  }
}

.card-list {
  /*display: flex;*/
  /*margin-top: 32px;*/
  /*justify-content: space-between;*/
  padding: 35px;
  background: #fff;
  border-radius: 5px;
  margin: 0;
  /*align-items: center;*/
}

.card-item {
  display: flex;
  justify-content: left;
  transition: all linear 0.2s;
}

.card-item:hover {
  transform: scale(1.04);
}

.card-feedback:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 59px;
  height: 0px;
  left: calc(90%);
  top: 50%;
  border: 1px solid #e4e4e7;
  transform: rotate(90deg);
}

.card-item-text {
  margin-left: 12px;
}

.card-item-top img {
  margin-right: 16px;
}

.name {
  font-weight: 700;
  font-size: 22px;
  line-height: 24px;
  text-align: left;
}

.introduce {
  font-size: 16px;
  line-height: 24px;
  color: var(--text-second);
}

.icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

@media (max-width: 768px) {
  /*  .card-list {*/
  /*    flex-wrap: wrap;*/
  /*    justify-content: center;*/
  /*    margin-top: 0;*/
  /*  }*/
  /*  .card-item {*/
  /*    border-left: none !important;*/
  /*    padding: 10px 0;*/
  /*  }*/
  /*  !*.card-feedback:not(:last-child)::after {*!*/
  /*  !*  top: 133%;*!*/
  /*  !*  width: 150%;*!*/
  /*  !*  height: 0px;*!*/
  /*  !*  left: -25%;*!*/
  /*  !*  border: 1px solid #E4E4E7;*!*/
  /*  !*  transform: unset;*!*/
  /*  !*}*!*/
}

@media (max-width: 597px) {
  .card-item {
    border-left: none !important;
    padding: 10px 0;
  }

  .card-item:not(:last-child) {
    border-bottom: 1px solid #e4e4e7;
  }
}

@media (min-width: 426px) and (max-width: 1024px) {
  .card-item:nth-child(3) {
    border-left: none !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    margin-top: 40px;
  }

  .card-feedback::after {
    display: none;
  }
}

@media (max-width: 375px) {
  .name {
    font-size: 16px;
  }

  .introduce {
    font-size: 13px;
  }
}
</style>
