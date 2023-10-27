<script setup>
import { ref } from "vue";
import HelpCenter from "./HelpCenter";
import QueryCreation from "./QueryCreation";

const currentTab = ref(0);

const handleChangeTab = (index) => {
  currentTab.value = index;
};
</script>

<template>
  <div class="container px-2 px-md-6 py-5">
    <button
      v-if="currentTab === 0"
      class="btn-creation"
      @click="handleChangeTab(1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          d="M10 4.5H5.5C4.96957 4.5 4.46086 4.71071 4.08579 5.08579C3.71071 5.46086 3.5 5.96957 3.5 6.5V15.5C3.5 16.0304 3.71071 16.5391 4.08579 16.9142C4.46086 17.2893 4.96957 17.5 5.5 17.5H15.5C16.0304 17.5 16.5391 17.2893 16.9142 16.9142C17.2893 16.5391 17.5 16.0304 17.5 15.5V11"
          stroke="#F7F7F9"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5 5.50011L16.453 6.50011M17.5 3.46711C17.7666 3.74277 17.9142 4.11213 17.911 4.49559C17.9078 4.87906 17.7541 5.24592 17.483 5.51711L10.5 12.5001L7.5 13.5001L8.5 10.5001L15.487 3.45411C15.7326 3.20659 16.0613 3.05895 16.4095 3.03974C16.7577 3.02053 17.1006 3.13112 17.372 3.35011L17.5 3.46711Z"
          stroke="#F7F7F9"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      &nbsp; {{ $t("btn-creation") }}
    </button>
    <button
      v-if="currentTab === 1"
      class="btn-creation"
      @click="handleChangeTab(0)"
    >
      {{ $t("btn-back") }}
    </button>
    <HelpCenter v-if="currentTab === 0" />
    <QueryCreation @handleChangeTab="handleChangeTab" v-else />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}

.btn-creation {
  background: var(--primaryDoplay);
  padding: 10px 25px;
  color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 8px;
}

.btn-creation:hover {
  opacity: 0.7;
}

@media (max-width: 375px) {
  .btn-creation {
    font-size: 12px;
  }
}
</style>
