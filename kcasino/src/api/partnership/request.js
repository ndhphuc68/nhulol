import { SSRRequest} from "@/api/axios";

export const getPartnershipRequest = async () => {
    try{
        const res = await SSRRequest({
            url:'/xxxx_config/get',
            method: 'POST',
        })
        return res
    }
    catch (error){
        console.log(error)
    }
}