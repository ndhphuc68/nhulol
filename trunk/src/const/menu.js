import { fn } from "@/views/list/list.js";
import { toggleShow } from "@/utils/modals";

const pageType = process.env.VUE_APP_PAGE_TYPE;
const getFileName = (object) => {
    switch (object){
        case 'list':
            return "list/List2"
        case 'myPage':
            return "myPage/MyPage2"
        case 'depositRequest':
            return "transaction/DepositRequest2"
        case 'withdrawRequest':
            return "transaction/WithdrawRequest2"
        default :
            return undefined;
    }

}

const menus = [
    { key: "depositRequest", iconOff: require("@/assets/icon/off_4.png"), iconOn: require("@/assets/icon/on_4.png") },
    { key: "withdrawRequest", iconOff: require("@/assets/icon/off_2.png"), iconOn: require("@/assets/icon/on_2.png") },
    { key: "depositHistory", iconOff: require("@/assets/icon/off_6.png"), iconOn: require("@/assets/icon/on_6.png") },
    { key: "withdrawHistory", iconOff: require("@/assets/icon/off_3.png"), iconOn: require("@/assets/icon/on_3.png") },
    { key: "userInfo", iconOff: require("@/assets/icon/off_8.png"), iconOn: require("@/assets/icon/on_8.png") },
    { key: "topic", iconOff: require("@/assets/icon/off_7.png"), iconOn: require("@/assets/icon/on_7.png") },
    /*{ key: "gameGuide", iconOff: require("@/assets/icon/off_5.png"), iconOn: require("@/assets/icon/on_5.png") },*/
    { key: "helpCenter", iconOff: require("@/assets/icon/off.png"), iconOn: require("@/assets/icon/on.png") },
];


