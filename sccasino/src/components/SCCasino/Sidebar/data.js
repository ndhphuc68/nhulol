import BetRule from "@/assets/SCCasino/icon/sidebar/bet-rule.vue";
import Home from "@/assets/SCCasino/icon/sidebar/home.vue";
import LiveCasino from "@/assets/SCCasino/icon/sidebar/live-casino.vue";
import Slot from "@/assets/SCCasino/icon/sidebar/slot.vue";
import Notice from "@/assets/SCCasino/icon/sidebar/notice.vue";
import SiteMall from "@/assets/SCCasino/icon/sidebar/site-mall.vue";
import MyPage from "@/assets/SCCasino/icon/sidebar/my-page.vue";
import Deposit from "@/assets/SCCasino/icon/sidebar/deposit.vue";
import Withdraw from "@/assets/SCCasino/icon/sidebar/withdraw.vue";
import ServiceCenter from "@/assets/SCCasino/icon/sidebar/service-center.vue";

export const navs = [
    {
        icon: Home,
        text: 'home',
    },
    // {
    //     icon: LiveCasino,
    //     text: 'live',
    //     key: 'Casino'
    // },
    // {
    //     icon: Slot,
    //     text: 'slot',
    //     key: 'Slots'
    // },
    {
        icon: Notice,
        key: 'noticeEventFAQ',
        text: 'notice',
    },
    {
        icon: BetRule,
        text: 'betrule',
        key: 'betrule',
    },
    {
        icon: SiteMall,
        text: 'message',
        key: 'message',
    },
    {
        icon: MyPage,
        text: 'mypage',
        key: 'profile',
    },
    {
        icon: Deposit,
        text: 'deposit',
        key: 'deposit',
    },
    {
        icon: Withdraw,
        text: 'withdraw',
        key: 'withdraw',
    },
    {
        icon: ServiceCenter,
        text: 'service_center',
        key: 'serviceCenter',
    }
]