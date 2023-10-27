import {SSRRequest} from "@/api/axios";

export const getListWithDrawRequest = async data => {
    try{
        const res = await SSRRequest({
            url: '/goods/withdraw_list/get',
            method: 'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const withdrawRequest = async data => {
    const res = await SSRRequest({
        url: '/withdraw/request',
        method: 'POST',
        data
    })
    return res
}

export const withdrawListRealTime = async () => {
    try {
        const res = await SSRRequest({
            url: '/real_message/withdraws/list',
            method: "POST"
        })
        return res
    } catch (err) {
        console.log(err)
        return null
    }

}

export const deleteWithDrawRequest = async (idx,data) => {
    const res = await SSRRequest({
        url:`/withdraw/${idx}/delete`,
        method: "POST",
        data
    })
    return res
}