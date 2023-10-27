import store from '@/store';
import { reactive } from 'vue';
import { utils } from '@/utils/common';
import {getCookie} from "@/utils/cookie";
import {fn as LoginFn, fn as loginFn} from "@/views/login/login";
import {notify} from "@kyvg/vue3-notification";
import {themeUtils} from "@/const/themeData";
import {useRoute} from "vue-router";
const route = useRoute();

const data = reactive({
    list: [],
    liveCasinoAbleCompanyList:[],
    liveCasinoDisableCompanyList:[],
    slotCompanyList:[],
    slotCityCompanyList:[],
    slotAbleCompanyList:[],
    slotDisableCompanyList:[],
    slotCityAbleCompanyList:[],
    slotCityDisableCompanyList:[],
    slotGameList:[],
});

const liveCasinoMenu = [
    { key: "EVOLUTION_GAMING", api: "ezs/play", flag: "gamePlay", gameCode: "EZS", idx: 1, isLoading: false},
    { key: "MICRO_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 2, isLoading: true},
    { key: "ASIA_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 3, isLoading: true},
    { key: "ALLBET", api: "", flag: "gamePlay", gameCode: "", idx: 6, isLoading: true},
    { key: "PLAY_TECH", api: "", flag: "gamePlay", gameCode: "", idx: 8, isLoading: true},
    { key: "BBIN", api: "", flag: "gamePlay", gameCode: "", idx: 9, isLoading: true},
    { key: "SEXY", api: "", flag: "gamePlay", gameCode: "", idx: 11, isLoading: true},
    { key: "VIVO_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 13, isLoading: true},
    //{ key: "OKADA", api: "", flag: "gamePlay", gameCode: "", idx: 15, isLoading: true},
    { key: "EZUGI", api: "", flag: "gamePlay", gameCode: "", idx: 16, isLoading: true},
    { key: "DREAM_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 17, isLoading: true},
    { key: "PRAGMATIC_PLAY", api: "", flag: "gamePlay", gameCode: "", idx: 20, isLoading: true},
];

const liveCasinoMenu_EVOL = [
    { key: "EVOLUTION_GAMING", api: "ezs/play", flag: "gamePlay", gameCode: "EZS", idx: 1, isLoading: false},
    //{ key: "MICRO_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 2, isLoading: true},
    //{ key: "ASIA_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 3, isLoading: true},
    //{ key: "ALLBET", api: "", flag: "gamePlay", gameCode: "", idx: 6, isLoading: true},
    //{ key: "PLAY_TECH", api: "", flag: "gamePlay", gameCode: "", idx: 8, isLoading: true},
    //{ key: "BBIN", api: "", flag: "gamePlay", gameCode: "", idx: 9, isLoading: true},
    //{ key: "SEXY", api: "", flag: "gamePlay", gameCode: "", idx: 11, isLoading: true},
    //{ key: "VIVO_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 13, isLoading: true},
    //{ key: "OKADA", api: "", flag: "gamePlay", gameCode: "", idx: 15, isLoading: true},
    //{ key: "EZUGI", api: "", flag: "gamePlay", gameCode: "", idx: 16, isLoading: true},
    //{ key: "DREAM_GAMING", api: "", flag: "gamePlay", gameCode: "", idx: 17, isLoading: true},
    //{ key: "PRAGMATIC_PLAY", api: "", flag: "gamePlay", gameCode: "", idx: 20, isLoading: true},
];

const fn = {
    gameStart: async (payload) => {
        const res = await store.dispatch('request/get', { endPoint: `${payload.gameCode}/${payload}`})
    },
    gameList: async () => {
        const res = await store.dispatch('request/call', { flag: 'gameList', params: {}});
        if(res.is_success == true){
            data.list = res.list;
        }
    },
    slotGameCompanyList: async () => {
        let payload = {
            language: "1"
        };

        data.liveCasinoDisableCompanyList = liveCasinoMenu_EVOL.filter(v => v.isLoading == true);
        //console.log('disable : '+ res2.Data.data);

        for (let idx in liveCasinoMenu_EVOL) {
            if (liveCasinoMenu_EVOL[idx].isLoading == false && liveCasinoMenu_EVOL[idx].key != 'EVOLUTION_GAMING')
                data.liveCasinoDisableCompanyList.push(liveCasinoMenu_EVOL[idx]);
        }

        data.liveCasinoAbleCompanyList.push(liveCasinoMenu_EVOL[0]);
    },
    getSlotGameList: async (provider_id) => {
        let payload = {
            provider_id: provider_id,
            limit: "1000",
            offset: "0",
            language: "1"
        };

        const res = await fetch(`${process.env.VUE_APP_META_API_URL2}/sld/GetGameList`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            // 에러처리
            .catch(() => {
                console.log('sld 에러')
            });

        if(res.data != null) {
            return res;
        }
    },
    getSlotCityGameList: async (id) => {
        let payload = {
            provider_id: id
        };

        const res = await fetch(`${process.env.VUE_APP_META_API_URL2}/sci/GetGameList`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            // 에러처리
            .catch(() => {
                console.log('sc game 에러')
            });

        if(res.Data.data != null)
        {
            return res.Data;
        }
    },
    allSlotGameList: async () => {
        for(let idx in data.slotCityCompanyList)
        {
            const res = await fn.getSlotCityGameList(data.slotCityCompanyList[idx].id);

            let item = {};
            item['provider'] = data.slotCityCompanyList[idx].provider_id;
            item['data'] = res?.data;
            item['category'] = ['Slots'];
            item['apiRoot'] = "SCI";
            item['provider_logo'] = data.slotCityCompanyList[idx].provider_logo;

            let disableIdx = data.slotCityDisableCompanyList.findIndex(v => item['provider'] == v.provider_id);

            if(res?.data)
            {
                for(let idx in item['data']){
                    item['data'][idx]['isLoading'] = false;
                }

                data.slotGameList.push(item);

                data.slotCityDisableCompanyList.splice(disableIdx, 1);
                data.slotCityAbleCompanyList.push(data.slotCityCompanyList[idx]);
            }
            else
            {
                data.slotCityDisableCompanyList[disableIdx]['isLoading'] = true;
            }
        }

        //상위로 배열 이동 처리
        if(data.slotGameList[0] != undefined) {
            var pickedArr = [];
            var filterArr = data.slotGameList[0].data.filter(function (gamedata) {
                let isFilter = false;
                if (gamedata.gamesymbol == 'vswayszombcarn' || gamedata.gamesymbol == 'vswaysbbb' || gamedata.gamesymbol == 'vswayswildwest'
                    || gamedata.gamesymbol == 'vs10eyestorm' || gamedata.gamesymbol == 'vs40bigjuan' || gamedata.gamesymbol == 'vs10madame'
                    || gamedata.gamesymbol == 'vs40spartaking' || gamedata.gamesymbol == 'vs576hokkwolf' || gamedata.gamesymbol == 'vs10bbbonanza'
                    || gamedata.gamesymbol == 'vs25samurai' || gamedata.gamesymbol == 'vswayslight' || gamedata.gamesymbol == 'vswaysmadame'
                    || gamedata.gamesymbol == 'vs20olympgate' || gamedata.gamesymbol == 'vs25samurai' || gamedata.gamesymbol == 'vs25wolfgold'
                    || gamedata.gamesymbol == 'vs25hotfiesta'
                ) {
                    isFilter = true;
                    pickedArr.push(gamedata);
                }
                return !isFilter;
            });
            //console.log(filterArr);
            //console.log('picked ' + pickedArr.length);
            pickedArr.forEach((pickgamedta) => {
                filterArr.unshift(pickgamedta);
            });
            data.slotGameList[0].data = filterArr;
            //console.log(data.slotGameList[0].data);

            //하위로 배열 이동 처리
            var pickedBackArr = [];
            var filterBackArr = data.slotGameList[0].data.filter(function (gamedataBack) {
                let isFilterBack = false;
                if (gamedataBack.gamesymbol == 'vs243mwarrior' || gamedataBack.gamesymbol == 'vs15diamond' || gamedataBack.gamesymbol == 'vs1fortunetree'
                    || gamedataBack.gamesymbol == 'vs20terrorv' || gamedataBack.gamesymbol == 'vs20wildpix' || gamedataBack.gamesymbol == 'vs243dancingpar'
                    || gamedataBack.gamesymbol == 'vs117649starz' || gamedataBack.gamesymbol == 'vs8magicjourn' || gamedataBack.gamesymbol == 'vs25gladiator'
                    || gamedataBack.gamesymbol == 'vs18mashang' || gamedataBack.gamesymbol == 'vs243caishien' || gamedataBack.gamesymbol == 'vs9madmonkey'
                    || gamedataBack.gamesymbol == 'vs25scarabqueen' || gamedataBack.gamesymbol == 'vs25davinci' || gamedataBack.gamesymbol == 'vs25gldox'
                    || gamedataBack.gamesymbol == 'vs20egypttrs'
                ) {
                    isFilterBack = true;
                    pickedBackArr.push(gamedataBack);
                }
                return !isFilterBack;
            });
            //console.log(filterBackArr);
            //console.log('picked Back' + pickedBackArr.length);
            pickedBackArr.forEach((pickBackgamedta) => {
                filterBackArr.push(pickBackgamedta);
            });
            data.slotGameList[0].data = filterBackArr;
            //console.log(data.slotGameList[0].data);
        }

        for(let idx in data.slotCompanyList){
            const res = await fn.getSlotGameList(data.slotCompanyList[idx].provider_id);

            let isLiveCasino = false;
            let item = {};
            item['provider'] = data.slotCompanyList[idx].provider_id;
            item['data'] = res?.data;
            item['category'] = [];
            item['apiRoot'] = "SLD";
            item['provider_logo'] = data.slotCompanyList[idx].provider_logo;

            let disableIdx = data.slotDisableCompanyList.findIndex(v => item['provider'] == v.provider_id);

            if(res?.data){
                for(let idx in item['data']){
                    item['data'][idx]['isLoading'] = false;
                }

                for(let idx in res.data){
                    if(!item['category'].includes(res.data[idx].category) && res.data[idx].category != 'Live Casino'
                        && res.data[idx].category != 'Lobby') {
                        item['category'].push(res.data[idx].category);
                    }

                    if(res.data[idx].category == 'Live Casino' || res.data[idx].category == 'Lobby'){
                        isLiveCasino = true;
                    }
                }

                if(isLiveCasino){
                    fn.liveCasinoSetting(item);
                }

                data.slotGameList.push(item);

                if(item['category'].length > 0){
                    data.slotDisableCompanyList.splice(disableIdx, 1);
                    data.slotAbleCompanyList.push(data.slotCompanyList[idx]);
                }
                else{
                    data.slotDisableCompanyList[disableIdx]['isLoading'] = true;
                    data.slotDisableCompanyList.splice(disableIdx, 1);
                }
            }
            else{
                data.slotDisableCompanyList[disableIdx]['isLoading'] = true;
            }
        }
    },
        /*openGame: () => {
           return;
       /* if(!utils.isMobile()){
               let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
               //window.open('https://testevo-gaming.com?authToken=OeW35p38PmZKmfaGIDVVz20B-60xZcT_dYZ3CB9cwkDNsGGLIO0C59sW4dJJaeXvj1TqceuUni1IfnIDs93veu8v-yIcCX0hvb9MDtaJBEg', '', config);
           } else {
              // window.open('https://testevo-gaming.com?authToken=OeW35p38PmZKmfaGIDVVz20B-60xZcT_dYZ3CB9cwkDNsGGLIO0C59sW4dJJaeXvj1TqceuUni1IfnIDs93veu8v-yIcCX0hvb9MDtaJBEg', '_blank');
           }
    },*/
    liveCasinoSetting: (item) => {
    },
    openGame: async () => {
    if(store.getters["user/getSessionId"] == undefined) {
            let loginInfo = getCookie("CID");
            if (loginInfo) {
                try {
                    await loginFn.login(loginInfo);
                } catch (e) {
                    console.error(e);
                }
            }
    }

    let domain;

    if (process.env.NODE_ENV == "development") {
                domain = location.origin;
    } else {
                domain = process.env.VUE_APP_META_API_URL;
    }

    let api_game = "TOS";
    //const res = await fetch(`${domain}/game/TOS/play`, {
    const res = await fetch(api_game, {
                credentials: "include",
                method: "GET",
            }).then((res) => res.text())
                    // 에러처리
                .catch(() => {
                    console.log('게임 실행 실패');
                    themeUtils.ShowMessagePopup('게임을 종료 후 다시 게임시작 해주세요');
            });

    if(res == '로그인 세션 없음.') {
            await LoginFn.logout(true);

            themeUtils.ShowMessagePopup('로그인 정보가 없습니다.');
                setTimeout(function() {
                    themeUtils.refresh();
                }, 2000);
                return;
            }

            let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
            let res2 = res.replace(/['"]+/g, "");

            //!utils.isMobile()
            if(!utils.isMobile()) {
                window.open(res2, "huniz", config);
            }
            else {
                window.open(res2, "huniz");
            }
    },

    openGameCode: async (_code) => {
        if (store.getters["user/getSessionId"] == undefined) {
            let loginInfo = getCookie("CID");
            if (loginInfo) {
                try {
                    await loginFn.login(loginInfo);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        let domain;

        if (process.env.NODE_ENV == "development") {
            domain = location.origin;
        } else {
            domain = process.env.VUE_APP_META_API_URL;
        }

        let api_game = undefined;

        api_game = `${domain}/game/`;
        api_game += _code + `/play`;

        //const res = await fetch(`${domain}/game/TOS/play`, {
        const res = await fetch(api_game, {
            credentials: "include",
            method: "GET",
        }).then((res) => res.text())
            // 에러처리
            .catch(() => {
                console.log('게임 실행 실패');
                themeUtils.ShowMessagePopup('게임을 종료 후 다시 게임시작 해주세요');
            });

        if(res == '로그인 세션 없음.') {
            await LoginFn.logout(true);

            themeUtils.ShowMessagePopup('로그인 정보가 없습니다.');
            setTimeout(function() {
                themeUtils.refresh();
            }, 2000);
            return;
        }

        let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1600, height=800, top=0,left=0";
        let res2 = res.replace(/['"]+/g, "");

        //!utils.isMobile()
        if(!utils.isMobile()) {
            window.open(res2, "huniz", config);
        }
        else {
            window.open(res2, "huniz");
        }
    }
}

export {
    data,
    liveCasinoMenu,
    fn
}