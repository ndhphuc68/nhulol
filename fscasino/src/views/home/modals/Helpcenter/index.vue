<script setup>
import {ref} from "vue";
import {Icons} from "@/const/Icons";
import {data} from "@/views/home/modals/Helpcenter/data";
import {handleCloseModal} from "@/utils";
import Calendar from "primevue/calendar";

const dateStart = ref(new Date());
const dateEnd = ref(new Date());
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
  <div class="help-center-main">
    <div class="row mb-3">
      <div class="d-flex flex-lg-row justify-content-lg-between w-100 flex-column-reverse help-center-header">
        <span class="text-start my-2 my-lg-0">Query List</span>
        <button class="my-3 my-lg-0 px-3 py-2"
                @click="
            handleCloseModal('createHelp');
            handleCloseModal('helpCenter');
          "
        >
          <img :src="Icons.edit" class="me-1" alt="edit"/>Query Creation
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-12 d-flex justify-content-lg-start justify-content-center align-items-center">
        <Calendar class="me-1" v-model="dateStart" showIcon/>
        <span>&ensp;-&ensp;</span>
        <Calendar v-model="dateEnd" showIcon/>
      </div>
      <div class="col-6 d-none d-lg-flex justify-content-end">
        <div class="input-search position-relative w-50">
          <img :src="Icons.search" alt="search"/>
          <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
          />
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="table-main overflow-x-auto w-100">
        <table class="table w-100 header-fixed">
          <thead>
          <tr>
            <th scope="col">Case No.</th>
            <th scope="col">Content</th>
            <th scope="col">Writer</th>
            <th scope="col">State</th>
            <th scope="col">Update Time</th>
          </tr>
          </thead>
          <tbody>
          <tr
              @click="handleExpandable(index)"
              :key="index"
              v-for="(item, index) in data.slice(0, 5)"
          >
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-between"
              >
                <span class="d-lg-none">ID</span>
                <span>{{ item.id }}</span>
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-between"
              >
                <span class="d-lg-none">Content</span>
                <span class="text-truncate text-end text-content">{{ item.content }}</span>
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-between"
              >
                <span class="d-lg-none">{{ item.write }}</span>
                <span>{{ item.write }}</span>
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-between"
              >
                <span class="d-lg-none text-start ">Status</span>
                <span class="complete ">{{ item.state }}</span>
              </div>
            </td>
            <td>
              <div
                  class="h-100 w-100 d-flex align-items-center justify-content-between"
              >
                <span class="d-lg-none">Date</span>
                <span>{{ item.date }}</span>
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
      <!--      <div class="w-100 d-flex justify-content-center align-items-center mt-2">-->
      <!--        <el-pagination :page-size="10" layout="prev, pager, next" :total="50">-->
      <!--        </el-pagination>-->
      <!--      </div>-->
    </div>
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
              width: 30%;
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
        height: 450px;

        > tr {
          display: block;

          @media (max-width: 991.98px) {
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            border: 1px solid #E4E4E7;
            margin-bottom: 10px;
            padding: 15px;
          }

          > td {
            display: block;
            width: 20%;
            float: left;
            height: 60px;

            .text-content{
              width:170px
            }

            &:first-child {
              width: 10%;
              @media (max-width: 991.98px) {
                width: 100%;
              }
            }

            &:nth-child(2) {
              width: 30%;
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

            @media (max-width: 991.98px) {
              width: 100%;
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

            .warning {
              border-radius: 20px;
              background: #fffbeb;
              color: #d97706;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: normal;
              padding: 5px 10px;
            }

            .complete {
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