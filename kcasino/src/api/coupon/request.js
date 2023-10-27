import { SSRRequest} from "@/api/axios";

export const getListCouponRequest = async (data) => {
    try {
        const res = await SSRRequest({
            url: '/coupon/list/get',
            method: 'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}

export const useCouponRequest = async (data) => {
    try {
        const res = await SSRRequest({
            url: `/coupon/use`,
            method: 'POST',
            data
        })
        return res
    }
    catch (error) {
        console.log(error)
    }
}