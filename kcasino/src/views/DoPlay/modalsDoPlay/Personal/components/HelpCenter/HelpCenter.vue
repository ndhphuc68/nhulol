<script setup>
import { useI18n } from "vue-i18n";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { converTime } from "@/utils";
import AlertModal from "@/components/EDGames/modal/AlertModal.vue";

const { t } = useI18n();
const store = useStore();
const expandable = ref(-1);
const listHelp = computed(() => store.state.helpCenter.listHelp);
const idDelete = ref("");
const toggleAlert = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(7);
const userInfor = computed(() => store.state.user.userInfor);
const pageList = ref([]);

watch(listHelp, () => {
  updatePage();
});

watch(currentPage, () => {
  const element = document.getElementById("helpcenter-wrapper");
  element.scrollIntoView({ behavior: "smooth" });
});

onMounted(() => {
  if (listHelp.value.length > 7) {
    pageList.value = listHelp.value.slice(0, 7);
  } else {
    pageList.value = listHelp.value;
  }
});

const updatePage = () => {
  pageList.value = listHelp.value.slice(
    (currentPage.value - 1) * itemsPerPage.value,
    currentPage.value * itemsPerPage.value
  );
};

const handleExpandable = (index) => {
  if (index === expandable.value) {
    expandable.value = -1;
  } else {
    expandable.value = index;
  }
};

const handleDelete = (id) => {
  idDelete.value = id;
  handleToggleAlert();
};

const handleToggleAlert = () => (toggleAlert.value = !toggleAlert.value);

const handleDeleteHelpCenter = async () => {
  const res = await store.dispatch("deleteHelpCenterAction", {
    idx: idDelete.value,
    data: {
      memberIdx: userInfor.value.me_idx,
      mInviteCode: userInfor.value.me_invite_code,
      mNickName: userInfor.value.me_nickname,
    },
  });
  if (res?.is_success) {
    await store.dispatch("showAlert", {
      type: "success",
      message: t("delete_success"),
    });
  } else {
    await store.dispatch("showAlert", {
      type: "error",
      message: t("delete_error"),
    });
  }
};
</script>

