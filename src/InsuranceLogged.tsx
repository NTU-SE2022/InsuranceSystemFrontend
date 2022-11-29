import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Pagination} from '@mui/material';
import { BorderBox } from './PolicyCard';
import {Stack} from '@mui/material';
import axios from "axios";



const config = {
  baseURL: "http://localhost:3000/data/test.json",
}

// axios(config).then(function (response){
//   console.log(response);
// }).catch(function(error){
//   console.log(error);
// });



import {BuyPolicyDialog,ErrorDialog,ClaimDialog} from './ShowDialog';
import { ClaimBox } from './PolicyCard';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Policy {
  companyname: string;
  policyname: string;
  category:string;
  feature:string[];
  coverage:string[];
  amount:number;
  cost:number
}

interface Claim {
  companyName: string;
  policyId: string;
  policyName: string;
  policyStatus: string;
  amount:number;
  effectiveDate: Date;
  paymentMethod: string;
  paymentRecord:string;
  dueDate: Date;
  money:number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function InsuranceLogged() {
  // type script
  const config = {
    baseURL: "http://localhost:3000/data/test.json",
  }
  const configOwnPolicy = {
    baseURL: "http://localhost:3000/data/ownpolicy.json",
  }
  const [isLoading, setLoading] = React.useState(true);
  const [allPolicy, setAllPolicy] = React.useState<Policy[]>([]);
  const [nowPolicy,setNowPolicy] = React.useState<Policy>(allPolicy[0]);
  const [ownPolicy,setOwnPolicy] = React.useState<Claim[]>([]);
  React.useEffect(() => {
    axios(config).then(response => {
      setAllPolicy(response.data.response.policy);
      setNowPolicy(response.data.response.policy[0]);
      setLoading(false);
    }).catch(error =>{
      console.log(error);
    });
    axios(configOwnPolicy).then(response =>{
      setOwnPolicy(response.data.response.policy);
      if(response.data.response.policy.length != 0){
        setNowClaim(response.data.response.policy[0]);
      }
    }).catch(error =>{
      console.log(error);
    });
  }, []);

  const [value, setValue] = React.useState(0);
  const [open,setOpen] = React.useState(false);
  const [openClaim,setOpenClaim] = React.useState(false);
  const [onHealthError,setOnHealthError] = React.useState(false);
  const [onCertificateError,setOnCertificateError] = React.useState(false);
  const [onBuySuccess, setOnBuySuccess] = React.useState(false);
  const [onBuyError, setOnBuyError] = React.useState(false);
  const [onClaimSuccess, setOnClaimSuccess] = React.useState(false);
  // const [onClaimError, setOnClaimError] = React.useState(false);
  const [healthVerfication,sethealthVerfication] = React.useState(true);
  const [certificateVerfication,setCertificateVerfication] = React.useState(true);
  const [claimMoney,setClaimMoney] = React.useState(0);

  const [nowClaim,setNowClaim] = React.useState(ownPolicy[0]);


  // const [clickedButton, setClickedButton] = React.useState('');
  // const handleGetDataClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   // get data from here
  //   axios(config).then(function (response){
  //     //f12 console log
  //     console.log(response);
  //   }).catch(function(error){
  //     console.log(error);
  //   });
  //   const button: HTMLButtonElement = event.currentTarget;
  //   setClickedButton(button.name);
  // };
  

  const handleBuyClick = () => {
    if(healthVerfication){
      setOpen(true);
    }
    else{
      setOnHealthError(true);
    }
  }
  const handleClaimClick = () => {
    if(certificateVerfication){
      setOpenClaim(true);
    }
    else{
      setOnCertificateError(true);
    }
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if(newValue == 1 && ownPolicy.length != 0){
      setNowClaim(ownPolicy[0])
    }
  };
  const addOwnPolicy = (addPolicy: Claim) =>{
    if(ownPolicy.some(item => addPolicy.policyName === item.policyName)){
      const updateState = ownPolicy.map(policy => {
        if(policy.policyName == addPolicy.policyName){
          return {...policy, amount:(policy.amount + addPolicy.amount)};
        }else{
          return policy
        };
      })
      setOwnPolicy(updateState);
    }else{
      setOwnPolicy([...ownPolicy,addPolicy]);
      console.log(`addPolicy:${addPolicy}`);
      if(ownPolicy.length == 0){
        setNowClaim(addPolicy);
      }
    }
    nowPolicy.amount=addPolicy.amount;
  };
  const handlePolicyChange = (event: React.ChangeEvent<unknown>,page:number) =>{
    setNowPolicy(allPolicy[page-1])
  }
  const handleClaimChange = (event: React.ChangeEvent<unknown>,page:number) =>{
    setNowClaim(ownPolicy[page-1])
  }
  const handleBuySuccess = () =>{
    setOnClaimSuccess(true)
    const newOwnPolicy = ownPolicy.filter((policy) => policy.policyId !== nowClaim.policyId);
    setOwnPolicy( newOwnPolicy );
    setNowClaim(newOwnPolicy[0]);
  }

  if (isLoading || !nowPolicy) {
    return <div className="App">Loading...</div>;
  }

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Policies" {...a11yProps(0)} />
            <Tab label="Own Policies" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          All Available Policies
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="CompanyName" label="CompanyName" variant="standard" />
            <TextField id="PolicyName" label="PolicyName" variant="standard" />
            <TextField id="Category" label="Category" variant="standard" />
            <TextField id="Keyword" label="Keyword" variant="standard" />
            <Button variant="outlined">Search</Button>
            {/* <Button variant="outlined" onClick={handleGetDataClick}>Get data (see console log f12)</Button> */}
          </Box>
            <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",p: 1,m: 1}}><BorderBox value={nowPolicy} onclick={handleBuyClick} ></BorderBox></Box>
              <BuyPolicyDialog value={open} onClose={()=>{setOpen(false)}} onPolicyNumber={addOwnPolicy} onsuccess={() => setOnBuySuccess(true)} onerror={()=>setOnBuyError(true)} policy={nowPolicy}></BuyPolicyDialog>
              <ErrorDialog value={onBuySuccess} title={'購買成功！'} context={`成功購買${nowPolicy.amount}單位！已從帳戶扣款${nowPolicy.amount * nowPolicy.cost}ETH。`} onClose={()=>{ setOnBuySuccess(false)}} ></ErrorDialog>
              <ErrorDialog value={onBuyError} title={'購買失敗！'} context={`你帳戶餘額低於${nowPolicy.amount * nowPolicy.cost}ETH，請確認帳戶餘額充足後再試一次。`} onClose={()=>{setOnBuyError(false)}}></ErrorDialog>
              <ErrorDialog value={onHealthError} title={'不符合資格'} context={'你的健康狀況並不符合加保資格！請參考其他保單，或洽保險公司諮詢。'} onClose={()=>{setOnHealthError(false)}}></ErrorDialog>
            <Stack alignItems="center">
              <Pagination count={allPolicy.length} variant="outlined" shape="rounded" sx={{margin: "auto"}} onChange={handlePolicyChange}/>
            </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Own Policies
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="CompanyName" label="CompanyName" variant="standard" />
            <TextField id="PolicyID" label="PolicyID" variant="standard" />
            <TextField id="PolicyName" label="PolicyName" variant="standard" />
            <TextField id="PolicyState" label="PolicyState" variant="standard" />
            <TextField id="Keyword" label="Keyword" variant="standard" />
            <Button variant="outlined">Search</Button>
          </Box>
          <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",p: 1,m: 1}}><ClaimBox value={nowClaim} onclick={handleClaimClick} ></ClaimBox></Box>
          <ClaimDialog value={openClaim} onClose={()=>{setOpenClaim(false)}} onsuccess={ handleBuySuccess } onSetMoney={()=>setClaimMoney(nowClaim.amount*nowClaim.money)} policy={nowClaim} ></ClaimDialog>
          <ErrorDialog value={onClaimSuccess} title={'申請理賠成功！'} context={`保險公司已支付 ${claimMoney} ETH到您戶頭。`} onClose={()=>{ setOnClaimSuccess(false)}}></ErrorDialog>
          <ErrorDialog value={onCertificateError} title={'不符合資格'} context={'並無相關診斷證明可申請理賠，若結果不符預期請洽詢保險公司。'} onClose={()=>{setOnCertificateError(false)}}></ErrorDialog>
          <Stack alignItems="center">
              <Pagination count={ownPolicy.length} variant="outlined" shape="rounded" sx={{margin: "auto"}} onChange={handleClaimChange}/>
            </Stack>
        </TabPanel>
      </Box>
    </Container>
  );
}
  