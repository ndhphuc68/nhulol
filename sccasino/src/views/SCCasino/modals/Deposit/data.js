
export const titleTable = ["Number", "Deposit Amount","Depositor","Currency Exchange Date","Processing date and time","Memo","Detail","Processing status"]

export const columns = [
    {
        field:'index',
        header:"number"
    },
    {
        field:'de_money',
        header:'depositAmount'
    },
    {
        field:'de_name',
        header:'depositor'
    },
    {
        field:'de_created',
        header:'currencyexchangedate'
    },
    {
        field:'de_status',
        header:'processingStatus'
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
