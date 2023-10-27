import { SSRRequest} from "@/api/axios";

export const getListMessageRequest = async data => {
    try {
        const res = await SSRRequest({
            url: '/memo/list/get',
            method: 'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteMessageRequest = async (idx,data) => {
    const res = await SSRRequest({
        url:`/memo/remove/${idx}`,
        method: "POST",
        data
    })
    return res
}

export const readMessageRequest = async (idx,data) => {
    const res = await SSRRequest({
        url:`/memo/read/${idx}`,
        method: "POST",
        data
    })
    return res
}