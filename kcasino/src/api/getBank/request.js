import {SSRRequest} from "@/api/axios";

export const getBankRequest = async () => {
    const res = await SSRRequest({
        url:'/xxxx_config/bank/get',
        method: "GET"
    })
    return res
}