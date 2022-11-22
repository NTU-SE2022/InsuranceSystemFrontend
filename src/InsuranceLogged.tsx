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
import {BuyPolicyDialog,ErrorDialog} from './ShowDialog';



import axios from "axios";



const config = {
  baseURL: "http://localhost:3000/data/test.json",
}

// axios(config).then(function (response){
//   console.log(response);
// }).catch(function(error){
//   console.log(error);
// });



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
  const allPolicy = [
    {
      companyname: '1',
      policyname: '1',
      category:'1',
      feature:['1','1'],
      coverage:['1','1'],
      amount:1,
      cost:1,
    },
    {
      companyname: '2',
      policyname: '2',
      category:'2',
      feature:['2','2'],
      coverage:['2','2'],
      amount:1,
      cost:1,
    }
  ];
  const [value, setValue] = React.useState(0);
  const [open,setOpen] = React.useState(false);
  const [onHealthError,setOnHealthError] = React.useState(false);
  const [onBuySuccess, setOnBuySuccess] = React.useState(false);
  const [onBuyError, setOnBuyError] = React.useState(false);
  const [healthVerfication,sethealthVerfication] = React.useState(true);
  const [nowPolicy,setNowPolicy] = React.useState(allPolicy[0]);
  const [ownPolicy,setOwnPolicy] = React.useState<Policy[]>([]);

  // type script
  const config = {
    baseURL: "http://localhost:3000/data/test.json",
  }
  const [clickedButton, setClickedButton] = React.useState('');
  const handleGetDataClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // get data from here
    axios(config).then(function (response){
      //f12 console log
      console.log(response);
    }).catch(function(error){
      console.log(error);
    });
    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton(button.name);
  };
  

  const handleBuyClick = () => {
    if(healthVerfication){
      setOpen(true);
    }
    else{
      setOnHealthError(true);
    }
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const addOwnPolicy = (addPolicy: Policy) =>{
    setOwnPolicy([...ownPolicy,addPolicy]);
    console.log(ownPolicy);
  };
  const handlePolicyChange = (event: React.ChangeEvent<unknown>,page:number) =>{
    setNowPolicy(allPolicy[page-1])
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
            <Button variant="outlined" onClick={handleGetDataClick}>Get data (see console log f12)</Button>
          </Box>
            <Box sx={{ display:"flex",justifyContent:"center",alignItems:"center",p: 1,m: 1}}><BorderBox value={nowPolicy} onclick={handleBuyClick} ></BorderBox></Box>
              <BuyPolicyDialog value={open} onClose={()=>{setOpen(false)}} onPolicyNumber={addOwnPolicy} onsuccess={() => setOnBuySuccess(true)} onerror={()=>setOnBuyError(true)} policy={nowPolicy}></BuyPolicyDialog>
              <ErrorDialog value={onBuySuccess} title={'購買成功！'} context={`成功購買${nowPolicy.amount}單位！已從帳戶扣款${nowPolicy.cost}ETH。`} onClose={()=>{ setOnBuySuccess(false)}}></ErrorDialog>
              <ErrorDialog value={onBuyError} title={'購買失敗！'} context={`你帳戶餘額低於${nowPolicy.cost}ETH，請確認帳戶餘額充足後再試一次。`} onClose={()=>{setOnBuyError(false)}}></ErrorDialog>
              <ErrorDialog value={onHealthError} title={'不符合資格'} context={'你的健康狀況並不符合加保資格！請參考其他保單，或洽保險公司諮詢。'} onClose={()=>{setOnHealthError(false)}}></ErrorDialog>
            <Stack alignItems="center">
              <Pagination count={allPolicy.length} variant="outlined" shape="rounded" sx={{margin: "auto"}} onChange={handlePolicyChange}/>
            </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Own Policies
        </TabPanel>
      </Box>
    </Container>
  );
}
  