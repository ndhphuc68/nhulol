import Profile from "@/assets/Play4G/icon/Sidebars/profile.vue";
import Deposit from "@/assets/Play4G/icon/Sidebars/deposit.vue";
import Withdraw from "@/assets/Play4G/icon/Sidebars/withdraw.vue";
import History from "@/assets/Play4G/icon/Sidebars/history.vue";
import GamGuide from "@/assets/Play4G/icon/Sidebars/gameguide.vue";
import Message from '@/assets/Play4G/icon/Sidebars/message.vue'
import Help from "@/assets/Play4G/icon/Sidebars/help.vue";
import Casino from "@/assets/Play4G/icon/Header/casino.vue";
import Slot from "@/assets/Play4G/icon/Header/slot.vue";

export const menuSidebargame = [
    {
        text: "logo",
        key: "logo",
        href: "/",
    },
    {
        icon: Casino,
        text: "Casino",
        key: "casino",
        href: "Casino",
    },
    {
        icon: Slot,
        text: "Slots",
        key: "slots",
        href: "Slots",
    },
]
export const menuSidebar = [
    {
        icon: Profile,
        text: "Profile",
        key: "profile",
        href: "Profile-page",
    },
    {
        icon: Deposit,
        text: "Deposit",
        key: "deposit",
        href: "Deposit-page",
    },
    {
        icon: Withdraw,
        text: "Withdraw",
        key: "withdraw",
        href: "Withdraw-page",
    },
    {
        icon: History,
        text: "History betting",
        key: "history",
        href: "Betting-history",
    },
    {
        icon: GamGuide,
        text: "GamGuide",
        key: "gameGuide",
        href: "Game-guide",
    },
    {
        icon: Help,
        text: "Help center",
        key: "help",
        href: "Help-center",
    },
    {
        icon: Message,
        text: "Message",
        key: "message",
        href: "message",
    },
];
