import {SSRRequest} from "@/api/axios";

export const getBettingHistoryRequest = async (pageIdx) => {
    const res = await SSRRequest({
        url: `/game_history/get/${pageIdx}`,
        method:'GET'
    })
    return res
}

export const getDetailBetting = async ({idx,game_code,game_name}) => {
    const res = await SSRRequest({
        url:`/admin/game_detail_history/${idx}/${game_code}/${game_name}`,
        method: "GET"
    })
    return res
}