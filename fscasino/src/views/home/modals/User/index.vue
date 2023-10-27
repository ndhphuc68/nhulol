<script setup></script>

<template>
  <div class="user-main">
    <div class="row">
      <div class="col-lg-6 col-12">
        <div class="row mb-3">
          <span class="user-title">General Info</span>
        </div>
        <div class="row user-info p-4">
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">ID Number</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Phone Number</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Regist infor</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Connection info</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Regist IP</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Date of Regist</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Last Access Date</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Last Access IP</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Country</span>
            <span class="text-start">231345646895</span>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-12 mt-4 mb-2 mt-lg-0">
        <div class="row mb-3">
          <span class="user-title">Bank Account Info</span>
        </div>
        <div class="row user-info p-4">
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Bank Name</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Bank Acount</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Acount Holder</span>
            <span class="text-start">231345646895</span>
          </div>
          <div class="d-flex flex-column col-6 mb-3 item-user">
            <span class="text-start">Total Balance</span>
            <span class="text-start">231345646895</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-main {

  @media (max-width: 991.98px) {
    height: 800px;
    overflow-y: scroll;
  }
  .user-info {
    border-radius: 20px;
    background: #fafafa;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);

    .item-user {
      span {
        font-size: 14px;
        font-style: normal;
        line-height: normal;

        &:first-child {
          color: #a1a1aa;
          font-weight: 500;
          margin-bottom: 5px;
        }
        &:last-child {
          color: #3f3f46;
          font-weight: 700;
        }
      }
    }
  }

  .user-title {
    color: var(--light-gradient);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: left;
    margin-left: 10px;
  }
}
</style>
