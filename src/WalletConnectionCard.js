import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import useEthereum from './WEB3/useEthereum';
import { Redirect } from 'react-router';
import { UseEthereumReturns } from './WEB3/useEthereum';
import { useNavigate } from 'react-router';
// import useMetaMask from './useMetaMask';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
// 當 USER 未下載 **MetaMask Chrome extension**
const CONNECT_TEXT = 'Welcome Back to Dino Club!';
// 當 USER 已下載 **MetaMask Chrome extension**
const CONNECTED_TEXT = 'Connected';
// 當 USER 已經連接到 Ethereum 帳戶

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const LoginButton = ({
    isMetaMaskInstalled,
    provider,
    accounts,
    web3,
    enable,
    disable
  }) => {
  console.log(accounts)
  return(
    <Button
        variant="contained"
        style={{margin: '0 auto', display: "flex"}}
        onClick={() => {
          enable();
        }}
        disabled={Boolean(web3)}
    >
        Connect
    </Button>
  )

}

const LoginBox = () =>{
    const {
      isMetaMaskInstalled,
      provider,
      accounts,
      web3,
      enable,
      disable
  } = useEthereum();
  const navigate = useNavigate();
  React.useEffect(()=>{
    if(!accounts.length == 0){
      // navigate('/connect',{state:{provider:provider,accounts:accounts,web3:web3,disable:disable}})
      navigate('/connect',{ state: { accounts:accounts } })
    }
  },[accounts]);
  return(
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        <FontAwesomeIcon icon={faWallet} fontSize="100px"/>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Wallet
      </Typography>
      <Typography variant="body2">
        Connect your wallet.
      </Typography>
    </CardContent>
    <CardActions>
      {/* <Button variant="contained" style={{margin: '0 auto', display: "flex"}} href="connect">Connect</Button> */}
      {/* <OnboardingButton></OnboardingButton> */}
      {/* <Box>{accounts}</Box> */}
      <LoginButton
        accounts={accounts}
        disable={disable}
        enable={enable}
        isMetaMaskInstalled={isMetaMaskInstalled}
        provider={provider}
        web3={web3}>
        </LoginButton>
    </CardActions>
  </React.Fragment>
  )
};


// export function OnboardingButton() {

//   const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
// 	// 按鈕要呈現的文字
//   const [isDisabled, setDisabled] = useState(false);
// 	// 跳出下載頁面的時候要使按鈕無效
//   const [accounts, setAccounts] = useState([]);
// 	// 之後要用來記錄 使用者的 ethereum 帳號
//   const onboarding = React.useRef();
//   const oneth = React.useRef()

//   React.useEffect(()=>{
//     if(!onboarding.current){
//       onboarding.current = new MetaMaskOnboarding();
//       oneth.current = new useEthereum();
//     }
//   },[]);

//   React.useEffect(()=>{
//     if(MetaMaskOnboarding.isMetaMaskInstalled()){
//       if(accounts.length > 0){
//         setButtonText(CONNECTED_TEXT);
//         setDisabled(true);
//         // onboarding.current.stopOnboarding();
//         oneth.current.accounts
//       }else{
//         setButtonText(CONNECT_TEXT);
//         setDisabled(false);
//       }
//     }
//   },[accounts]);

//   React.useEffect(() => {
//     function handleNewAccounts(newAccounts) {
//       setAccounts(newAccounts);
//     }
//     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
//       window.ethereum
//         .request({ method: 'eth_requestAccounts' })
//         .then(handleNewAccounts);
//       window.ethereum.on('accountsChanged', handleNewAccounts);
//       return () => {
//         window.ethereum.off('accountsChanged', handleNewAccounts);
//       };
//     }
//   }, []);

//   const onClick=()=>{
//     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
//       window.ethereum
//         .request({ method: 'eth_requestAccounts' })
//         .then((newAccounts) => setAccounts(newAccounts));
//     } else {
//       onboarding.current.startOnboarding();
//     }
//   }

//   window.ethereum.on('accountsChanged', function (accounts) {
//     // Time to reload your interface with accounts[0]!
//     console.log(accounts[0])
//   });
//   return (
//     <Button variant="contained" style={{margin: '0 auto', display: "flex"}} disabled={isDisabled} onClick={onClick}>
//       {buttonText}
//     </Button>
//     // <StyledButton disabled={isDisabled} onClick={onClick}>
//     // {buttonText}
//     // </StyledButton>
//   );
// }



export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      {/* <Card variant="outlined">{card}</Card> */}
      <LoginBox></LoginBox>
    </Box>
  );
}
