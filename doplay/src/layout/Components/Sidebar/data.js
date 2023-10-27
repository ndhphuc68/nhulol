import Coin from '@/assets/icon/sidebars/Coin'
import slots from '@/assets/icon/sidebars/slots'
import myPage from '@/assets/icon/sidebars/my-page'
import deposit from '@/assets/icon/sidebars/deposit'
import withdrawl from '@/assets/icon/sidebars/withdrawl'
import event from '@/assets/icon/sidebars/event'
// import coupon from '@/assets/icon/sidebars/coupon'
// import message from '@/assets/icon/sidebars/message'
import helpCenter from '@/assets/icon/sidebars/help-center'
import gameGuide from '@/assets/icon/sidebars/game-guide'
import notice from '@/assets/icon/sidebars/notice'
import sitemail from '@/assets/icon/sidebars/sitemail'


import Personal from '@/views/Modals/Personal'
import Game from '@/views/Modals/Game'

export const menus = [
    {
        icon: Coin,
        text: "Casino",
        key: "casino",
        idxTab: 0,
        modalKey: 'game',
        modalComponent: Game,
        // onClick : handleScrollTabGame
    },
    {
        icon: slots,
        text: "Slot",
        key: "slots",
        modalKey: 'game',
        modalComponent: Game,
        idxTab: 1,
        // onClick : handleScrollTabGame
    },
    {
        icon: event,
        text: "Event",
        modalKey: "notice",
        modalComponent: Personal,
        key: "event",
        idxTab: 0,

    },
    {
        icon: notice,
        text: "Notice",
        modalKey: "notice",
        modalComponent: Personal,
        key: "notice",
        idxTab: 0,

    },
    {
        icon: gameGuide,
        text: "Bet Rule",
        key: "betrule",
        modalKey: "personal",
        modalComponent: Personal,
        idxTab: 1,

    },
    {
        icon: sitemail,
        text: "Site Mail",
        key: "sitemail",
        modalKey: "personal",
        modalComponent: Personal,
        idxTab: 2,

    },
    {
        icon: myPage,
        text: "My Page",
        key: "mypage",
        modalKey: "personal",
        modalComponent: Personal,
        idxTab: 3,
    },
    {
        icon: deposit,
        text: "Deposit",
        modalKey: "personal",
        modalComponent: Personal,
        key: "deposit",
        idxTab: 4,
    },
    {
        icon: withdrawl,
        text: "Withdrawal",
        modalKey: "personal",
        modalComponent: Personal,
        key: "withdrawal",
        idxTab: 5,

    },
    // {
    //     icon: coupon,
    //     text: "Coupon",
    //     modalKey: "personal",
    //     key: "coupon",
    //     idxTab: 0,
    // },
    // {
    //     icon: message,
    //     text: "Message",
    //     modalKey: "personal",
    //     key: "message",
    //     idxTab: 0,
    //
    // },
    {
        icon: helpCenter,
        text: "Help center",
        modalKey: "personal",
        modalComponent: Personal,
        key: "helpcenter",
        idxTab: 6,

    }


];