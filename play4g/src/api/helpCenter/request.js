import { SSRRequest} from "@/api/axios";

export const getListHelpRequest = async data => {
    try{
        const res = await SSRRequest({
            url: '/question/list/get',
            method: 'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const questionContactRequest = async data => {
    const res = await SSRRequest({
        url:'/question/contact/set',
        method: 'POST',
        data
    })
    return res
}

export const deleteHelpCenterRequest = async (idx,data) => {
    const res = await SSRRequest({
        url:`/question/remove/${idx}`,
        method: "POST",
        data
    })
    return res
}