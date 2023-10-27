<template>
  <div class="container">
    <h2>{{ $t("coupon") }}</h2>
    <div v-if="isLoading" style="margin-top: 35px">
      <Loading :size="'50'" />
    </div>
<!--    <div v-else>-->
<!--    <div class="title">-->
<!--      <h3>{{ $t("available") }}</h3>-->
<!--    </div>-->
<!--    <div class="list-items">-->
<!--      <div-->
<!--        v-for="(item, index) in listAvailableCoupon"-->
<!--        :key="index"-->
<!--        class="items"-->
<!--      >-->
<!--        <div class="items-content">-->
<!--        <div class="icon">-->
<!--          <svg-->
<!--            fill="none"-->
<!--            height="48"-->
<!--            viewBox="0 0 48 48"-->
<!--            width="48"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--          >-->
<!--            <path-->
<!--              d="M23.9995 0L3.21484 12V36L23.9995 48L44.7842 36V12L23.9995 0Z"-->
<!--              fill="#82D2FF"-->
<!--            />-->
<!--            <path d="M23.9995 24V0L3.21484 12L23.9995 24Z" fill="#08B7FC" />-->
<!--            <path d="M3.21484 12V36L23.9995 24L3.21484 12Z" fill="#006DFF" />-->
<!--            <path d="M44.7847 12L24 24L44.7847 36V12Z" fill="#08B7FC" />-->
<!--            <path d="M23.9995 24L3.21484 36L23.9995 48V24Z" fill="#0050C0" />-->
<!--            <path d="M24 48L44.7847 36L24 24V48Z" fill="#006DFF" />-->
<!--            <path-->
<!--              d="M35.7297 30.7741V17.2294L23.9996 10.457L12.2695 17.2294V30.7741L23.9996 37.5465L35.7297 30.7741Z"-->
<!--              fill="#82D2FF"-->
<!--            />-->
<!--            <path-->
<!--              d="M35.7301 30.7741V17.2294L24 10.457V37.5465L35.7301 30.7741Z"-->
<!--              fill="#55CBFF"-->
<!--            />-->
<!--          </svg>-->
<!--        </div>-->
<!--        <div class="info">-->
<!--          <div class="name-coupon">-->
<!--            <p>{{ item?.mc_subject }}</p>-->
<!--            <span>{{ item?.mc_content }}</span>-->
<!--          </div>-->
<!--          <button>{{ item?.mc_money }}₩</button>-->

