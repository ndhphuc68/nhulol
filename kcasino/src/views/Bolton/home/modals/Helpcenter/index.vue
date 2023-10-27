<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { Icons } from "@/const/Icons";
import { converTime, handleCloseModal } from "@/utils";
import { useStore } from "vuex";
import AlertModal from "@/components/EDGames/modal/AlertModal.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const store = useStore();
const listHelp = computed(() => store.state.helpCenter.listHelp);
const userInfor = computed(() => store.state.user.userInfor);

const expandable = ref(-1);
const toggleAlert = ref(false);
const idDelete = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const pageList = ref([]);

watch(listHelp, () => {
  // if (val.length > 5) {
  //   pageList.value = val.slice(0, 5);
  // } else {
  //   pageList.value = val;
  // }
  updatePage(false);
});

watch(currentPage, () => {
  let table = document.getElementById("body-table");
  table.scrollTo({ top: 0, behavior: "smooth" });
});

onMounted(() => {
  if (listHelp.value.length > 5) {
    pageList.value = listHelp.value.slice(0, 5);
  } else {
    pageList.value = listHelp.value;
  }
});

const updatePage = (check) => {
  if (check) {
    expandable.value = -1;
  }

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
  <div class="help-center-main">
    <div class="row mb-3">
      <div
        class="d-flex flex-lg-row justify-content-lg-end w-100 flex-column-reverse help-center-header"
      >
        <!--        <span class="text-start my-2 my-lg-0">Query List</span>-->
        <button
          class="my-3 my-lg-0 px-3 py-2"
          @click="
            handleCloseModal('createHelp');
            handleCloseModal('helpCenter');
          "
        >
          <img :src="Icons.edit" class="me-1" alt="edit" />{{
            $t("btn-creation")
          }}
        </button>
      </div>
    </div>
    <div class="row">
      <!--      <div-->
      <!--        class="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center align-items-center"-->
      <!--      >-->
      <!--        <Calendar class="me-1" v-model="dateStart" showIcon/>-->
      <!--        <span>&ensp;-&ensp;</span>-->
      <!--        <Calendar v-model="dateEnd" showIcon/>-->
      <!--      </div>-->
      <!--      <div class="col-6 d-none d-lg-flex justify-content-end">-->
      <!--        <div class="input-search position-relative w-50">-->
      <!--          <img :src="Icons.search" alt="search"/>-->
      <!--          <input v-model="searchHelp"-->
      <!--                 type="text"-->
      <!--                 class="form-control"-->
      <!--                 :placeholder="t('search')"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="row mt-4">
      <div class="table-main overflow-x-auto w-100">
        <table class="table w-100 header-fixed">
          <thead>
            <tr>
              <th class="text-center" scope="col">#</th>
              <th class="text-center" scope="col">{{ $t("title") }}</th>
              <th class="text-center" scope="col">{{ $t("status") }}</th>
              <th class="text-center" scope="col">{{ $t("date") }}</th>
              <th class="text-center" scope="col">{{ $t("action") }}</th>
            </tr>
          </thead>
          <tbody id="body-table">
            <tr
              @click="handleExpandable(index)"
              :key="index"
              v-for="(item, index) in pageList"
            >
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-lg-center justify-content-between"
                >
                  <span class="d-lg-none">#</span>
                  <span>{{ index + 1 }}</span>
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-lg-center justify-content-between"
                >
                  <span class="d-lg-none">{{ $t("title") }}</span>
                  <span
                    class="text-truncate text-lg-center text-end text-content"
                    >{{ item.cu_question }}</span
                  >
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-lg-center justify-content-between"
                >
                  <span class="d-lg-none">{{ $t("status") }}</span>
                  <span :class="item.cu_status">{{ $t(item.cu_status) }}</span>
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-lg-center justify-content-between"
                >
                  <span class="d-lg-none text-start">{{ $t("date") }}</span>
                  <span class="text-center">{{
                    converTime(item.cu_created)
                  }}</span>
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-lg-center justify-content-between"
                >
                  <span class="d-lg-none">{{ $t("action") }}</span>
                  <span @click="handleDelete(item.cu_idx)" class="span-delete">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.5 4.47795V4.70495C17.799 4.82373 19.0927 4.99454 20.378 5.21695C20.4751 5.23376 20.5678 5.26952 20.6511 5.32218C20.7343 5.37485 20.8063 5.4434 20.8631 5.52391C20.9198 5.60441 20.9601 5.69531 20.9817 5.7914C21.0033 5.88749 21.0058 5.9869 20.989 6.08395C20.9722 6.18099 20.9364 6.27378 20.8838 6.35701C20.8311 6.44023 20.7626 6.51227 20.682 6.56901C20.6015 6.62575 20.5106 6.66607 20.4146 6.68768C20.3185 6.70929 20.2191 6.71176 20.122 6.69495L19.913 6.65995L18.908 19.7299C18.8501 20.4835 18.5098 21.1875 17.9553 21.701C17.4008 22.2146 16.6728 22.4999 15.917 22.4999H8.08401C7.3282 22.4999 6.60026 22.2146 6.04573 21.701C5.4912 21.1875 5.15095 20.4835 5.09301 19.7299L4.08701 6.65995L3.87801 6.69495C3.78096 6.71176 3.68155 6.70929 3.58546 6.68768C3.48937 6.66607 3.39847 6.62575 3.31796 6.56901C3.15537 6.45442 3.04495 6.27994 3.01101 6.08395C2.97706 5.88795 3.02236 5.6865 3.13694 5.52391C3.25153 5.36131 3.42601 5.2509 3.62201 5.21695C4.90727 4.99427 6.20099 4.82347 7.50001 4.70495V4.47795C7.50001 2.91395 8.71301 1.57795 10.316 1.52695C11.4387 1.49102 12.5623 1.49102 13.685 1.52695C15.288 1.57795 16.5 2.91395 16.5 4.47795ZM10.364 3.02595C11.4547 2.99106 12.5463 2.99106 13.637 3.02595C14.39 3.04995 15 3.68395 15 4.47795V4.59095C13.0018 4.46959 10.9982 4.46959 9.00001 4.59095V4.47795C9.00001 3.68395 9.60901 3.04995 10.364 3.02595ZM10.009 8.97095C10.0052 8.87246 9.98203 8.77568 9.94082 8.68614C9.89961 8.59661 9.84117 8.51606 9.76883 8.44911C9.69649 8.38216 9.61168 8.33011 9.51923 8.29594C9.42678 8.26177 9.3285 8.24614 9.23001 8.24995C9.13152 8.25376 9.03474 8.27693 8.9452 8.31814C8.85567 8.35935 8.77512 8.41779 8.70817 8.49012C8.64122 8.56246 8.58917 8.64728 8.555 8.73973C8.52083 8.83218 8.5052 8.93046 8.50901 9.02895L8.85601 18.0289C8.8637 18.2277 8.95004 18.4153 9.09604 18.5504C9.16833 18.6173 9.25309 18.6693 9.34548 18.7035C9.43787 18.7376 9.53608 18.7533 9.63451 18.7494C9.73293 18.7456 9.82964 18.7225 9.91912 18.6813C10.0086 18.6401 10.0891 18.5817 10.156 18.5094C10.2229 18.4371 10.2749 18.3524 10.3091 18.26C10.3432 18.1676 10.3588 18.0694 10.355 17.9709L10.009 8.97095ZM15.489 9.02895C15.4963 8.92857 15.4834 8.82773 15.4509 8.73246C15.4185 8.63719 15.3672 8.54942 15.3001 8.47439C15.233 8.39936 15.1515 8.3386 15.0604 8.29574C14.9694 8.25287 14.8706 8.22877 14.77 8.22488C14.6694 8.22098 14.5691 8.23737 14.475 8.27307C14.3809 8.30877 14.2949 8.36304 14.2222 8.43266C14.1496 8.50227 14.0916 8.58581 14.0519 8.67829C14.0122 8.77077 13.9915 8.8703 13.991 8.97095L13.644 17.9709C13.6363 18.1699 13.708 18.3637 13.8432 18.5098C13.9784 18.6559 14.1661 18.7423 14.365 18.7499C14.5639 18.7576 14.7577 18.686 14.9038 18.5508C15.0499 18.4156 15.1363 18.2279 15.144 18.0289L15.489 9.02895Z"
                        fill="#DE6777"
                      />
                    </svg>
                  </span>
                </div>
              </td>
              <td
                class="expanded-td"
                :class="expandable === index ? 'd-block' : 'd-none'"
              >
                <div class="d-flex flex-column justify-content-start mt-2 ms-3">
                  <span class="font-weight-bold mb-2">{{
                    item.cu_question
                  }}</span>
                  <span>{{ item.cu_answer }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-100 mt-2">
        <v-pagination
          @click="updatePage(true)"
          v-model="currentPage"
          :length="Math.ceil(listHelp?.length / 5)"
          rounded="0"
        ></v-pagination>
      </div>
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
    @media (max-width: 375px) {
      padding: 0;
    }
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
            display: block;
            width: 20%;
            float: left;
            color: #52525b;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;

            &:first-child {
              width: 10%;
            }

            &:nth-child(2) {
              width: 40%;
            }

            &:nth-child(5) {
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
        overflow-y: auto;
        height: 350px;

        > tr {
          display: block;

          @media (max-width: 991.98px) {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            border: 1px solid #e4e4e7;
            margin-bottom: 10px;
            padding: 15px;
          }
          @media (max-width: 375px) {
            padding: 0;
          }

          > td {
            display: block;
            width: 20%;
            float: left;
            height: 60px;
            @media (max-width: 375px) {
              height: 35px;
            }

            .text-content {
              width: 170px;
              @media (max-width: 375px) {
                width: 110px;
              }
            }

            &:first-child {
              width: 10%;
              @media (max-width: 991.98px) {
                width: 100%;
              }
            }

            &:nth-child(2) {
              width: 40%;
              @media (max-width: 991.98px) {
                width: 100%;
              }

              div {
                color: #52525b;
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
              }
            }

            &:nth-child(5) {
              width: 10%;

              .span-delete {
                cursor: pointer;
              }
            }

            @media (max-width: 991.98px) {
              width: 100% !important;
              border-bottom: none;
            }

            div {
              color: #52525b;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }

            &:nth-child(5) {
              div {
                color: #a1a1aa;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
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

            .fail {
              border-radius: 20px;
              background: #fbeef0;
              color: #d23449;
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
      }
    }
  }

  .help-center-header {
    span {
      color: var(--light-gradient);
      font-size: 22px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    button {
      color: var(--light-gradient);
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      min-width: 10rem;

      @media (max-width: 991.98px) {
        width: 25%;
      }

      @media (max-width: 767.98px) {
        width: 50%;
      }

      border-radius: 20px;
      border: 1px solid #f1c0c7;
      background: #f9e2e5;
      padding: 0 16px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .input-search {
    img {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    input {
      padding-left: 35px;
      border-radius: 20px;
      background: #f2f2f2;
    }
  }
}
</style>
