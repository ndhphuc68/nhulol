import {SSRRequest} from "@/api/axios";

export const getCustomPage = async () => {
    const res = await SSRRequest({
        url:'/xxxx_config/front/get',
        method: "GET"
    })
    return res
}