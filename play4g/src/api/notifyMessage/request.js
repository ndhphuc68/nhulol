import {SSRRequest} from "@/api/axios";

export const getNotifyMessageRequest = async () => {
    const res = await SSRRequest({
        url:'/notify_message/ooo_browser/get',
        method: 'POST'
    })
    return res
}