import {SSRRequest} from "@/api/axios";

export const getPingRequest = async (memberIdx) => {
    try{
        const res = await SSRRequest({
            url: '/ajax/get/ping',
            method: 'POST',
            data: {
                memberIdx
            }
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}