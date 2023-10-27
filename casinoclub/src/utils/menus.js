import Coin from '@/assets/icon/sidebar/Coin'
import slots from '@/assets/icon/sidebar/slots'
import myPage from '@/assets/icon/sidebar/my-page'
import deposit from '@/assets/icon/sidebar/deposit'
import receipts from '@/assets/icon/sidebar/receipts'
import withdrawl from '@/assets/icon/sidebar/withdrawl'
import event from '@/assets/icon/sidebar/event'
import message from '@/assets/icon/sidebar/message'
import helpCenter from '@/assets/icon/sidebar/help-center'
import gameGuide from '@/assets/icon/sidebar/game-guide'
import notice from '@/assets/icon/sidebar/notice'

const handleScrollTabGame = () => {
    const element = document.getElementById("tabGame");
    element.scrollIntoView({ behavior: "smooth" });
}
export const menus1 = [
    {
        icon: Coin,
        text: "Casino",
        idx: 0,
        key: "casino",
        onClick : handleScrollTabGame
    },
    {
        icon: slots,
        text: "Slot",
        idx: 1,
        key: "slots",
        onClick : handleScrollTabGame
    },
    {
        icon: myPage,
        text: "My Page",
        modalKey: "personal",
        idx: 0,
        key: "mypage",
    },
    {
        icon: deposit,
        text: "Deposit",
        modalKey: "personal",
        idx: 1,
        key: "deposit",
    },
    {
        icon: receipts,
        text: "Deposit History",
        modalKey: "personal",
        idx: 3,
        key: "depositHistory",
    },
    {
        icon: withdrawl,
        text: "Withdrawal",
        modalKey: "personal",
        idx: 2,
        key: "withdrawal",
    },
    {
        icon: receipts,
        text: "Withdrawal History",
        modalKey: "personal",
        idx: 4,
        key: "withdrawalHistory",
    },
    {
        icon: event,
        text: "Event",
        modalKey: "notice",
        idx: 2,
        key: "event",
    },
/*    {
        icon: coupon,
        text: "Coupon",
        modalKey: "personal",
        idx: 5,
        key: "coupon"
    },*/
    {
        icon: message,
        text: "Message",
        modalKey: "personal",
        idx: 5,
        key: "message",
    },
    {
        icon: helpCenter,
        text: "Help center",
        modalKey: "personal",
        idx: 6,
        key: "helpcenter",
    },
    {
        icon: gameGuide,
        text: "Game guide",
        modalKey: "gameGuide",
        idx: 0,
        key: "gameguide",
    },
    {
        icon: notice,
        text: "Notice",
        modalKey: "notice",
        idx: 0,
        key: "notice",
    },
];

// export const menus2 = [
//     {
//     icon: 'notice.png', text : "Notice"},
//     { icon: 'bet-rule.png', text : "Bet Rule"},
//     { icon: 'site-mail.png', text : "Site Mall"},
//     { icon: 'my-page.png', text : "My Page"},
//     { icon: 'ranking-event.png', text : "Ranking Event"},
//     { icon: 'desposit.png', text : "Deposit"},
//     { icon: 'withdrawal.png', text : "Withdrawal"},
//     { icon: 'betting-history.png', text : "Betting History"},
//     { icon: 'point-details.png', text : "Point Details"},
//     { icon: 'balance-history.png', text : "Balance History"},
//     { icon: 'service-center.png', text : "Service Center"},
// ];
export const dailyWithdraws = [
    {id: 1, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
    {id: 2, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
    {id: 3, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
    {id: 4, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
];
export const sailyDeposits = [
    {id: 1, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
    {id: 2, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
    {id: 3, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
    {id: 4, date: "1/15/12", name: "Brooklyn Simmons", money: "$396.84"},
];
