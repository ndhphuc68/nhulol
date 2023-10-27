import store from "@/store";
import { encryptDataV2, decryptDataV2 } from '@/utils/encrypt';

const fn = {
    launch: async (payload) => {
        if (!payload['user_id'] || !payload['password']) {
            return undefined;
        }

        let agentKey = undefined;
        if(!payload['agent'])
            agentKey = "8960B3168-E5C793524";
        else
            agentKey = payload.agent;

        const res = await store.dispatch('request/call', {
            flag: 'cmsLaunch', params: {
                url: encryptDataV2(payload['url']),
            },
            headers: {}
        });

       // store.commit('login/setLoginUser', res.data.value);
        //await store.dispatch('request/call', { flag: 'balance', params: {} });
    /*
        setCookie('CID', {
            data: res.data.value,
            payload: JSON.stringify({
                userId: payload.userId,
                pass: payload.pass
            })
        });*/

        return res;
    }
}

export {
    fn
}