<!--        </div>-->
<!--        </div>-->
<!--        <div class="redeem d-flex align-center justify-content-around mt-3">-->
<!--          <span>{{ $t('endDate') }}: {{ convertTimeYYMMDD(item?.mc_end_date) }}</span>-->
<!--          <button class="ms-2" @click="handleUseCoupon(item?.mc_idx)">{{ $t("redeem") }}</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="title">-->
<!--      <h3 v-if="listUsedCoupon.length > 0">{{ $t('used') }}</h3>-->
<!--    </div>-->
<!--    <div class="list-items opacity-50">-->
<!--      <div-->
<!--        v-for="(item, index) in listUsedCoupon"-->
<!--        :key="index"-->
<!--        class="items unavailable"-->
<!--      >-->
<!--        <div class="items-content">-->
<!--        <div class="icon">-->
<!--          <svg-->
<!--            fill="none"-->
<!--            height="48"-->
<!--            viewBox="0 0 48 48"-->
<!--            width="48"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--          >-->
<!--            <path-->
<!--              d="M23.9995 0L3.21484 12V36L23.9995 48L44.7842 36V12L23.9995 0Z"-->
<!--              fill="#82D2FF"-->
<!--            />-->
<!--            <path d="M23.9995 24V0L3.21484 12L23.9995 24Z" fill="#08B7FC" />-->
<!--            <path d="M3.21484 12V36L23.9995 24L3.21484 12Z" fill="#006DFF" />-->
<!--            <path d="M44.7847 12L24 24L44.7847 36V12Z" fill="#08B7FC" />-->
<!--            <path d="M23.9995 24L3.21484 36L23.9995 48V24Z" fill="#0050C0" />-->
<!--            <path d="M24 48L44.7847 36L24 24V48Z" fill="#006DFF" />-->
<!--            <path-->
<!--              d="M35.7297 30.7741V17.2294L23.9996 10.457L12.2695 17.2294V30.7741L23.9996 37.5465L35.7297 30.7741Z"-->
<!--              fill="#82D2FF"-->
<!--            />-->
<!--            <path-->
<!--              d="M35.7301 30.7741V17.2294L24 10.457V37.5465L35.7301 30.7741Z"-->
<!--              fill="#55CBFF"-->
<!--            />-->
<!--          </svg>-->
<!--        </div>-->
<!--        <div class="info">-->
<!--          <div class="name-coupon">-->
<!--            <p>{{ item?.mc_subject }}</p>-->
<!--            <span>{{ item?.mc_content }}</span>-->
<!--          </div>-->
<!--          <button>{{ item?.mc_money }}₩</button>-->
<!--        </div>-->
<!--        </div>-->
<!--        <div class="redeem d-flex align-center justify-content-between mt-3">-->
<!--          <span>{{ $t('endDate') }}: {{ convertTimeYYMMDD(item?.mc_end_date,true) }}</span>-->
<!--          <button class="ms-2">{{ $t("redeem") }}</button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--      <div class="title">-->
<!--        <h3 v-if="listCantUsedCoupon.length > 0">{{ $t('cantUse') }}</h3>-->
<!--      </div>-->
<!--      <div class="list-items  opacity-50">-->
<!--        <div-->
<!--            v-for="(item, index) in listCantUsedCoupon"-->
<!--            :key="index"-->
<!--            class="items unavailable"-->
<!--        >-->
<!--          <div class="items-content">-->
<!--            <div class="icon">-->
<!--              <svg-->
<!--                  fill="none"-->
<!--                  height="48"-->
<!--                  viewBox="0 0 48 48"-->
<!--                  width="48"-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--              >-->
<!--                <path-->
<!--                    d="M23.9995 0L3.21484 12V36L23.9995 48L44.7842 36V12L23.9995 0Z"-->
<!--                    fill="#82D2FF"-->
<!--                />-->
<!--                <path d="M23.9995 24V0L3.21484 12L23.9995 24Z" fill="#08B7FC" />-->
<!--                <path d="M3.21484 12V36L23.9995 24L3.21484 12Z" fill="#006DFF" />-->
<!--                <path d="M44.7847 12L24 24L44.7847 36V12Z" fill="#08B7FC" />-->
<!--                <path d="M23.9995 24L3.21484 36L23.9995 48V24Z" fill="#0050C0" />-->
<!--                <path d="M24 48L44.7847 36L24 24V48Z" fill="#006DFF" />-->
<!--                <path-->
<!--                    d="M35.7297 30.7741V17.2294L23.9996 10.457L12.2695 17.2294V30.7741L23.9996 37.5465L35.7297 30.7741Z"-->
<!--                    fill="#82D2FF"-->
<!--                />-->
<!--                <path-->
<!--                    d="M35.7301 30.7741V17.2294L24 10.457V37.5465L35.7301 30.7741Z"-->
<!--                    fill="#55CBFF"-->
<!--                />-->
<!--              </svg>-->
<!--            </div>-->
<!--            <div class="info">-->
<!--              <div class="name-coupon">-->
<!--                <p>{{ item?.mc_subject }}</p>-->
<!--                <span>{{ item?.mc_content }}</span>-->
<!--              </div>-->
<!--              <button>{{ item?.mc_money }}</button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="redeem d-flex align-center justify-content-between mt-3">-->
<!--            <span>{{ $t('endDate') }}: {{ convertTimeYYMMDD(item?.mc_end_date,true) }}</span>-->
<!--            <button class="ms-2">{{ $t("redeem") }}</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div v-else>
      <div class="d-none d-md-block">
      <table class="text-center" style="width: 100%" >
        <thead>
          <tr>
            <th>#</th>
            <th>{{$t('subject')}}</th>
            <th>{{$t('content')}}</th>
            <th>{{$t('new_money')}}</th>
            <th>{{$t('endDate')}}</th>
            <th>{{$t('action')}}</th>
          </tr>
        </thead>
        <tbody>
        <tr  v-for="(item, index) in displayData" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{item?.mc_subject}}</td>
          <td>{{ item?.mc_content }}</td>
          <td>{{item?.mc_money}}₩</td>
          <td>{{ convertTimeYYMMDD(item?.mc_end_date)}}</td>
          <td v-if="item?.mc_status ==='NORMAL'"><button :class="item?.mc_end_date < timeNow ? 'expired' :'use'" @click="item?.mc_end_date < timeNow ? '' :handleUseCoupon(item?.mc_idx)">{{ item?.mc_end_date < timeNow ? $t('expired') :$t('use') }}</button></td>
          <td v-else><button class="used">{{item?.mc_status ==='USED' ? $t('used') : $t('cantUse') }}</button></td>
        </tr>
        </tbody>
      </table>
      </div>
      <div class="d-md-none">
        <article class="item-mobile mt-4"  v-for="(item, index) in displayData" :key="index">
          <div class="item-content">
            <div>#</div>
            <div>{{ index + 1 }}</div>
          </div>
          <div class="item-content">
            <div>{{$t('subject')}}</div>
            <div>{{item?.mc_subject}}</div>
          </div>
          <div class="item-content">
            <div>{{$t('content')}}</div>
            <div>{{ item?.mc_content }}</div>
          </div>
          <div class="item-content">
            <div>{{$t('new_money')}}</div>
            <div>{{item?.mc_money}}₩</div>
          </div>
          <div class="item-content">
            <div>{{$t('endDate')}}</div>
            <div>{{ convertTimeYYMMDD(item?.mc_end_date)}}</div>
          </div>
          <div class="item-content" v-if="item?.mc_status ==='NORMAL'">
            <div>{{$t('action')}}</div>
            <div><button :class="item?.mc_end_date < timeNow ? 'expired' :'use'" @click="item?.mc_end_date < timeNow ? '' :handleUseCoupon(item?.mc_idx)">{{ item?.mc_end_date < timeNow ? $t('expired') :$t('use') }}</button></div>
          </div>
          <div class="item-content" v-else>
            <div>{{$t('action')}}</div>
            <div><button class="used">{{item?.mc_status ==='USED' ? $t('used') : $t('cantUse') }}</button></div>
          </div>
        </article>
      </div>
      <div class="wrapper-pagination mt-3">
        <v-pagination
            @click="scrollToTop"
            v-model="currentPage"
            :length="Math.ceil(listCoupon?.length / itemsPerPage)"
            rounded="0"
            v-if="Math.ceil(listCoupon?.length / itemsPerPage)>1"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { convertTimeYYMMDD } from "@/utils";
