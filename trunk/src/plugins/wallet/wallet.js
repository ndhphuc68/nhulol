import detectEthereumProvider from '@metamask/detect-provider';
import MetaMaskOnboarding from '@metamask/onboarding';
import { fn } from "@/views/login/login";
import store from "@/store";

const setting = {
    accounts: [],
    metaMask: {
        onboard: undefined,
        provider: undefined
    },
    isMetaMaskOk: true,
    fn: {
        onBoarding: async () => {
            setting.metaMask.onboard = new MetaMaskOnboarding();
            if(!MetaMaskOnboarding.isMetaMaskInstalled()){
                setting.isMetaMaskOk = false;
                setting.metaMask.onboard.startOnboarding();
            } else if(setting.accounts.length > 0 || MetaMaskOnboarding.isMetaMaskInstalled()){
                setting.isMetaMaskOk = true;
                const res = await setting.fn.call('wallet_requestPermissions', [{eth_accounts: {}}]);
                const addr = await setting.fn.call('eth_requestAccounts');
                store.commit('login/setAgentKey', process.env.VUE_APP_WALLET_AGENT_KEY);
                if(addr.length > 0){
                    setting.accounts = addr;
                    try{
                        const res = await fn.login({ userId: addr[0], pass: '1111', isWallet: true });
                    } catch (e){
                        alert(e)
                    }
                }
            }
        },
        initMetaMask: async () => {
            const provider = await detectEthereumProvider();
            if(provider){
                setting.metaMask.provider = provider;
            }
            return setting.metaMask.provider;
        },
        call: async (flag, params = {}) => {
            if(!setting.metaMask.provider){
                await setting.fn.initMetaMask();
            }
            console.log(params);
            const res = await setting.metaMask.provider.request({
                method: flag,
                params
            });
            return res;
        },
    }
}

export {
    setting
}