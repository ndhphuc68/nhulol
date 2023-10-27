import {converTime} from "@/utils/SCCasino";

export const columns = [
    {
        field: 'index',
        header: "caseNo."
    },
    {
        field: 'cu_question',
        header: 'content'
    },
    {
        field: 'cu_status',
        header: 'state',
        isStatus: true

    },
    {
        field: 'cu_created',
        callback: (date) => {
            return converTime(date)
        },
        header: 'updateTime'
    }
]


export const inforTable = [
    {
        cu_question: "Question 1",
        cu_status: "COMPLETE",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_status: "COMPLETED"
    },
    {
        cu_question: "Question 1",
        cu_status: "ACTIVE",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "COMPLETED"
    },
    {
        cu_question: "Question 1",
        cu_status: "ACTIVE",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        cu_question: "Question 1",
        cu_status: "fail",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        cu_question: "Question 1",
        cu_status: "fail",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        cu_question: "Question 1",
        cu_status: "ACTIVE",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "REQUEST"
    },
    {
        cu_question: "Question 1",
        cu_status: "COMPLETE",
        cu_created: "20220715",
        de_end_date: "20220715",
        de_memo: "Lorem",
        de_detail: "Detail",
        de_status: "ADMIN_CANCEL"
    }
]
