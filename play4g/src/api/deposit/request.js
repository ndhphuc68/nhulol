import {SSRRequest} from "@/api/axios";

export const getListDepositRequest = async data => {
    try{
        const res = await SSRRequest({
            url: '/goods/deposit_list/get',
            method: 'POST',
            data
        })
        return res
    }
    catch (error){
        console.log(error)
    }
}

export const depositRequest = async data => {
    const res = await SSRRequest({
        url: '/deposit/request',
        method: 'POST',

        data
    })
    return res
}

export const depositListRealTime = async () => {
    try {
        const res = await SSRRequest({
            url: '/real_message/deposits/list',
            method: "POST"
        })
        return res
    } catch (e) {
        console.log(e)
    }
}

export const deleteDepositRequest = async (idx, data) => {
    const res = await SSRRequest({
        url:`/deposit/${idx}/delete`,
        method: "POST",
        data
    })
    return res
}
