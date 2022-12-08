import * as React from 'react';
import {Box,Button} from '@mui/material';
export function BorderBox(props){
    
    return(
        <Box
        sx={{
        display:'flex',
        flexDirection: 'row',
        boxShadow: 3,
        display:'flex',
        width: '40rem',
        height: '15rem',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        }}
        >
        <Box sx={{flexGrow:10}}>
            <BorderBoxContent value={props.value}></BorderBoxContent>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <Box sx={{textAlign:'right',flexGrow:1}}><Button variant='outlined' fullWidth>Attachment</Button></Box>
            <Box sx={{textAlign:'right',flexGrow:1}}><Button variant='outlined' fullWidth onClick={()=>props.onclick()}>Buy Policy</Button></Box>
        </Box>
        </Box>
    )
}

function BorderBoxContent(props){
    if (props.value === undefined){
        return
    };
    return(
        <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        <Box component="p">Company Name:{props.value.companyName}</Box>
        <Box component="p">Policy Name:{props.value.policyName}</Box>
        <Box component="p">Symbol:{props.value.symbol}</Box>
        <Box component="p">Policy Description:{props.value.description}</Box>
        <Box component="p">Price:{props.value.price}</Box>
        <Box component="p">MaxQuantity:{props.value.maxQuantity}</Box>
        <Box component='p'>Feature:{props.value.considerSymptom.map((policy=>(<Box key={props.value.symbol} component='li'>{policy}</Box>)))}</Box>
        {/* <Box component="p">Category:{props.value.category}</Box>
        <Box component='p'>Feature:{props.value.feature.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
        <Box component='p'>Coverage:{props.value.coverage.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box> */}
        </Box>
    )
}

// interface Claim {
//     companyName: string;
//     policeId: string;
//     policyName: string;
//     policyStatus: string;
//     amount:number;
//     effectiveDate: string;
//     paymentMethod: string;
//     paymentRecord:string;
//     dueDate:string;
//   }

export function ClaimBox(props){
    if (!props.value){
        return(
            <Box></Box>
        )
    };
    return(
        <Box
        sx={{
        display:'flex',
        flexDirection: 'row',
        boxShadow: 3,
        display:'flex',
        width: '50rem',
        height: '30rem',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        }}
        >
        <Box sx={{flexGrow:10}}>
            <ClaimBoxContent value={props.value}></ClaimBoxContent>
        </Box>
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <Box sx={{textAlign:'right',flexGrow:1}}><Button variant='outlined' fullWidth onClick={()=>props.onclick()}>Claim</Button></Box>
        </Box>
        </Box>
    )
}

function ClaimBoxContent(props){
    if (props.value === undefined){
        return
    };
    return(
        // <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        // <Box component="p">Company Name:{props.value.companyName}</Box>
        // <Box component="p">Policy ID:{props.value.policyId}</Box>
        // <Box component="p">Policy Name:{props.value.policyName}</Box>
        // <Box component="p">Policy Status:{props.value.policyStatus}</Box>
        // <Box component='p'>計畫數:{props.value.amount.toString()}</Box>
        // <Box component='p'>Policy Effective Date:{props.value.effectiveDate.toString()}</Box>
        // <Box component="p">Payment Method:{props.value.paymentMethod}</Box>
        // <Box component="p">Payment Record:{props.value.paymentRecord}</Box>
        // <Box component="p">Due Date:{props.value.dueDate.toString()}</Box>
        // </Box>
        <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        <Box component="p">Company Name:{props.value.companyName}</Box>
        <Box component="p">Policy Name:{props.value.policyName}</Box>
        <Box component="p">Symbol:{props.value.symbol}</Box>
        <Box component="p">Policy Description:{props.value.description}</Box>
        <Box component="p">Price:{props.value.price}</Box>
        <Box component="p">Amount:{props.value.amount}</Box>

        </Box>
    )
}