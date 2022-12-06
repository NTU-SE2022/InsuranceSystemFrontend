import useContract from './useContract';
import ContractActions from './ContractActions';
import * as React from 'react';
import Web3 from 'web3';

interface Web3CardParam {
    web3: Web3|null;
    accounts: string[];
    abi:any;
    address:string;
}

const Web3function = ({
    web3,
    accounts,
    abi,
    address,
  }: Web3CardParam) =>{
    const [contractAddress, setContractAddress] = React.useState(address);
    const {
        contract,
        resetContract
    } = useContract();

      const connectContract = () => {
        resetContract({
            abi: abi,
            address: contractAddress,
            web3:web3
        });
        
    };

    const disconnectContract = () => {
        resetContract();
    };

    const logcontract = () => {
        console.log(`reset:${contract}`)
    };

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
        contract,
        connectContract,
        disconnectContract,
        logcontract,
    };
  }

  export default Web3function;