<template>
  <div class="help-center-main w-100">
    <div id="helpcenter-wrapper" class="table-main overflow-x-auto w-100">
      <table class="table w-100 header-fixed">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">{{ $t("title") }}</th>
            <th class="text-center">{{ $t("nickname") }}</th>
            <th class="text-center">{{ $t("status") }}</th>
            <th class="text-center">{{ $t("date") }}</th>
            <th class="text-center">{{ $t("action") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            @click="handleExpandable(index)"
            :key="index"
            v-for="(item, index) in pageList"
          >
            <td>
              <div class="d-flex justify-space-between">
                <span class="d-md-none">#</span>
                <span>{{ index + 1 }}</span>
              </div>
            </td>
            <td>
              <div class="d-flex justify-space-between">
                <span class="d-md-none">{{ $t("title") }}</span>
                <p class="ms-3 text-truncate content-text">
                  {{ item.cu_question }}
                </p>
              </div>
            </td>
            <td
              class="expanded-mobile w-100"
              :class="expandable === index ? 'd-block' : 'd-none'"
            >
              <div
                class="d-flex flex-column justify-content-start mt-2 mb-2 ms-3 px-2"
              >
                <span class="font-weight-bold mb-2 d-md-none">{{
                  item.cu_question
                }}</span>
                <span>{{ item.cu_answer }}</span>
              </div>
            </td>
            <td>
              <div class="d-flex justify-space-between">
                <span class="d-md-none">{{ $t("nickname") }}</span>
                <span class="font-weight-bold">{{
                  item.cu_member_nickname
                }}</span>
              </div>
            </td>
            <td>
              <div class="d-flex justify-space-between">
                <span class="d-md-none">{{ $t("status") }}</span>
                <span :class="item.cu_status"> {{ $t(item.cu_status) }}</span>
              </div>
            </td>
            <td>
              <div class="d-flex justify-space-between">
                <span class="d-md-none">{{ $t("date") }}</span
                ><span>{{ converTime(item.cu_created) }}</span>
              </div>
            </td>
            <td>
              <div class="d-flex justify-space-between">
                <span class="d-md-none">{{ $t("action") }}</span>
                <span @click="handleDelete(item.cu_idx)"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <path
                      d="M84.375 18.75H68.75V15.625C68.75 13.1386 67.7623 10.754 66.0041 8.99587C64.246 7.23772 61.8614 6.25 59.375 6.25H40.625C38.1386 6.25 35.754 7.23772 33.9959 8.99587C32.2377 10.754 31.25 13.1386 31.25 15.625V18.75H15.625C14.7962 18.75 14.0013 19.0792 13.4153 19.6653C12.8292 20.2513 12.5 21.0462 12.5 21.875C12.5 22.7038 12.8292 23.4987 13.4153 24.0847C14.0013 24.6708 14.7962 25 15.625 25H18.75V81.25C18.75 82.9076 19.4085 84.4973 20.5806 85.6694C21.7527 86.8415 23.3424 87.5 25 87.5H75C76.6576 87.5 78.2473 86.8415 79.4194 85.6694C80.5915 84.4973 81.25 82.9076 81.25 81.25V25H84.375C85.2038 25 85.9987 24.6708 86.5847 24.0847C87.1708 23.4987 87.5 22.7038 87.5 21.875C87.5 21.0462 87.1708 20.2513 86.5847 19.6653C85.9987 19.0792 85.2038 18.75 84.375 18.75ZM43.75 65.625C43.75 66.4538 43.4208 67.2487 42.8347 67.8347C42.2487 68.4208 41.4538 68.75 40.625 68.75C39.7962 68.75 39.0013 68.4208 38.4153 67.8347C37.8292 67.2487 37.5 66.4538 37.5 65.625V40.625C37.5 39.7962 37.8292 39.0013 38.4153 38.4153C39.0013 37.8292 39.7962 37.5 40.625 37.5C41.4538 37.5 42.2487 37.8292 42.8347 38.4153C43.4208 39.0013 43.75 39.7962 43.75 40.625V65.625ZM62.5 65.625C62.5 66.4538 62.1708 67.2487 61.5847 67.8347C60.9987 68.4208 60.2038 68.75 59.375 68.75C58.5462 68.75 57.7513 68.4208 57.1653 67.8347C56.5792 67.2487 56.25 66.4538 56.25 65.625V40.625C56.25 39.7962 56.5792 39.0013 57.1653 38.4153C57.7513 37.8292 58.5462 37.5 59.375 37.5C60.2038 37.5 60.9987 37.8292 61.5847 38.4153C62.1708 39.0013 62.5 39.7962 62.5 40.625V65.625ZM62.5 18.75H37.5V15.625C37.5 14.7962 37.8292 14.0013 38.4153 13.4153C39.0013 12.8292 39.7962 12.5 40.625 12.5H59.375C60.2038 12.5 60.9987 12.8292 61.5847 13.4153C62.1708 14.0013 62.5 14.7962 62.5 15.625V18.75Z"
                      fill="black"
                    /></svg
                ></span>
              </div>
            </td>
            <td
              class="expanded-td"
              :class="expandable === index ? 'd-block' : 'd-none'"
            >
              <div
                class="d-flex flex-column justify-content-start mt-2 mb-2 ms-3 px-6"
              >
                <span class="font-weight-bold mb-2">{{
                  item.cu_question
                }}</span>
                <span>{{ item.cu_answer }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <v-pagination
        @click="updatePage"
        v-model="currentPage"
        :length="Math.ceil(listHelp?.length / itemsPerPage)"
        rounded="0"
      ></v-pagination>
    </div>
  </div>
  <div v-if="toggleAlert">
    <AlertModal
      :des="$t('do you really want to delete?')"
      :handleClose="handleToggleAlert"
      :handleAccept="() => handleDeleteHelpCenter()"
    />
  </div>
</template>

<style scoped lang="scss">
.help-center-main {
  .table-main {
    .header-fixed {
      width: 100%;

      > thead {
        display: block;

        @media (max-width: 991.98px) {
          display: none;
        }

        > tr {
          display: block;

          > th {
            background: #e4e4e7;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
            float: left;
            color: #52525b;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            height: 45px;

            &:first-child {
              width: 10%;
            }

            &:nth-child(2) {
              width: 30%;
            }

            &:nth-child(3) {
              width: 10%;
            }

            &:last-child {
              width: 10%;
            }
          }

          &:after {
            content: " ";
            display: block;
            visibility: hidden;
            clear: both;
          }
        }
      }

      > tbody {
        display: block;

        @media (max-width: 375px) {
          font-size: 12px;
        }

        &::-webkit-scrollbar {
          display: none;
        }

        > tr {
          display: block;
          border-bottom: 1px solid #e4e4e7;

          @media (max-width: 991.98px) {
            display: flex;
            flex-direction: column;
          }

          > td {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20%;
            float: left;
            height: 60px;

            @media (max-width: 991.98px) {
              width: 100% !important;
            }

            div {
              @media (max-width: 991.98px) {
                width: 100%;
              }
            }

            .content-text {
              max-width: 250px;
              @media (max-width: 375px) {
                max-width: 150px;
              }
            }

            &:first-child {
              width: 10%;
            }

            &:nth-child(2) {
              width: 30%;
            }

            &:nth-child(4) {
              width: 10%;
            }

            &:nth-child(7) {
              width: 10%;

              span {
                cursor: pointer;
              }
            }

            .ACTIVE {
              border-radius: 20px;
              background: #fffbeb;
              color: #d97706;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              padding: 5px 10px;
            }

            .COMPLETE {
              border-radius: 20px;
              background: #f0fdf4;
              color: #16a34a;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              padding: 5px 10px;
            }
          }

          &:after {
            content: " ";
            display: block;
            visibility: hidden;
            clear: both;
          }
        }
      }

      .expanded-td {
        width: 100%;
        height: fit-content;

        @media (max-width: 991.98px) {
          display: none !important;
        }
      }

      .expanded-mobile {
        width: 100%;
        height: fit-content;
        @media (min-width: 991.98px) {
          display: none !important;
        }
      }
    }
  }
}
</style>
