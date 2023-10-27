<script setup>
import { computed, ref } from "vue";
import { Icons } from "@/const/Icons";
import { formatDate } from "@/utils";
import { useStore } from "vuex";
import AlertModal from "@/components/EDGames/modal/AlertModal.vue";
import { useI18n } from "vue-i18n";

import EmptyData from "@/components/FSCasino/EmptyData";

const { t } = useI18n();
const store = useStore();

const listMessage = computed(() => store.state.message.listMessage);
const totalMessage = computed(() => store.getters.countMessage);
const userInfor = computed(() => store.state.user.userInfor);

const expandable = ref(-1);
const idDelete = ref("");
const toggleAlert = ref(false);

const handleExpandable = async (index, idx, date) => {
  if (index === expandable.value) {
    expandable.value = -1;
  } else {
    expandable.value = index;
    if (date === 0) {
      let data = {
        memberIdx: userInfor.value.me_idx,
        mInviteCode: userInfor.value.me_invite_code,
        mNickName: userInfor.value.me_nickname,
      };
      await store.dispatch("readMessageAction", { idx, data });
    }
  }
};

const handleDeleteMessage = async () => {
  const res = await store.dispatch("deleteMessageAction", {
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

const handleDelete = (id) => {
  idDelete.value = id;
  handleToggleAlert();
};

const handleToggleAlert = () => (toggleAlert.value = !toggleAlert.value);
</script>

<template>
  <div class="row message-main">
    <div class="row">
      <div
        class="col-lg-6 col-12 d-flex justify-content-start align-items-center"
      >
        <div class="d-flex flex-row align-items-center total-message">
          <img class="send-icon me-2" :src="Icons.send" alt="send" />
          <span>{{ $t("totalMessage") }}:&nbsp;</span
          ><span>{{ totalMessage }}</span>
        </div>
      </div>
      <div class="col-6 d-lg-flex d-none justify-content-end">
        <div class="input-search position-relative w-75">
          <!--          <img :src="Icons.search" alt="search"/>-->
          <!--          <input type="text" class="form-control" aria-label="Username"/>-->
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="table-main overflow-x-auto w-100">
        <table class="table w-100 header-fixed">
          <thead>
            <tr>
              <th scope="col" class="text-center">{{ $t("status") }}</th>
              <th scope="col" class="text-center">{{ $t("writer") }}</th>
              <th scope="col" class="text-center">{{ $t("title") }}</th>
              <th scope="col" class="text-center">{{ $t("date") }}</th>
              <th scope="col" class="text-center">{{ $t("action") }}</th>
            </tr>
          </thead>
          <tbody class="w-100">
            <EmptyData v-if="listMessage.length === 0" />
            <tr
              v-else
              @click="handleExpandable(index, item.mm_idx, item.mm_read_date)"
              :key="index"
              v-for="(item, index) in listMessage"
            >
              <td>
                <div
                  v-if="item.mm_read_date === 0"
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
                >
                  <img :src="Icons.mail" alt="mail" />
                  <span
                    class="ms-2 text-center d-lg-block d-none font-weight-bold"
                    >{{ $t("check_no") }}</span
                  >
                </div>
                <div
                  v-else
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
                >
                  <img :src="Icons.mailOpen" alt="mail" />
                  <span class="ms-2 text-center d-lg-block d-none">{{
                    $t("check_yes")
                  }}</span>
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
                >
                  <span
                    :class="item.mm_read_date === 0 && 'font-weight-bold'"
                    class="text-center"
                    >{{ item.mm_partner_nickname }}</span
                  >
                </div>
              </td>
              <td>
                <div
                  class="h-100 d-flex align-items-center flex-column justify-content-center"
                >
                  <span
                    :class="item.mm_read_date === 0 && 'font-weight-bold'"
                    class="text-center w-100 message-title"
                    >{{ item.mm_subject }}</span
                  >
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex flex-column align-items-center justify-content-center"
                >
                  <span
                    :class="item.mm_read_date === 0 && 'font-weight-bold'"
                    class="text-center w-100"
                    >{{ formatDate(item.mm_created) }}</span
                  >
                  <span class="d-lg-none text-center w-100">{{
                    item.mm_partner_nickname
                  }}</span>
                </div>
              </td>
              <td>
                <div
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
                >
                  <span
                    @click="handleDelete(item.mm_idx)"
                    class="text-center w-100"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="21"
                      viewBox="0 0 18 21"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.5 2.97801V3.20501C14.799 3.3238 16.0927 3.4946 17.378 3.71701C17.4751 3.73382 17.5678 3.76958 17.6511 3.82225C17.7343 3.87491 17.8063 3.94346 17.8631 4.02397C17.9198 4.10448 17.9601 4.19537 17.9817 4.29146C18.0033 4.38755 18.0058 4.48696 17.989 4.58401C17.9722 4.68106 17.9364 4.77384 17.8838 4.85707C17.8311 4.9403 17.7626 5.01233 17.682 5.06907C17.6015 5.12581 17.5106 5.16613 17.4146 5.18774C17.3185 5.20935 17.2191 5.21182 17.122 5.19501L16.913 5.16001L15.908 18.23C15.8501 18.9836 15.5098 19.6875 14.9553 20.2011C14.4008 20.7146 13.6728 21 12.917 21H5.08401C4.3282 21 3.60026 20.7146 3.04573 20.2011C2.4912 19.6875 2.15095 18.9836 2.09301 18.23L1.08701 5.16001L0.878007 5.19501C0.78096 5.21182 0.681552 5.20935 0.58546 5.18774C0.489368 5.16613 0.398473 5.12581 0.317964 5.06907C0.15537 4.95449 0.0449542 4.78 0.0110065 4.58401C-0.0229412 4.38801 0.0223602 4.18656 0.136945 4.02397C0.25153 3.86137 0.426012 3.75096 0.622007 3.71701C1.90727 3.49433 3.20099 3.32353 4.50001 3.20501V2.97801C4.50001 1.41401 5.71301 0.078009 7.31601 0.027009C8.43872 -0.00892162 9.56229 -0.00892162 10.685 0.027009C12.288 0.078009 13.5 1.41401 13.5 2.97801ZM7.36401 1.52601C8.45473 1.49113 9.54629 1.49113 10.637 1.52601C11.39 1.55001 12 2.18401 12 2.97801V3.09101C10.0018 2.96966 7.99817 2.96966 6.00001 3.09101V2.97801C6.00001 2.18401 6.60901 1.55001 7.36401 1.52601ZM7.00901 7.47101C7.0052 7.37252 6.98203 7.27574 6.94082 7.1862C6.89961 7.09667 6.84117 7.01612 6.76883 6.94917C6.69649 6.88222 6.61168 6.83017 6.51923 6.796C6.42678 6.76183 6.3285 6.7462 6.23001 6.75001C6.13152 6.75382 6.03474 6.77699 5.9452 6.8182C5.85567 6.85941 5.77512 6.91785 5.70817 6.99019C5.64122 7.06252 5.58917 7.14734 5.555 7.23979C5.52083 7.33224 5.5052 7.43052 5.50901 7.52901L5.85601 16.529C5.8637 16.7278 5.95004 16.9154 6.09604 17.0505C6.16833 17.1174 6.25309 17.1694 6.34548 17.2036C6.43787 17.2377 6.53608 17.2533 6.63451 17.2495C6.73293 17.2457 6.82964 17.2225 6.91912 17.1814C7.0086 17.1402 7.08909 17.0818 7.15599 17.0095C7.22289 16.9372 7.27491 16.8524 7.30905 16.76C7.3432 16.6676 7.35881 16.5694 7.35501 16.471L7.00901 7.47101ZM12.489 7.52901C12.4963 7.42863 12.4834 7.32779 12.4509 7.23252C12.4185 7.13725 12.3672 7.04948 12.3001 6.97445C12.233 6.89942 12.1515 6.83866 12.0604 6.7958C11.9694 6.75293 11.8706 6.72883 11.77 6.72494C11.6694 6.72104 11.5691 6.73743 11.475 6.77313C11.3809 6.80883 11.2949 6.8631 11.2222 6.93272C11.1496 7.00234 11.0916 7.08587 11.0519 7.17835C11.0122 7.27083 10.9915 7.37036 10.991 7.47101L10.644 16.471C10.6363 16.6699 10.708 16.8637 10.8432 17.0098C10.9784 17.1559 11.1661 17.2423 11.365 17.25C11.5639 17.2577 11.7577 17.1861 11.9038 17.0508C12.0499 16.9156 12.1363 16.7279 12.144 16.529L12.489 7.52901Z"
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
                    item.mm_subject
                  }}</span>
                  <span>{{ item.mm_content }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="w-100 d-flex justify-content-center align-items-center mt-2"
      ></div>
    </div>
  </div>
  <div v-if="toggleAlert">
    <AlertModal
      :des="$t('do you really want to delete?')"
      :handleClose="handleToggleAlert"
      :handleAccept="() => handleDeleteMessage()"
    />
  </div>
</template>

<style scoped lang="scss">
.message-main {
  .total-message {
    span {
      &:first-child {
        color: #3f3f46;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &:last-child {
        color: #d23449;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
      }
    }

    .send-icon {
      width: 17px;
      height: 17px;
    }
  }

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
            display: block;
            width: 20%;
            float: left;
            color: #52525b;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            @media(max-width: 375px) {
              font-size: 12px;
            }

            &:nth-child(3) {
              width: 30%;
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
        height: 530px;

        > tr {
          display: block;
          height: fit-content;

          > td {
            display: block;
            width: 20%;
            float: left;
            height: 60px;
            overflow: hidden;
            @media(max-width: 375px){
              padding: 3px;
            }
            &:nth-child(1) {
              @media (max-width: 991.98px) {
                width: 10%;
              }
            }

            &:nth-child(3) {
              width: 30%;
              @media (max-width: 991.98px) {
                width: 50%;
              }
            }

            &:nth-child(5) {
              width: 10%;
            }

            &:nth-child(4) {
              @media (max-width: 991.98px) {
                width: 30%;
              }
            }

            &:nth-child(2) {
              @media (max-width: 991.98px) {
                display: none;
              }
            }

            img {
              width: 20px;
              height: 20px;
            }
            .message-title {
              max-width: 17rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              @media(max-width: 375px) {
                max-width: 7rem;
              }
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

      border-radius: 20px;
      border: 1px solid #f1c0c7;
      background: #f9e2e5;
      padding: 0 16px;
      @media(max-width: 375px) {
        font-size: 12px;
      }

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
