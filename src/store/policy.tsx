import * as React from 'react';

interface Policy {
    companyName: string;
    policyName: string;
    symbol:string;
    description:string;
    maxQuantity:number;
    amount:number;
    price:number;
    address:string;
  }

  interface ContractCallParam {
    method: string;
    param?: any[];
    callback: (res: any) => void;
}

const getPolicy = (connectContract:(contractAddress:string)=>void,contractCall:({
        method,
        param = [],
        callback
    }: ContractCallParam)=>void,contractAddress:string) => {
        // connectContract(contractAddress);
        let companyName = '';
        const setCompanyName = (name:string) =>{
            companyName = name
        }
        const getCompanyName = () => {
            contractCall({
                method: 'companyName',
                param: [],
                callback: (res) => {
                    setCompanyName(res);
                }
            });
        };

        let policyName = '';
        const setPolicyName = (name:string) =>{
            policyName = name
        }

        const getPolicyName = () => {
            contractCall({
                method: 'policyName',
                param: [],
                callback: (res) => {
                    console.log(res);
                    setPolicyName(res);
                }
            });
        };
        let symbol = '';
        let maxQuantity = 10;
        let amount = 1;
        let price = 1;
        let description = '';
        // const [symbol,setSymbol] = React.useState('');
        // const [maxQuantity,setMaxQuantity] = React.useState(10);
        // const [amount,setAmount] = React.useState(1);
        // const [price,setPrice] = React.useState(1);
        // const [description,setDescription] = React.useState('1');
        // React.useEffect(()=>{
        //     connectContract(contractAddress);
        // },[]);

        // React.useEffect(()=>{
        //     getCompanyName();
        // },[]);

        // React.useEffect(()=>{
        //     getPolicyName();
        // },[]);
        
        getCompanyName();
        getPolicyName();
        return(
            {
                companyName:companyName,
                policyName:policyName,
                symbol:symbol,
                description:description,
                maxQuantity:maxQuantity,
                amount:amount,
                price:price,
                address:contractAddress
            }
        )
}

export default getPolicy;