const modalMenus = [
    { key: "userInfo", icon: require("@/assets/icon/infor-icon.png"), componentSrc: getFileName('myPage') },
    /*{
        key: "coupon",
        icon: require("@/assets/icon/coupon-icon.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "couponList",
            cols: [
                { key: "no", objKey: "mc_idx", type: "number" },
                { key: "useYn", objKey: "mc_status", type: "string" },
                { key: "sender", objKey: "mc_partner_account", type: "string" },
                { key: "amount", objKey: "mc_money", type: "number" },
                { key: "publishDate", objKey: "mc_created", type: "date" },
                { key: "userPeriod", objKey: "mc_end_date", type: "date" },
                { key: "useDate", objKey: "mc_use_date", type: "date" },
                { key: "use", type: "btn", btnTx: "use", evt: fn.useCoupon },
                //{ key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },*/
    { key: "depositRequest", icon: require("@/assets/icon/icon-deposit.png"), componentSrc: getFileName('depositRequest') },
    { key: "withdrawRequest", icon: require("@/assets/icon/icon-withdraw.png"), componentSrc: getFileName('withdrawRequest') },
    {
        key: "depositHistory",
        icon: require("@/assets/icon/icon-depositHistorty.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "depositList",
            cols: [
                { key: "no", objKey: "de_idx", type: "number" },
                { key: "depositRequestUser", objKey: "de_member_account", type: "string" },
                { key: "depositAmount", objKey: "de_money", type: "number" },
                { key: "status", objKey: "de_status", type: "string" },
                { key: "requestDate", objKey: "de_created", type: "date" },
                { key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },
    {
        key: "withdrawHistory",
        icon: require("@/assets/icon/icon-withdrawHistory.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "withdrawList",
            cols: [
                { key: "no", objKey: "wi_idx", type: "number" },
                { key: "withdrawRequestUser", objKey: "wi_member_account", type: "string" },
                { key: "withdrawAmount", objKey: "wi_money", type: "number" },
                { key: "status", objKey: "wi_status", type: "string" },
                { key: "requestDate", objKey: "wi_created", type: "date" },
                { key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },
    {
        key: "letter",
        icon: require("@/assets/icon/note-icon.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "letterList",
            cols: [
                { key: "no", objKey: "mm_idx", type: "number" },
                { key: "checkYn", type: "check" },
                { key: "title", objKey: "mm_subject", type: "string" },
                { key: "publishDate", objKey: "mm_created", type: "date" },
                { key: "view", type: "btn", btnTx: "view", evt: fn.detailView },
                { key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },
    {
        key: "helpCenter",
        icon: require("@/assets/icon/icon_customer.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "helpList",
            cols: [
                { key: "no", objKey: "cu_idx", type: "number" },
                { key: "title", objKey: "cu_question", type: "string" },
                { key: "status", objKey: "cu_completed", type: "status", statusTx: ["replyReady", "replyComplete"] },
                { key: "view", type: "btn", btnTx: "view", evt: fn.detailView },
                { key: "writeDate", objKey: "cu_created", type: "date" },
            ],
            withButtons: [
                {
                    key: "writeHelp",
                    evt: toggleShow,
                },
            ],
        },
    },
    /*{
        key: "partner",
        icon: require("@/assets/icon/icon_customer.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "helpList",
            cols: [
                { key: "no", objKey: "cu_idx", type: "number" },
                { key: "title", objKey: "cu_question", type: "string" },
                { key: "status", objKey: "cu_completed", type: "status", statusTx: ["replyReady", "replyComplete"] },
                { key: "view", type: "btn", btnTx: "view", evt: fn.detailView },
                { key: "writeDate", objKey: "cu_created", type: "date" },
            ],
            withButtons: [
                {
                    key: "writeHelp",
                    evt: toggleShow,
                },
            ],
        },
    },*/
];

const modalNoDepWidMenus = [
    { key: "userInfo", icon: require("@/assets/icon/infor-icon.png"), componentSrc: getFileName('myPage') },
    /*{
        key: "coupon",
        icon: require("@/assets/icon/coupon-icon.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "couponList",
            cols: [
                { key: "no", objKey: "mc_idx", type: "number" },
                { key: "useYn", objKey: "mc_status", type: "string" },
                { key: "sender", objKey: "mc_partner_account", type: "string" },
                { key: "amount", objKey: "mc_money", type: "number" },
                { key: "publishDate", objKey: "mc_created", type: "date" },
                { key: "userPeriod", objKey: "mc_end_date", type: "date" },
                { key: "useDate", objKey: "mc_use_date", type: "date" },
                { key: "use", type: "btn", btnTx: "use", evt: fn.useCoupon },
                //{ key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },*/
    /*{ key: "depositRequest", icon: require("@/assets/icon/icon-deposit.png"), componentSrc: getFileName('depositRequest') },
    { key: "withdrawRequest", icon: require("@/assets/icon/icon-withdraw.png"), componentSrc: getFileName('withdrawRequest') },*/
    {
        key: "depositHistory",
        icon: require("@/assets/icon/icon-depositHistorty.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "depositList",
            cols: [
                { key: "no", objKey: "de_idx", type: "number" },
                { key: "depositRequestUser", objKey: "de_member_account", type: "string" },
                { key: "depositAmount", objKey: "de_money", type: "number" },
                { key: "status", objKey: "de_status", type: "string" },
                { key: "requestDate", objKey: "de_created", type: "date" },
                { key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },
    {
        key: "withdrawHistory",
        icon: require("@/assets/icon/icon-withdrawHistory.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "withdrawList",
            cols: [
                { key: "no", objKey: "wi_idx", type: "number" },
                { key: "withdrawRequestUser", objKey: "wi_member_account", type: "string" },
                { key: "withdrawAmount", objKey: "wi_money", type: "number" },
                { key: "status", objKey: "wi_status", type: "string" },
                { key: "requestDate", objKey: "wi_created", type: "date" },
                { key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },
    {
        key: "letter",
        icon: require("@/assets/icon/note-icon.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "letterList",
            cols: [
                { key: "no", objKey: "mm_idx", type: "number" },
                { key: "checkYn", type: "check" },
                { key: "title", objKey: "mm_subject", type: "string" },
                { key: "publishDate", objKey: "mm_created", type: "date" },
                { key: "view", type: "btn", btnTx: "view", evt: fn.detailView },
                { key: "delYn", type: "btn", btnTx: "del", evt: fn.deleteRow },
            ],
        },
    },
    {
        key: "helpCenter",
        icon: require("@/assets/icon/icon_customer.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "helpList",
            cols: [
                { key: "no", objKey: "cu_idx", type: "number" },
                { key: "title", objKey: "cu_question", type: "string" },
                { key: "status", objKey: "cu_completed", type: "status", statusTx: ["replyReady", "replyComplete"] },
                { key: "view", type: "btn", btnTx: "view", evt: fn.detailView },
                { key: "writeDate", objKey: "cu_created", type: "date" },
            ],
            withButtons: [
                {
                    key: "writeHelp",
                    evt: toggleShow,
                },
            ],
        },
    },
];

const communityModalMenus = [
    {
        key: "topic",
        icon: require("@/assets/icon/icon_mypage.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "topicList",
            cols: [
                //{ key: "no", objKey: "no_idx", type: "number" },
                { key: "register", objKey: "mc_partner_account", type: "string" },
                { key: "title", objKey: "no_subject", type: "string" },
                { key: "writeDate", objKey: "no_created", type: "date" },
            ],
            listType: "community",
        },
    },
    {
        key: "faq",
        icon: require("@/assets/icon/icon_guide.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "faqList",
            cols: [
                //{ key: "no", objKey: "no_idx", type: "number" },
                { key: "register", objKey: "mc_partner_account", type: "string" },
                { key: "title", objKey: "no_subject", type: "string" },
                { key: "writeDate", objKey: "no_created", type: "date" },
            ],
            listType: "community",
        },
    },
    {
        key: "event",
        icon: require("@/assets/icon/icon_event.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "eventList",
            cols: [
                //{ key: "no", objKey: "no_idx", type: "number" },
                { key: "register", objKey: "mc_partner_account", type: "string" },
                { key: "title", objKey: "no_subject", type: "string" },
                { key: "writeDate", objKey: "no_created", type: "date" },
            ],
            listType: "community",
        },
    },
    /*{ key: "gameGuide", icon: require("@/assets/icon/icon_guide.png"), componentSrc: "list/List" },*/
];

const historyModalMenus = [
    {
        key: "history",
        icon: require("@/assets/icon/icon_mypage.png"),
        componentSrc: getFileName('list'),
        data: {
            flag: "historyList",
            cols: [
                { key: "gameName", objKey: "mgr_game_name", type: "string" },
                { key: "no2", objKey: "mgr_idx", type: "number" },
                { key: "betAmount", objKey: "mgr_bet_money", type: "number" },
                { key: "payAmount", objKey: "mgr_pay_money", type: "number" },
                { key: "winAmount", objKey: "mgr_win_value", type: "number" },
                { key: "loseAmount", objKey: "mgr_lose_value", type: "number" },
                { key: "historyDate", objKey: "mgr_created", type: "date" },
                { key: "view", type: "btn", btnTx: "view", evt: fn.detailView },
            ],
        },
    },
];

const guideModalMenus = [
    "baccarat",
    "blackjack",
    "roulette",
    "sicbo",
    "dragontiger",
    "bullfight",
    "mahjong",
    "holdem",
];

export { modalMenus, menus, communityModalMenus, guideModalMenus, historyModalMenus, modalNoDepWidMenus };
