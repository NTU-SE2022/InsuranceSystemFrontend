import useContract from './useContract';
import ContractActions from './ContractActions';
import * as React from 'react';
import Web3 from 'web3';

interface Web3CardParam {
    web3: Web3|null;
    accounts: string[];
    abi:any;
}

const Web3function = ({
    web3,
    accounts,
    abi,
  }: Web3CardParam) =>{
    const [contractAddress, setContractAddress] = React.useState('0x7Fa0b3174bDFb34B47451490f0B10D405e4Bc520');
    const {
        contract,
        resetContract
    } = useContract();

      const connectContract = (contractAddress:string) => {
        resetContract({
            abi: abi,
            address: contractAddress,
            web3:web3
        });
    };

    const disconnectContract = () => {
        resetContract();
    };
    const{
      contractCall
    } = ContractActions({
      contract:contract,
      accounts:accounts
    });

    // const getPolicyName = () => {
    //   contractCall({
    //       method: 'name',
    //       param: [],
    //       callback: (res) => {
    //         cbfunction(res);
    //       }
    //   });
    // };

    // const getPolicyDescription = () => {
    //   contractCall({
    //       method: 'symbol',
    //       param: [],
    //       callback: (res) => {
    //         cbfunction(res);
    //       }
    //   });
    // };

    // const getPolicySymbol = () => {
    //   contractCall({
    //       method: 'symbol',
    //       param: [],
    //       callback: (res) => {
    //         cbfunction(res);
    //       }
    //   });
    // };
    return{
        connectContract,
        disconnectContract,
        contractCall
    };
  }

  export default Web3function;