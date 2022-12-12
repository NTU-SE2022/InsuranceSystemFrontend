import * as React from 'react';
import { userWallet } from '..';
import { useNavigate } from 'react-router';
import Web3function from '../WEB3/Web3function';
import abijson from '../WEB3/new_abi.json';
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
    keyword:ClaimKeyword|null
  }
  interface ClaimKeyword {
    companyName:string;
    policyName:string;
    status:string;
    description:string;
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

export const Claim = ({address,keyword}:PolicyAddress) => {
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
    const [matchKeyword,setMatchKeyWord] = React.useState(true)

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
            getPolicyPrice();
            getPolicyAmount();
            getClaimVerfication();  
            getClaimMoney();
        }
    },[connect])

    React.useEffect(() => {
        if(keyword){
            let show = false
            if(keyword.description == "" && keyword.companyName =="" && keyword.policyName == "" && keyword.status ==""){show = true}
            if(keyword.companyName == companyName){show = true}
            if(keyword.policyName == policyName){show = true}
            if(keyword.status == "Expired" && expired){show = true}
            if(keyword.status == "Available" && !expired){show = true}
            if(keyword.description != ""){
                if(description.includes(keyword.description)){show = true}
            }
            setMatchKeyWord(show)
            console.log("keyword:" + keyword);
        }
    },[keyword])

    const [symbol,setSymbol] = React.useState('');
    const [maxQuantity,setMaxQuantity] = React.useState(0);
    const [amount,setAmount] = React.useState(0);
    const [price,setPrice] = React.useState(0);
    const [description,setDescription] = React.useState('');
    const [companyName,setCompanyName] = React.useState('');
    const [policyName,setPolicyName] = React.useState('');
    const [expired,setExpired] = React.useState(true);
    const [tokenid,setTokenId] = React.useState<string[]>([])
    const [claimMoney,setClaimMoney] = React.useState(0);
    const [onCertificateError,setOnCertificateError] = React.useState(false);
    const [open,setOpen] = React.useState(false);
    const [onClaimSuccess, setOnClaimSuccess] = React.useState(false);
    const [onClaimError, setOnClaimError] = React.useState(false);
    const [onExpired,setOnExpired] = React.useState(false);
    const [onBuyError, setOnBuyError] = React.useState(false);
    const [certificateVerfication,setCertificateVerfication] = React.useState(false);

    React.useEffect(()=>{
        if(amount!=0){
            console.log('token id')
            getTokenId();
            getPolicyStatus();
        }
    },[amount])

    React.useEffect(()=>{
        if(tokenid.length != 0){
            console.log('status')
            getPolicyStatus();
        }
    },[tokenid])

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

    const getClaimMoney = () => {
        contractCall({
            method: 'claimAmountCalculation',
            param: [],
            callback: (res) => {
                setClaimMoney(res);
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
                console.log(accounts[0])
                console.log(address)
                console.log(res)
                setAmount(res);
            }
        });
    };

    const getTokenId = () => {
        contractCall({
            method: 'getIdsByAddress',
            param: [accounts[0]],
            callback: (res) => {
                setTokenId(res);
            }
        });
    };

    const getPolicyStatus = () => {
        contractCall({
            method: 'isPurchased',
            param: [0],
            callback: (res) => {
                console.log(`status:${!res}`)
                setExpired(Boolean(!res));
            }
        });
    };

    const purchaseClaim = (id:string) => {
        // console.log('purchaseClaim');
        if(!contract) return
        contract.methods['purchase'](parseInt(id)).send({"from": accounts[0],"value":price})
        // contract.methods['purchase'](parseInt(id)).send({"from": accounts[0],"value":price}).then((res:any)=>{
        //     console.log('send')
        // }).catch(()=>{
        //     setOnBuyError(true)
        // });
    };

    const getClaimVerfication = () => {
        if(!contract) return
        contract.methods['eligibilityVerificationForClaim'].apply(this, []).call({"from": accounts[0]}).then((res:any)=>{
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

    const makeClaim = (id:string) => {
        if(!contract) return
        return contract.methods['claim'](parseInt(id)).send({"from": accounts[0]})
        // contract.methods['claim'](parseInt(id)).send({"from": accounts[0]}).then((res:any)=>{
        // }).catch(()=>{
        //     setOnClaimSuccess(false)
        //     setOpen(false);
        // });
    }

    const handleMakeClaim = () =>{
        var actions = tokenid.map(makeClaim)
        console.log(actions)
        const claimPromise =Promise.all(actions)
        // const claimPromise = new Promise((resolve,reject) => {
            
        //     tokenid.forEach((value, index, array) => {
        //         makeClaim(value);
        //         console.log(index)
        //         if (index === array.length -1) resolve('success');
        //     });
        // })
        if(certificateVerfication){
            claimPromise.then(()=>{
                setOnClaimSuccess(true)
                setOpen(false);
            }).catch((error)=>{
                setOnClaimSuccess(false)
                setOpen(false);
            })
        }
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
        address:address,
        expired:expired,
        claimMoney:claimMoney
    }

    const handleClaimClick = () => {
        // if(expired){
        //     setOnExpired(true)
        //     return
        // }
        // if(certificateVerfication){
        if(certificateVerfication){
          setOpen(true);
        }
        else{
          setOnCertificateError(true);
        }
      }


    const handlePayment = () => {
        var purchaseActions = tokenid.map(purchaseClaim)
        const idPromise = Promise.all(purchaseActions)
        if(expired){
            idPromise.then(()=>{
                console.log('buy success')
            }).catch(()=>{
                setOnBuyError(true)
                setOnClaimSuccess(false)
                setOpen(false);
            })
        }
    }
    return(

        <div>
            { 
                amount != 0  &&
                matchKeyword  &&
                <>
                <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",p: 1,m: 1}}><ClaimBox value={policy} onclick={handleClaimClick} onbuy={handlePayment} expired={Boolean(expired)}></ClaimBox></Box>
                <ClaimDialog value={open} onClose={()=>{setOpen(false)}} onsuccess={ handleBuySuccess } policy={policy} onClaim = {handleMakeClaim}></ClaimDialog>
                <ErrorDialog value={onClaimSuccess} title={'申請理賠成功！'} context={`保險公司已支付 ${amount*price} WEI到您戶頭。`} onClose={()=>{ setOnClaimSuccess(false)}}></ErrorDialog>
                <ErrorDialog value={onCertificateError} title={'不符合資格'} context={'並無相關診斷證明可申請理賠，若結果不符預期請洽詢保險公司。'} onClose={()=>{setOnCertificateError(false)}}></ErrorDialog>
                <ErrorDialog value={onBuyError} title={'購買失敗！'} context={`你帳戶餘額低於${amount * price}WEI，請確認帳戶餘額充足後再試一次。`} onClose={()=>{setOnBuyError(false)}}></ErrorDialog>
                </>
            }
        </div>
    )
    
}