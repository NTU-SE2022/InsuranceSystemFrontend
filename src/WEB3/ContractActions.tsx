import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Contract } from 'web3-eth-contract';

/**
 * Goerli dark betamon test smart contract
 * addr: 0x8CEEc3EB66Cc390B6c49a2B7c03a651A82C73af0
 */

interface ContractCallParam {
    method: string;
    param?: any[];
    callback: (res: any) => void;
}

interface ContractActionParam {
    contract: Contract|null,
    accounts: string[]
}

const ContractActions = ({
    contract,
    accounts
}: ContractActionParam)=>{
    const contractCall = ({
        method,
        param = [],
        callback
    }: ContractCallParam) => {
        if (contract) {
            if (typeof contract.methods[method] === 'function') {
                // console.log(accounts[0])
                contract.methods[method].apply(this, param).call({"from": accounts[0]}).then(callback);
            }
        }
    };

    return {
        contractCall
    };
}

export default ContractActions;