import store from '@/store';

const endPoints = {
    signup: {
        url: '/authentication/ooo_browser/join',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        },
    },
    userInfo: {
        url: '/authentication/ooo_browser/get_id',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    login: {
        url: '/authentication/ooo_browser/login',
        $setting: {
            pending: true,
            $useStore: (data, res)=> {
                store.commit('user/setSessionId', data.mIdx);
            },
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    logout: {
        url: '/authentication/ooo_browser/logout',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    gameStart: {
        url: '/game/play/',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    balance: {
        url: '/goods/member/get',
        $setting: {
            pending: true,
            $useStore: (data, res) => {
                store.commit('user/setUserInfo', data);
            },
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    depositList: {
        url: '/goods/deposit_list/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    withdrawList: {
        url: '/goods/withdraw_list/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    depositListRealTime: {
        url: '/real_message/deposits/list',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    withdrawListRealTime: {
        url: '/real_message/withdraws/list',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    letterList: {
        url: '/memo/list/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    helpList: {
        url: '/question/list/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    writeHelp: {
        url: '/question/contact/set',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    couponList: {
        url: '/coupon/list/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        },
    },
    topicList: {
        url: '/notify_message/ooo_browser/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    eventList: {
        url: '/notify_message/ooo_browser/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    faqList: {
        url: '/notify_message/ooo_browser/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    deposit: {
        url: '/deposit/request',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    withdraw: {
        url: '/withdraw/request',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    adminConfig: {
        url: '/xxxx_config/get',
        $setting: {
            pending: true,
            $useStore: (data, res) => {
                store.commit('cms/setConfigData', data);
            },
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    deleteRow: (flag, payload) => {
        const urls = {
            depositList: '/deposit/{idx}/delete',
            withdrawList: '/withdraw/{idx}/delete',
            letterList: '/memo/remove/{idx}',
            helpList: '/question/remove/{idx}',
        }
        return {
            url: urls[flag].replace('{idx}', payload),
            $setting: {
                pending: true,
                $useStore: undefined,
                contentType: 'application/x-www-form-urlencoded'
            }
        }
    },
    detailView: (flag, payload) => {
        const urls = {
            letterList: '/memo/read/{idx}',
        }
        return {
            url: urls[flag].replace('{idx}', payload),
            $setting: {
                pending: true,
                $useStore: undefined,
                contentType: 'application/x-www-form-urlencoded'
            }
        }
    },
    useCoupon: (flag, payload) => {
        const urls = {
            use: 'coupon/use/{idx}',
        }
        return {
            url: urls[flag].replace('{idx}', payload),
            $setting: {
                pending: true,
                $useStore: undefined,
                contentType: 'application/x-www-form-urlencoded'
            }
        }
    },
    gamePlay: (flag, payload) => {
        const urls = {
            gamePlay: '/game/{code}',
            starGamePlay: '/play_star_games/{code}',
        }
        return {
            url: urls[flag].replace('{code}', payload),
            $setting: {
                pending: true,
                $useStore: undefined,
                contentType: 'application/x-www-form-urlencoded'
            }
        }
    },
    gamePlay2: {
        url: '/api/launch/play/tais_tais/3',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/json charset=utf-8'
        }
    },
    gameList: {
        url: '/game/list/get',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    slotGameCompanyList: {
        url: '/sld/GetProvider',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    slotGameList: {
        url: '/game/list',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    slotGameStart: {
        url: '/game/play',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    getPing: {
        url: '/ajax/get/ping',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    settlement: {
        url: '/api/partnership/settlement',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    settlementInfo: {
        url: '/api/partnership/settlement_info',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    changePassword: {
        url: '/authentication/ooo_browser/update/password',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    },
    defineInfo: {
        url: '/ajax/define/info',
        $setting: {
            pending: true,
            $useStore: undefined,
            contentType: 'application/x-www-form-urlencoded'
        }
    }
}

export {
    endPoints
}