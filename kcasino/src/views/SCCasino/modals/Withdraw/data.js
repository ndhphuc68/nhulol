import {converTime, convertMoney} from "@/utils";


export const titleTable = ["Number", "Deposit Amount","Depositor","Currency Exchange Date","Processing date and time","Memo","Detail","Processing status"]

export const columns = [
    {
        field: "index",
        header: "number",
        isIndex: true,
    },
    {
        field:'wi_money',
        header:'withdrawAmount',
        callback: (amount) => {
            return convertMoney(amount);
        }
    },
    {
        field:'wi_member_account',
        header:'withdrawer'
    },
    {
        field:'wi_created',
        header:'currencyexchangedate',
        callback: (date) => {
            return converTime(date);
        },
    },
    {
        field:'wi_status',
        header:'processingStatus',
        isStatus: true
    }
]



export const inforTable = [
    {
        wi_money: 5000000,
        wi_name: "user012",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_status: "completed"
    },
    {
        wi_money: 11000000,
        wi_name: "user033",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_memo: "Lorem",
        wi_detail: "Detail",
        wi_status: "completed"
    },
    {
        wi_money: 6000000,
        wi_name: "user653",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_memo: "Lorem",
        wi_detail: "Detail",
        wi_status: "failed"
    },
    {
        wi_money: 6000000,
        wi_name: "user653",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_memo: "Lorem",
        wi_detail: "Detail",
        wi_status: "failed"
    },
    {
        wi_money: 6000000,
        wi_name: "user653",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_memo: "Lorem",
        wi_detail: "Detail",
        wi_status: "failed"
    },
    {
        wi_money: 6000000,
        wi_name: "user653",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_memo: "Lorem",
        wi_detail: "Detail",
        wi_status: "failed"
    },
    {
        wi_money: 6000000,
        wi_name: "user653",
        wi_created: "01.01.2023 13:25",
        wi_end_date: "01.01.2023 13:25",
        wi_memo: "Lorem",
        wi_detail: "Detail",
        wi_status: "failed"
    }
]
