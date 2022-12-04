import { useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { provider as Provider } from 'web3-core';
import { useNavigate } from "react-router-dom";

declare global {
    interface Window{
      ethereum?:any
    }
  }
// const checkIsMetaMaskInstalled = () => {
//     if (window.ethereum) return window.ethereum?.isMetaMask;
//     return false
// }
const checkIsMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };
const useMetaMask = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(checkIsMetaMaskInstalled());
    const [provider, setProvider] = useState<Provider>(null);
    const [accounts, setAccounts] = useState([]);

    const enable = () => {
        detectEthereumProvider().then((newProvider: any) => {
            if (newProvider) {
                newProvider.request({
                    method: 'eth_requestAccounts'
                }).then((accounts: any) => {
                    setAccounts(accounts);
                    setIsMetaMaskInstalled(true);
                    bindListeners(newProvider);
                    setProvider(newProvider as Provider);
                });
            } else {
                setIsMetaMaskInstalled(false);
            }
        });
    };

    const disable = () => {
        setAccounts([]);
        setProvider(null);
    };

    const bindListeners = (givenProvider: any) => {
        givenProvider.on('chainChanged', disable);
        givenProvider.on('accountsChanged', disable);
    };

    return {
        enable,
        disable,
        provider,
        accounts,
        isMetaMaskInstalled
    };
};

export default useMetaMask;