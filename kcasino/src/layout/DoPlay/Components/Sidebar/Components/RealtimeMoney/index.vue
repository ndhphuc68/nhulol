<template>
  <div :class="layout.nav_pos === '1' && 'v-row w-100'">
    <div
      :class="layout.nav_pos === '1' && 'v-col-6 d-flex flex-row align-center'"
    >
      <div :class="layout.nav_pos === '1' && 'v-row d-flex align-center'">
        <div
          :class="layout.nav_pos === '1' ? 'v-col-4 title-item' : 'title-item'"
        >
          <h4 :class="layout.nav_pos === '1' && 'text-center'">
            {{ $t("dailywithdraw") }}
          </h4>
        </div>
        <div
          :class="
            layout.nav_pos === '1'
              ? 'v-col-8 list-daily-horiontal d-flex align-center justify-space-evenly'
              : 'list-daily'
          "
        >
          <ul class="list-ul w-100">
            <li
              class="item-daily"
              v-for="item in dailyWithdraws"
              :key="item.wi_idx"
            >
              <p class="item-daily-date">
                {{ formatDateV1(new Date(item.wi_created)) }}
              </p>
              <p class="item-daily-name">{{ item.wi_member_nickname }}</p>
              <p class="item-daily-money">{{ item.wi_money }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div
      :class="layout.nav_pos === '1' && 'v-col-6 d-flex flex-row align-center'"
    >
      <div :class="layout.nav_pos === '1' && 'v-row d-flex align-center'">
        <div
          :class="layout.nav_pos === '1' ? 'v-col-4 title-item' : 'title-item'"
        >
          <h4 :class="layout.nav_pos === '1' && 'text-center'">
            {{ $t("dailyDeposit") }}
          </h4>
        </div>
        <div
          :class="
            layout.nav_pos === '1'
              ? 'v-col-8 list-daily-horiontal d-flex align-center justify-space-evenly'
              : 'list-daily'
          "
        >
          <ul class="list-ul w-100">
            <li
              class="item-daily"
              v-for="item in dailyDeposits"
              :key="item.de_idx"
            >
              <p class="item-daily-date">
                {{ formatDateV1(new Date(item.de_created)) }}
              </p>
              <p class="item-daily-name">{{ item.de_member_nickname }}</p>
              <p class="item-daily-money">{{ item.de_money }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { formatDateV1 } from "@/utils";
import { useStore } from "vuex";

const store = useStore();
const dailyDeposits = computed(() => store.getters.getListDepositRealTime);
const dailyWithdraws = computed(() => store.getters.getListWithDrawRealTime);
const layout = computed(() => store.state.customPage.styles);

onMounted(async () => {
  await store.dispatch("depositListRealTimeAction");
  await store.dispatch("withdrawListRealTimeAction");

  setInterval(async () => {
    await store.dispatch("depositListRealTimeAction");
    await store.dispatch("withdrawListRealTimeAction");
  }, 20000);
});
</script>
<style scoped>
.list-daily {
  height: 240px;
  overflow-y: hidden;
}

.list-daily::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}

.list-daily-horiontal {
  height: 144px;
  overflow-y: hidden;
}

.list-ul {
  animation: scrollRow 60s infinite backwards ease-in-out;
}

.list-ul li {
  height: 48px;
}

.item-daily {
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
  font-size: 14px;
}

.item-daily-name {
  width: 59px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-item {
  width: 100%;
  background-color: var(--primaryDoplay);
  padding: 10px 8px;
  gap: 10px;
  color: #fff;
  border-radius: 4px;
}

@keyframes scrollRow {
  0% {
    transform: translateY(0%);
    top: 0%;
  }
  5% {
    transform: translateY(0%);
    top: 0%;
  }
  6% {
    transform: translateY(calc(-48px * 1));
    top: calc(-48px * 1);
  }
  10% {
    transform: translateY(calc(-48px * 1));
    top: calc(-48px * 1);
  }
  11% {
    transform: translateY(calc(-48px * 2));
    top: calc(-48px * 2);
  }
  15% {
    transform: translateY(calc(-48px * 2));
    top: calc(-48px * 2);
  }
  16% {
    transform: translateY(calc(-48px * 3));
    top: calc(-48px * 3);
  }
  20% {
    transform: translateY(calc(-48px * 3));
    top: calc(-48px * 3);
  }
  21% {
    transform: translateY(calc(-48px * 4));
    top: calc(-48px * 4);
  }
  25% {
    transform: translateY(calc(-48px * 4));
    top: calc(-48px * 4);
  }
  26% {
    transform: translateY(calc(-48px * 5));
    top: calc(-48px * 5);
  }
  30% {
    transform: translateY(calc(-48px * 5));
    top: calc(-48px * 5);
  }
  31% {
    transform: translateY(calc(-48px * 6));
    top: calc(-48px * 6);
  }
  35% {
    transform: translateY(calc(-48px * 6));
    top: calc(-48px * 6);
  }
  36% {
    transform: translateY(calc(-48px * 7));
    top: calc(-48px * 7);
  }
  40% {
    transform: translateY(calc(-48px * 7));
    top: calc(-48px * 7);
  }
  41% {
    transform: translateY(calc(-48px * 8));
    top: calc(-48px * 8);
  }
  45% {
    transform: translateY(calc(-48px * 8));
    top: calc(-48px * 8);
  }
  46% {
    transform: translateY(calc(-48px * 9));
    top: calc(-48px * 9);
  }
  50% {
    transform: translateY(calc(-48px * 9));
    top: calc(-48px * 9);
  }
  51% {
    transform: translateY(calc(-48px * 10));
    top: calc(-48px * 10);
  }
  55% {
    transform: translateY(calc(-48px * 10));
    top: calc(-48px * 10);
  }
  56% {
    transform: translateY(calc(-48px * 11));
    top: calc(-48px * 11);
  }
  60% {
    transform: translateY(calc(-48px * 11));
    top: calc(-48px * 11);
  }
  61% {
    transform: translateY(calc(-48px * 12));
    top: calc(-48px * 12);
  }
  65% {
    transform: translateY(calc(-48px * 12));
    top: calc(-48px * 12);
  }
  66% {
    transform: translateY(calc(-48px * 13));
    top: calc(-48px * 13);
  }
  70% {
    transform: translateY(calc(-48px * 13));
    top: calc(-48px * 13);
  }
  71% {
    transform: translateY(calc(-48px * 14));
    top: calc(-48px * 14);
  }
  75% {
    transform: translateY(calc(-48px * 14));
    top: calc(-48px * 14);
  }
  76% {
    transform: translateY(calc(-48px * 15));
    top: calc(-48px * 15);
  }
  80% {
    transform: translateY(calc(-48px * 15));
    top: calc(-48px * 15);
  }
  81% {
    transform: translateY(calc(-48px * 16));
    top: calc(-48px * 16);
  }
  85% {
    transform: translateY(calc(-48px * 16));
    top: calc(-48px * 16);
  }
  86% {
    transform: translateY(calc(-48px * 17));
    top: calc(-48px * 17);
  }
  90% {
    transform: translateY(calc(-48px * 17));
    top: calc(-48px * 17);
  }
  91% {
    transform: translateY(calc(-48px * 18));
    top: calc(-48px * 18);
  }
  95% {
    transform: translateY(calc(-48px * 18));
    top: calc(-48px * 18);
  }
  96% {
    transform: translateY(calc(-48px * 19));
    top: calc(-48px * 19);
  }
  97% {
    transform: translateY(0);
    top: 0%;
  }
}

@media (max-width: 280px) {
  p {
    font-size: 12px;
  }
}
</style>
