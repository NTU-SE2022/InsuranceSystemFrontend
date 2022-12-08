import * as React from 'react';
import { userWallet } from '..';
import { useNavigate } from 'react-router';
import Web3function from '../WEB3/Web3function';
import abijson from '../WEB3/abi.json';
import Box from '@mui/material/Box';
import { BorderBox } from '../PolicyCard';
import ContractActions from '../WEB3/ContractActions'
import {BuyPolicyDialog,ErrorDialog,ClaimDialog} from '../ShowDialog';
import {ClaimBox} from '../PolicyCard';

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

export const Claim = ({address}:PolicyAddress) => {
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
            // getPolicyMaxQuantity();
            getPolicyPrice();
            getPolicyAmount();
            // getCertificateVerfication();
        }
    },[connect])
    const [symbol,setSymbol] = React.useState('');
    const [maxQuantity,setMaxQuantity] = React.useState(0);
    const [amount,setAmount] = React.useState(0);
    const [price,setPrice] = React.useState(0);
    const [description,setDescription] = React.useState('');
    const [companyName,setCompanyName] = React.useState('');
    const [policyName,setPolicyName] = React.useState('');

    const [onCertificateError,setOnCertificateError] = React.useState(false);
    const [open,setOpen] = React.useState(false);
    const [onClaimSuccess, setOnClaimSuccess] = React.useState(false);
    const [onClaimError, setOnClaimError] = React.useState(false);
    const [certificateVerfication,setCertificateVerfication] = React.useState(false);

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

    const getPolicyAmount = () => {
        // if(!contract) return
        // contract.methods['balanceOf'].apply(this, [accounts[0]]).call({"from": accounts[0]}).then((res:any)=>{
        //     console.log(res);
        //     setAmount(res);
        // });
        contractCall({
            method: 'balanceOf',
            param: [accounts[0]],
            callback: (res) => {
                console.log(res);
                setAmount(res);
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

    const getCertificateVerfication = () => {
        if(!contract) return
        contract.methods['eligibilityVerificationForClaim'].apply(this, []).call({"from": accounts[0]}).then((res:any)=>{
            console.log(res);
            setCertificateVerfication(res);
        });
        // contractCall({
        //     method: 'eligibilityVerificationForClaim',
        //     param: [],
        //     callback: (res) => {
        //         setCertificateVerfication(res);
        //         // console.log(res)
        //     }
        // });
    }

    const makeClaim = (cbfunction:(res:any) => {}) => {
        contractCall({
            method: 'claim',
            param: [],
            callback: cbfunction
        });
    }

    const handleBuySuccess = () => {
        setOnClaimSuccess(true)
      }

    
    const policy ={
        companyName:companyName,
        policyName:policyName,
        symbol:symbol,
        description:description,
        maxQuantity:maxQuantity,
        amount:amount,
        price:price,
        address:address
    }

    const handleClaimClick = () => {
        if(certificateVerfication){
          setOpen(true);
        }
        else{
          setOnCertificateError(true);
        }
      }

    return(

        <div>
            { 
                amount != 0  &&
                <>
                <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",p: 1,m: 1}}><ClaimBox value={policy} onclick={handleClaimClick} ></ClaimBox></Box>
                <ClaimDialog value={open} onClose={()=>{setOpen(false)}} onsuccess={ handleBuySuccess } policy={policy} onClaim = {makeClaim}></ClaimDialog>
                <ErrorDialog value={onClaimSuccess} title={'申請理賠成功！'} context={`保險公司已支付 ${amount*price} ETH到您戶頭。`} onClose={()=>{ setOnClaimSuccess(false)}}></ErrorDialog>
                <ErrorDialog value={onCertificateError} title={'不符合資格'} context={'並無相關診斷證明可申請理賠，若結果不符預期請洽詢保險公司。'} onClose={()=>{setOnCertificateError(false)}}></ErrorDialog>
                </>
            }
        </div>
    )
    
}