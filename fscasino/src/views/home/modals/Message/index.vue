<script setup>
import {ref} from "vue";
import {Icons} from "@/const/Icons";
import {message} from "@/views/home/modals/Message/data";
import {formatDate} from "../../../../utils";

const expandable = ref(-1);
const handleExpandable = (index) => {
  if (index === expandable.value) {
    expandable.value = -1;
  } else {
    expandable.value = index;
  }
};
</script>

<template>
  <div class="row message-main">
    <div class="row">
      <div class="col-lg-6 col-12 d-flex justify-content-start align-items-center">
        <div class="d-flex flex-row align-items-center total-message">
          <img class="send-icon me-2" :src="Icons.send" alt="send"/>
          <span>Total Received Messages:&nbsp;</span><span>100</span>
        </div>
      </div>
      <div class="col-6 d-lg-flex d-none justify-content-end">
        <div class="input-search position-relative w-75">
          <img :src="Icons.search" alt="search"/>
          <input type="text" class="form-control" aria-label="Username"/>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="table-main overflow-x-auto w-100">
        <table class="table w-100 header-fixed">
          <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Writer</th>
            <th scope="col">Subject</th>
            <th scope="col">Written Time</th>
          </tr>
          </thead>
          <tbody class="w-100">
          <tr
              @click="handleExpandable(index)"
              :key="index"
              v-for="(item, index) in message"
          >
            <td>
              <div
                  v-if="item.status"
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
              >
                <img :src="Icons.mail" alt="mail"/>
                <span class="ms-2 d-lg-block d-none">Unread</span>
              </div>
              <div
                  v-if="!item.status"
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
              >
                <img :src="Icons.mailOpen" alt="mail"/>
                <span class="ms-2 d-lg-block d-none">Have read</span>
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
              >
                {{ item.write }}
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center flex-column justify-content-center"
              >
                <span class="text-truncate w-100">{{ item.subject }}</span>
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-center"
              >
                <span class="text-truncate w-100">{{ formatDate(item.date) }}</span>
              </div>
            </td>
            <td
                class="expanded-td"
                :class="expandable === index ? 'd-block' : 'd-none'"
            >
              <div class="d-flex flex-row justify-content-start mt-2 ms-3">
                11232312313123131223232
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="w-100 d-flex justify-content-center align-items-center mt-2">
        <el-pagination :page-size="10" layout="prev, pager, next" :total="50">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-main {
  .total-message {
    span {
      &:first-child {
        color: #3f3f46;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      &:last-child {
        color: #d23449;
        font-size: 16px;
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
          display: none
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

            &:nth-child(3) {
              width: 40%;
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
        height: 440px;

        > tr {
          display: block;

          > td {
            display: block;
            width: 20%;
            float: left;
            height: 60px;

            &:nth-child(3) {
              width: 40%;
            }

            &:nth-child(4) {
              @media (max-width: 991.98px) {
                width: 40%;
              }
            }

            &:nth-child(2) {
              @media (max-width: 991.98px) {
                display: none
              }
            }

            img {
              width: 20px;
              height: 20px;
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
