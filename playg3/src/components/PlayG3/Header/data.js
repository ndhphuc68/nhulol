import Casino from '@/assets/PlayG3/icon/header/casino.vue'
import Slot from "@/assets/PlayG3/icon/header/slot.vue";
import Deposit from "@/assets/PlayG3/icon/header/deposit.vue";
import Withdraw from "@/assets/PlayG3/icon/header/withdraw.vue";
import HistoryBetting from "@/assets/PlayG3/icon/header/history-betting.vue";
import HelpCenter from "@/assets/PlayG3/icon/header/help-center.vue";
import GameGuide from "@/assets/PlayG3/icon/header/game-guide.vue";

export const navList = [
    {
        href: "casino",
        text: 'casino',
        icon: Casino,
        name: "Casino",
    },
    {
        href: "slot",
        icon: Slot,
        text: 'slot',
        name: "Slot",
    },
    {
        href: "deposit",
        icon: Deposit,
        text: "deposit",
        name: "Deposit",
    },
    {
        href: "withdrawal",
        icon: Withdraw,
        text: "withdrawal",
        name: "Withdrawal",
    },
    {
        href: "betting-history",
        icon: HistoryBetting,
        text:'bettingHistory',
        name: "BettingHistory",
    },
    {
        href: "help-center",
        icon : HelpCenter,
        text: 'helpCenter',
        name: "HelpCenter",
    },
    {
        href: "message",
        icon : GameGuide,
        text: 'message',
        name: "Message",
    },
    {
        href: "gameGuide",
        icon : GameGuide,
        text: 'gameGuide',
        name: "GameGuide",
    }
]