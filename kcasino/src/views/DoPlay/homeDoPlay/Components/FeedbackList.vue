<template>
  <div class="main-feed">
    <div class="card-list v-row">
      <div
        class="v-col-12 v-col-sm-6 v-col-lg-3 mt-sm-3 mb-sm-3 card-item"
        v-for="(feedback, index) in feedbacks"
        :key="feedback.id"
      >
        <div class="v-row">
          <div class="v-col-3 d-none d-lg-block v-col-lg-1"></div>
          <button
            class="v-col-9 d-flex flex-row align-center justify-start w-100"
            :key="feedback.id"
            @click="handleToggleModal(feedback.modal, index - 1)"
          >
            <img
              class="icon"
              alt=""
              :src="require(`@/assets/Doplay/icons/${feedback.image}`)"
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
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();

const handleToggleModal = (modal, idx) => {
  // document.querySelector('html').style.overflowY = "hidden";
  store.commit("handleToggle", modal);
  store.commit("handleActiveMenu", idx);
};

onMounted(async () => await store.dispatch("getPartnershipAction"));

const feedbacks = [
  {
    id: 1,
    name: "Partnership",
    description: "recruiting_partners",
    image: "hands.png",
    modal: "partnership",
    key: "partnership",
  },
  {
    id: 2,
    name: "Notice",
    description: "notification",
    image: "notice.png",
    modal: "notice",
    key: "notice",
  },
  {
    id: 3,
    name: "FAQs",
    description: "any_questions",
    image: "faq.png",
    modal: "faq",
    key: "FAQs",
  },
  {
    id: 4,
    name: "Events",
    description: "hot_events",
    image: "event.png",
    modal: "event",
    key: "events",
  },
];
</script>
<style scoped>
.main-feed {
  margin-top: 48px;
  text-align: left;
  border: 1px solid #e4e4e7;
  border-radius: 6px;
}

.card-list {
  padding: 35px;
  background: #fff;
  border-radius: 5px;
  margin: 0;
}

.card-item:hover {
  transform: scale(1.04);
}

.card-item:not(:first-child) {
  border-left: 1px solid #e4e4e7;
}

.card-feedback:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 59px;
  height: 0;
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
  font-size: 24px;
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
  margin-right: 1rem;
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
@media (max-width: 280px) {
  .name {
    font-size: 14px;
  }
  .introduce {
    font-size: 12px;
  }
}
</style>
