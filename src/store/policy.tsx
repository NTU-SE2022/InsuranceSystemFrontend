import * as React from 'react';
import { userWallet } from '..';
import { useNavigate } from 'react-router';
import Web3function from '../WEB3/Web3function';
import abijson from '../WEB3/abi.json';
import Box from '@mui/material/Box';
import { BorderBox } from '../PolicyCard';
import ContractActions from '../WEB3/ContractActions'
import {BuyPolicyDialog,ErrorDialog,ClaimDialog} from '../ShowDialog';

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
  interface PolicyAddress {
    address:string;
  }
  interface ContractCallParam {
    method: string;
    param?: any[];
    callback: (res: any) => void;
}
interface Web3FunctionParam {
    connectContract: () => void;
    disconnectContract: () => void;
    callback: (para:ContractCallParam) => void;
}

const getPolicy = (contractCall:({
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
                    // console.log(res);
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

export const Policy = ({address}:PolicyAddress) => {
    const {
        isMetaMaskInstalled,
        provider,
        accounts,
        web3,
        enable,
        disable
      } = React.useContext(userWallet);
      
    const {contract,connectContract,disconnectContract,logcontract} = Web3function({web3:web3,accounts:accounts,abi:abijson,address:address})
    const{contractCall} = ContractActions({contract:contract,accounts:accounts});
    const [connect,setConnect] = React.useState(false)
    React.useEffect(()=>{
        // {connectContract,disconnectContract,contractCall} = Web3function({web3:web3,accounts:accounts,abi:abijson,address:address})
        connectContract()
        setConnect(true)
    },[address])

    React.useEffect(() => {
        if(connect){
            getCompanyName();
            getPolicyName();
            getPolicyDescription();
            getPolicySymbol();
            getPolicyMaxQuantity();
            getPolicyPrice();
            // getHealthVerfication();
            getConsiderSymptoms();
        }
    },[connect])
    const [symbol,setSymbol] = React.useState('');
    const [maxQuantity,setMaxQuantity] = React.useState(0);
    const [amount,setAmount] = React.useState(0);
    const [price,setPrice] = React.useState(0);
    const [description,setDescription] = React.useState('');
    const [companyName,setCompanyName] = React.useState('');
    const [policyName,setPolicyName] = React.useState('');
    const [considerSymptom, setConsiderSymptom] = React.useState([]);

    const [healthVerfication,setHealthVerfication] = React.useState(true);
    const [onHealthError,setOnHealthError] = React.useState(false);
    const [open,setOpen] = React.useState(false);
    const [onBuySuccess, setOnBuySuccess] = React.useState(false);
    const [onBuyError, setOnBuyError] = React.useState(false);

    const getCompanyName = () => {
        contractCall({
            method: 'companyName',
            param: [],
            callback: (res) => {
                // console.log(res)
                setCompanyName(res);
            }
        });
    };

    const getPolicyDescription = () => {
        contractCall({
            method: 'policyDescription',
            param: [],
            callback: (res) => {
                setDescription(res);
            }
        });
    };

    const getPolicyName = () => {
        contractCall({
            method: 'policyName',
            param: [],
            callback: (res) => {
                setPolicyName(res);
            }
        });
    };

    const getPolicySymbol = () => {
        contractCall({
            method: 'policySymbol',
            param: [],
            callback: (res) => {
                setSymbol(res);
            }
        });
    };

    const getPolicyPrice = () => {
        contractCall({
            method: 'price',
            param: [],
            callback: (res) => {
                setPrice(res);
            }
        });
    };

    const getPolicyMaxQuantity = () => {
        contractCall({
            method: 'maxQuantity',
            param: [],
            callback: (res) => {
                setMaxQuantity(res);
            }
        });
    };

    const getHealthVerfication = () => {
        contractCall({
            method: 'eligibilityVerificationForPurchase',
            param: [],
            callback: (res) => {
                // setHealthVerfication(res);
                console.log(res)
            }
        });
    }

    const getConsiderSymptoms = () => {
        contractCall({
            method: 'getConsideredSymptoms',
            param: [],
            callback: (res) => {
                // console.log(res);
                setConsiderSymptom(res);
                // console.log(res)
            }
        });
    }

    const buyPolicy = (amount:number,cbfunction:(res:any) => {}) => {
        setAmount(amount);
        contractCall({
            method: 'mintPolicy',
            param: [amount],
            callback: cbfunction
        });
    }

    const handleBuyClick = () => {
        if(healthVerfication){
          setOpen(true);
        }
        else{
          setOnHealthError(true);
        }
      }

    
    const policy ={
        companyName:companyName,
        policyName:policyName,
        symbol:symbol,
        description:description,
        maxQuantity:maxQuantity,
        amount:amount,
        price:price,
        considerSymptom:considerSymptom,
        address:address
    }

    return(
        <Box>
        <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",p: 1,m: 1}}><BorderBox value={policy} onclick={handleBuyClick} ></BorderBox></Box>
        <BuyPolicyDialog value={open} onClose={()=>{setOpen(false)}} onsuccess={() => setOnBuySuccess(true)} handleBuyPolicy = {buyPolicy} onerror={()=>setOnBuyError(true)} policy = {policy}></BuyPolicyDialog>
        <ErrorDialog value={onBuySuccess} title={'購買成功！'} context={`成功購買${amount}單位！已從帳戶扣款${amount * price}ETH。`} onClose={()=>{ setOnBuySuccess(false)}} ></ErrorDialog>
        <ErrorDialog value={onBuyError} title={'購買失敗！'} context={`你帳戶餘額低於${amount * price}ETH，請確認帳戶餘額充足後再試一次。`} onClose={()=>{setOnBuyError(false)}}></ErrorDialog>
        <ErrorDialog value={onHealthError} title={'不符合資格'} context={'你的健康狀況並不符合加保資格！請參考其他保單，或洽保險公司諮詢。'} onClose={()=>{setOnHealthError(false)}}></ErrorDialog>
        </Box>
    )
    
}