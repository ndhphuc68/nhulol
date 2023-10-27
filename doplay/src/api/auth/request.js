import {SSRRequest} from "@/api/axios";

export const loginRequest = async data => {
    const res = await SSRRequest({
        url: '/authentication/ooo_browser/login',
        method: 'POST',
        data
    })
    return res
}

export const signUpRequest = async data => {
    const res = await SSRRequest({
        url: '/authentication/ooo_browser/join',
        method: 'POST',
        data
    })
    return res
}

export const logoutRequest = async () => {
    const res = await SSRRequest({
        url: '/authentication/ooo_browser/logout',
        method: 'POST'
    })
    return res
}