import {computed, onMounted, ref} from "vue";
import { useStore } from "vuex";
import Loading from "@/components/EDGames/Loading";

const store = useStore()
const isLoading = ref(true);
const userInfor = computed(() => store.state.user.userInfor);
const listCoupon = computed(() => store.state.coupon.listCoupon)
const timeNow = Date.now()/1000
const currentPage = ref(1);
const itemsPerPage = 10;
const displayData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return listCoupon?.value?.slice(startIndex, endIndex);
});

onMounted(async () => {
  await store.dispatch('getlistCouponAction',{
    memberIdx: userInfor.value.me_idx,
    inviteCode: userInfor.value.me_invite_code,
    nickName: userInfor.value.me_nickname,
  })
  isLoading.value=false
})

const handleUseCoupon = async (idx) => {
  let data = {
    memberIdx: userInfor.value.me_idx,
    couponIdx: idx,
  }
  store.commit("handleUpdateLoading", true);
  let res = await store.dispatch('useCouponAction',data)
  if(res?.is_success) {
    await store.dispatch('getlistCouponAction',{
      memberIdx: userInfor.value.me_idx,
      inviteCode: userInfor.value.me_invite_code,
      nickName: userInfor.value.me_nickname,
    })
  }
  store.commit("handleUpdateLoading", false);
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  // document.getElementsByTagName("html").animate({scrollTop:0},"smooth")
};

</script>

<style lang="scss" scoped>
.container {
  min-height: 360px;
}
table {
  th,td {
    max-width: 200px;
    border: 0.5px solid #dee2e6;
    padding: 0.5rem;
  }
}
button {
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  @media(max-width: 767px) {
    padding: 0.2rem 1rem;
  }
}
.use {
  background: #41bd5c;
  color: #fff;
}
.expired {
  background: red;
  color: #fff;
  &:hover {
    cursor: no-drop;
  }
}
.used {
  background: #fffbeb;
  color: #de6777;
  &:hover {
    cursor: no-drop;
  }
}
.item-mobile {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  .item-content {
    display: grid;
    grid-template-columns: 35% 65%;
    padding: 1rem 0.5rem;

    &:nth-child(odd) {
      background: #dee2e6;
      &:first-child {
        border-radius: 10px 10px 0 0;
      }
    }
    div {
      &:last-child {
        text-align: right;
      }
    }
  }
}
.wrapper-pagination {
  width: 80%;
  margin: auto;
}













.title h3 {
  margin: 2rem 0;
}

//.list-items {
//  display: grid;
//  grid-template-columns: 1fr 1fr;
//  grid-gap: 24px;
//  .items {
//    border-radius: 6px;
//    border: 1px solid #e4e4e7;
//    padding: 25px;
//    button {
//      border-radius: 4px;
//      border: 1px solid #e4e4e7;
//      padding: 5px 8px;
//    }
//    .redeem button {
//      background-color: #254ee0;
//      color: #ffffff;
//      padding: 5px 15px;
//    }
//  }
//
//  .items-content {
//    display: flex;
//    justify-content: space-around;
//    gap: 0.5rem;
//    .name-coupon {
//      margin-bottom: 0.5rem;
//
//      p {
//        font-weight: 700;
//        font-size: 1.2rem;
//        margin-bottom: 0.5rem;
//      }
//    }
//
//    button {
//      border-radius: 4px;
//      border: 1px solid #e4e4e7;
//      padding: 5px 8px;
//    }
//
//    .redeem button {
//      background-color: #254ee0;
//      color: #ffffff;
//      padding: 5px 15px;
//    }
//  }
//
//  span {
//    color: #52525b;
//  }
//}
//.unavailable {
//  &:hover {
//    cursor: no-drop;
//  }
//  button {
//    &:hover {
//      cursor: no-drop;
//    }
//  }
//}
//
//@media (max-width: 767px) {
//  .list-items {
//    grid-template-columns: 1fr;
//
//    .items {
//      padding: 10px;
//    }
//  }
//}
</style>
