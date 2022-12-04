import { useState } from 'react';
import Web3 from 'web3';
import { provider as Provider } from 'web3-core';

const useWeb3 = (provider: Provider = null) => {
    const [web3, setWeb3] = useState(
        provider ? new Web3(provider) : null
    );

    const updateProvider = (provider: Provider = null) => {
        setWeb3(
            provider ? new Web3(provider) : null
        );
    };

    return {
        web3,
        updateProvider
    };
};

export default useWeb3;