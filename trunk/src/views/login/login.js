import store from "@/store";
import {reactive, ref} from 'vue';
import router from '@/router';
import { toggleShow } from "@/utils/modals";
import { utils } from "@/utils/common";
import { fn as gameFn } from '@/views/game/game.js';
import { notify } from "@kyvg/vue3-notification";
import {setCookie, deleteCookie, getCookie} from '@/utils/cookie';
import {fn as listFn} from "@/views/list/list";
import {fn as transactionFn} from "@/views/transaction/transaction";
import i18n from '@/i18n'
import {themeUtils} from "@/const/themeData";
const { t } = i18n.global;


const loginForm = () => {
	return {
		account: '',
		password: ''
	}
}

const data = {
	frm: reactive({
		account: '',
		password: '',
		cookie: ''
	}),
	pingInterval: undefined,
	pingRes: undefined,
	isPartner: ref(false),
	partfrm: reactive({
		partnerCode: '',
		memberIdx: '',
		account: '',
	}),
	newUserPwfrm: reactive({
		password: '',
		memberIdx: ''
	}),
	partnerSettleAmount: ref(undefined),
}

const fn = {
	login: async (payload) => {
		if(payload != null){
			data.frm.account = payload.account;
			data.frm.password = payload.password;
		}

		if(data.frm.account == 0 || data.frm.account == 0){
			if(process.env.VUE_APP_PAGE_TYPE != '')
			/*notify({
				title: t('notice'),
				text: t('login_input_wanning'),
				type: 'default',
			});*/
			//alert(t('login_input_wanning'));
			themeUtils.ShowMessagePopup(t('login_input_wanning'),2);

			return;
		}
		const res = await store.dispatch('request/call', { flag: 'login', params: data.frm });
		if(res?.is_success == false){
			themeUtils.ShowMessagePopup(res.message, 2);
			//alert(t('confirm'));
		}
		else{
			if(payload == null) {
				themeUtils.ShowMessagePopup(t('login_sucess'));
			}
			//console.log('login');
			//console.log(store.getters['user/getSessionId']);
			data.frm.cookie = store.getters['user/getSessionId'];
			setCookie('CID', JSON.stringify(data.frm));
			await store.dispatch('request/call', { flag: 'balance', params: {} });
			if(store.getters['user/getUserInfo']?.me_partnership_code != null){
				data.isPartner.value = true;
			}

			data.pingInterval = setInterval(async () => {
				let res = await store.dispatch('request/call', { flag: 'getPing', params: {} });
				data.pingRes = res;
			}, 5000);

			await listFn.searchNewListLetter();
			await listFn.searchNewListHelp();
			//await listFn.searchNewListCoupon();
			await transactionFn.checkDepositListRequest();
			await transactionFn.checkWithdrawListRequest();
		}

		return res;
	},
	logout: async (isClear = false) => {
		data.frm.account = '';
		data.frm.password = '';
		data.isPartner.value = false;
		store.commit('user/setInitUserInfo');
		await store.dispatch('request/call', { flag: 'logout', params: {} });
		clearInterval(data.pingInterval);
		data.pingRes = undefined;
		if(isClear == true){
			deleteCookie('CID');
		}
	},
	doPartnerConvert: async() => {
		// 페이지전환 링크 http://{서버 호스트}/partner/check_login/{account}
		/*let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1200, height=800, top=0,left=0";*/
		//window.open(process.env.VUE_APP_META_API_URL +`/messenger/game_detail_history/${data.mgr_idx}/${data.mgr_game_code}`, 'history', config);
		//window.open(process.env.VUE_APP_META_API_URL +`/admin/partner/check_login/`+data.frm.account, '_blank');
		let url = process.env.VUE_APP_META_API_URL +`/admin/partner/check_login/${data.frm.account}?frontLogin=true`;
		//let url = `https://api.metaglink.com/admin/partner/check_login/${data.frm.account}?frontLogin=true`;
		//let url = `http://192.168.0.8/admin/partner/check_login/${data.frm.account}?frontLogin=true`;

		window.open(url, '_blank');
	},
	doPartnerPage: async() => {
		// 페이지전환 링크 http://{서버 호스트}/partner/check_login/{account}
		/*let config = "toolbar=no,scrollbars=no,resizable=yes,status=no,menubar=no,width=1200, height=800, top=0,left=0";*/
		//window.open(process.env.VUE_APP_META_API_URL +`/messenger/game_detail_history/${data.mgr_idx}/${data.mgr_game_code}`, 'history', config);
		//window.open(process.env.VUE_APP_META_API_URL +`/admin/partner/check_login/`+data.frm.account, '_blank');
		let url = process.env.VUE_APP_META_API_URL;

		window.open(url, '_blank');
	},
	doSettlement: async () => {

		if(data.partnerSettleAmount.value == 0 ){
			themeUtils.ShowMessagePopup('정산 요청할 금액이 없습니다.', 3);
			return;
		}

		data.partfrm.partnerCode = store.getters['user/getUserInfo']?.me_partnership_code;
		data.partfrm.memberIdx = store.getters['user/getUserInfo']?.me_idx;
		data.partfrm.account = store.getters['user/getUserInfo']?.me_account;

		const res = await store.dispatch('request/call', { flag: 'settlement', params: data.partfrm });
		if(res?.error == false){
			if(res.data.transactionMoney == 0){
				themeUtils.ShowMessagePopup('정산 요청할 금액이 없습니다.', 3);
			}
			else
				themeUtils.ShowMessagePopup('정산 요청을 할수 없습니다. 관리자에게 문의해 주세요.', 3);
		}
		else{
			themeUtils.ShowMessagePopup('정산 요청하였습니다.', 1);
		}
	},
	getSettlementInfo: async () => {

		const res = await store.dispatch('request/call', { flag: 'settlementInfo', params: {} });
		let _amount = undefined;

		if(res?.error == false){
			themeUtils.ShowMessagePopup('정산 요청할 금액이 없습니다.',3);
		}
		else{
			if(res?.data == undefined){
				return 0;
			}
			let  n_casino_bets_amount = res?.data.targetPartner.n_casino_bets_amount;
			let  n_casino_lose_amount = res?.data.targetPartner.n_casino_lose_amount;
			let  n_slot_bets_amount = res?.data.targetPartner.n_slot_bets_amount;
			let  n_slot_lose_amount = res?.data.targetPartner.n_slot_lose_amount;

			_amount = n_casino_bets_amount + n_casino_lose_amount +  n_slot_bets_amount + n_slot_lose_amount;
		}

		data.partnerSettleAmount.value = _amount;
		//console.log("get amount " + data.partnerSettleAmount.value);

		return _amount;
	},
	changepw:  async (payload) => {
		//console.log('변경 pw:'+ payload.password);
		//console.log('tatget idx:'+ payload.memberIdx);
		if(payload == undefined) {
			console.error('not change data');
			return;
		}

		if( payload.password == ''){
			if(process.env.VUE_APP_PAGE_TYPE != '')
				themeUtils.ShowMessagePopup("변경할 비밀번호를 입력해 주세요.",2);
			return;
		}

		if(payload.password.length < 6){
			if(process.env.VUE_APP_PAGE_TYPE != '')
				themeUtils.ShowMessagePopup("비밀번호는 6자리 이상이 되어야 합니다..",2);
			return;
		}

		const res = await store.dispatch('request/call', { flag: 'changePassword', params: data.newUserPwfrm });
		//console.log(res);
		if(res?.is_success == false){
			themeUtils.ShowMessagePopup(res.message,2);
			//alert(t('confirm'));
		}
		else {

			data.frm.password = data.newUserPwfrm.password;
			setCookie('CID', JSON.stringify(data.frm));

			themeUtils.ShowMessagePopup('비밀번호 변경이 완료되었습니다.',1);
			data.newUserPwfrm.password = '';

			/*let loginInfo = getCookie('CID');
			if(loginInfo != undefined) {
				console.log(JSON.parse(loginInfo.payload));
			}*/
		}
	},
	loginData: async (payload) => {
		if(payload != null){

			//console.log('loginData');
			//console.log(payload);

			data.frm.account = payload.account;
			data.frm.password = payload.password;
			data.frm.cookie = payload.cookie;
		}

		if(data.frm.account == 0 || data.frm.account == 0){
			if(process.env.VUE_APP_PAGE_TYPE != '')
				themeUtils.ShowMessagePopup(t('login_input_wanning'),2);
			return;
		}

		//const res = await store.dispatch('request/call', { flag: 'login', params: data.frm });
		//if(res?.is_success == false){
		//	themeUtils.ShowMessagePopup(res.message, 2);
		//}
		//else
		//{
			//if(payload == null) {
			//	themeUtils.ShowMessagePopup(t('login_sucess'));
			//}
			//setCookie('CID', JSON.stringify(data.frm));

			store.commit('user/setSessionId', data.frm.cookie );
			//console.log(store.getters['user/getSessionId']);

			await store.dispatch('request/call', { flag: 'balance', params: {} });

			if(store.getters['user/getUserInfo']?.me_partnership_code != null){
				data.isPartner.value = true;
			}

			data.pingInterval = setInterval(async () => {
				let res = await store.dispatch('request/call', { flag: 'getPing', params: {} });
				data.pingRes = res;
			}, 5000);

			await listFn.searchNewListLetter();
			await listFn.searchNewListHelp();
			//await listFn.searchNewListCoupon();
			await transactionFn.checkDepositListRequest();
			await transactionFn.checkWithdrawListRequest();
		//}

		//return res;
	},
}

export {
	data,
	fn
}
