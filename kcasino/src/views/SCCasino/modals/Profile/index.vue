<template>
  <section id="profile">
    <div v-if="editTrue">
      <v-tabs
        v-model="currentTabIdx"
        bg-color="transparent"
        color="var(--primarySCCasino)"
      >
        <v-tab @click="handleChangeTab(0)" style="width: 50%"
          >{{ $t("generalInfo") }}
        </v-tab>
        <v-tab @click="handleChangeTab(1)" style="width: 50%">
          {{ $t("bankAccountInfo") }}
        </v-tab>
      </v-tabs>
      <v-window v-model="currentTabIdx">
        <v-window-item>
          <v-card color="basil" flat>
            <KeepAlive>
              <GeneralInfo />
            </KeepAlive>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card color="basil" flat>
            <KeepAlive>
              <BankAccountInfo />
            </KeepAlive>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
    <Edit @handleChangeEdit="handleChangeEdit" v-else />
    <div class="d-flex btnedit justify-center">
      <button v-if="editTrue" @click="handleChangeEdit()" class="btn-edit">
        {{ $t("edit") }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import GeneralInfo from "./GeneralInfo.vue";
import BankAccountInfo from "./BankAccountInfo.vue";
import Edit from "./Edit";

const currentTabIdx = ref(0);
const editTrue = ref(true);

const handleChangeEdit = () => {
  const element = document.getElementById("profile");
  editTrue.value = !editTrue.value;

  element.scrollIntoView({ behavior: "smooth" });
};

const handleChangeTab = (tab) => {
  const element = document.getElementById("profile");

  currentTabIdx.value = tab;
  element.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped lang="scss">
#profile {
  @media (max-width: 768px) {
    scroll-margin: 60px;
    margin-top: 60px;
    padding: 0 15px;
  }
}

.btn-edit {
  padding: 10px 20px;
  color: #fff;
  border-radius: 5px;
  background-color: var(--primarySCCasino);
}
@media (max-width: 768px) {
  .btnedit {
    margin-bottom: 100px;
  }
}

@media (max-width: 375px) {
  .v-btn .v-btn__content {
    font-size: 10px !important;
    white-space: inherit !important;
  }
}
</style>

<style>
@media (max-width: 375px) {
  .v-btn .v-btn__content {
    font-size: 11px !important;
    white-space: inherit !important;
  }
}
</style>
