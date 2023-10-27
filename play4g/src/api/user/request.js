import {SSRRequest} from "@/api/axios";

export const getMeRequest = async data => {
    try{
        const res = await SSRRequest({
            url: '/goods/member/get',
            method: 'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const changeProfileRequest = async (data) => {
    try {
        const res = await SSRRequest({
            url:'/member_new/update',
            method:'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}