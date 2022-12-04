import { useEffect } from 'react';
import useMetaMask from './useMetaMask';
import useWeb3 from './useWeb3';
import { provider as Provider } from 'web3-core';
import Web3 from 'web3';

export interface UseEthereumReturns {
    isMetaMaskInstalled: boolean;
    provider: Provider;
    accounts: string[];
    web3: Web3|null;
    enable: () => void;
    disable: () => void;
}

const useEthereum = (): UseEthereumReturns => {
    const {
        isMetaMaskInstalled,
        provider,
        accounts,
        enable,
        disable
    } = useMetaMask();

    const {
        web3,
        updateProvider
    } = useWeb3();

    useEffect(() => {
        updateProvider(provider);
    }, [ provider ]);

    return {
        isMetaMaskInstalled,
        provider,
        accounts,
        web3,
        enable,
        disable
    };
};

export default useEthereum;