<template>
  <div class="notice">
    <div class="notice_head">
      <h3 class="m-0">
        {{ $t('notice') }}
        <svg
          width="29"
          height="37"
          viewBox="0 0 29 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.0002 26.6667L18.3335 18.3333L10.0002 10"
            stroke="#3F3F46"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </h3>
    </div>
    <div class="notice_body mt-5">
      <div class="notice_item p-2 " v-for="(i, index) in 4" :key="index">
        <div class="content_title">
          <h4 class="m-0">How can i withdraw money?</h4>
        </div>
        <p>
          {{ handleFormatDate(new Date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

const handleFormatDate = (date) =>{

  const getYear = date.getFullYear();
  const getMonth = `${date.getMonth() + 1}`.padStart(2,'0');
  const getDay = `${date.getDay()}`.padStart(2,'0')
  
  const formatDate = [getDay,getMonth,getYear].join('.')
  return formatDate
}
</script>

<style lang="scss" scoped>
.notice {
  padding-left: 12px !important;
  .notice_head {
    height: 54px;
    h3 {
      height: 100%;
      line-height: 54px;
      color: var(--primaryCasinoClub);
      font-size: 32px;
      font-weight: 900;
      svg {
        margin-left: 8px;
        transform: translateY(-6%);
      }
    }
  }
  .notice_body {
    display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    .notice_item {
      background-color: #d3d3d833;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        cursor: pointer;
        background-color: #fff;
        box-shadow: #64646f33 0px 7px 29px 0px;
        transform: translateY(1%);
      }
      p{
        margin:16px 0 0 0;
        font-size: 14px;
        font-weight: 500;
        color: #71717A;
      }
    }
  }
}

@media(max-width:992px){
  .notice{
    margin-top: 40px;
    padding: 0 !important;
    .notice_body{
      margin-top: 2rem !important;
    }
  }
}
@media (max-width: 768px) {
  .content_title {
    h4 {
    font-size: 16px !important;
  }
  }
}
@media (max-width: 575px) {
  .notice {
    padding: 0 12px !important;
  }
}
</style>
