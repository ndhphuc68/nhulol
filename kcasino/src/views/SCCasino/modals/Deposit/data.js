import i18n from "@/locales/i18n";
import { converTime, convertMoney } from "@/utils";

export const titleTable = ["Number", "Deposit Amount","Depositor","Currency Exchange Date","Processing date and time","Memo","Detail","Processing status"]

export const columns = [
    {
        field: "index",
        header: "number",
        isIndex: true,
    },
    {
        field:'de_money',
        header:'depositAmount',
        callback: (amount) => {
            return convertMoney(amount);
        },
    },
    {
        field:'de_member_account',
        header:'depositor'
    },
    {
        field:'de_created',
        header:'currencyexchangedate',
        callback: (date) => {
            return converTime(date);
        },
    },
    {
        field:'de_status',
        header:'processingStatus',
        isStatus: true
    }
]



export const inforTable = [
    {
        de_money: 5000000,
        de_name: "user012",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_status: "COMPLETED"
    },
    {
        de_money: 11000000,
        de_name: "user033",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "COMPLETED"
    },
    {
        de_money: 6000000,
        de_name: "user653",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        de_money: 6000000,
        de_name: "user653",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        de_money: 6000000,
        de_name: "user653",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        de_money: 6000000,
        de_name: "user653",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        de_money: 6000000,
        de_name: "user653",
        de_created: "01.01.2023 13:25",
        de_end_date: "01.01.2023 13:25",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "ADMIN_CANCEL"
    }
]
