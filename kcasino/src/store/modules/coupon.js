import {
   getListCouponRequest,
    useCouponRequest
} from "@/api/coupon/request";
import store from "@/store";
import i18n from "@/locales/i18n";

const state = {
    listCoupon: [],
};

const getters = {
    listNormalCoupon: (state) =>
        state.listCoupon?.filter((item) => item?.mc_status === "NORMAL"),
    listUsedCoupon: (state) =>
        state.listCoupon?.filter((item) => item?.mc_status === "USED"),
    listCantUsedCoupon: (state) =>
        state.listCoupon?.filter((item) => item?.mc_status === "CANCEL"),

};

const mutations = {
    handleUpdateCoupon(state, payload) {
        state.listCoupon = payload;
    },
};

const actions = {
    async getlistCouponAction({ commit },data) {
        const res = await getListCouponRequest(data);
        if (res?.is_success) {
            commit("handleUpdateCoupon", res?.list);
        } else {
            console.log(res?.message);
            commit("handleUpdateCoupon", []);
        }
    },
    async useCouponAction({ dispatch }, data) {
        const res = await useCouponRequest(data);
        if (res?.is_success) {
            dispatch("showAlert", {
                type: "success",
                message: i18n.global.t("coupon_success"), //MESSAGE CHECK
            });
        } else {
            switch (res?.ErrorCode) {
                case -200001:
                    dispatch("showAlert", {
                        type: "error",
                        message: i18n.global.t("coupon_error_200001"), //MESSAGE CHECK
                    });
                    break;
                case -200002:
                    dispatch("showAlert", {
                        type: "error",
                        message: i18n.global.t("coupon_error_200002"), //MESSAGE CHECK
                    });
                    break;
                case -200003:
                    dispatch("showAlert", {
                        type: "error",
                        message: i18n.global.t("coupon_error_200003"), //MESSAGE CHECK
                    });
                    break;
                case -200004:
                    dispatch("showAlert", {
                        type: "error",
                        message: i18n.global.t("coupon_error_200004"), //MESSAGE CHECK
                    });
                    break;
                case -200005:
                    dispatch("showAlert", {
                        type: "error",
                        message: i18n.global.t("coupon_error_200005"), //MESSAGE CHECK
                    });
                    break;
                default:
                    dispatch("showAlert", {
                        type: "error",
                        message: i18n.global.t("coupon_error_default"), //MESSAGE CHECK
                    });
                    break;
            }

        }
        return res
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};

const test = [
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:91,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:92,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:93,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:94,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:95,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:96,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:97,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:98,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    },
    {
        mc_begin_date:1696204800,
        mc_content:"dddd",
        mc_created:1696238075,
        mc_end_date:1696464000,
        mc_idx:99,
        mc_invite_code:"AA",
        mc_member_account:"ytest5",
        mc_member_idx:102,
        mc_member_nickname:"ytest5",
        mc_money:10000,
        mc_partner_account:"cmsadmin",
        mc_partner_domain:"-",
        mc_status:"NORMAL",
        mc_subject:"신규 가입",
        mc_use_date:1696238273,
    }
]
