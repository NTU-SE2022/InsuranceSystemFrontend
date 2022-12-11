import * as React from 'react';
import {Box,Button} from '@mui/material';
import { Typography } from '@mui/material';

const ipfsAttachments = {
    "0xf49Bcbe5115Dcf86ECfD3Ec7C10EAB2183a55330": "https://ipfs.litnet.work/ipfs/QmaLFKXk8WBcLbk8wybEkQELcT71gTQfEbzXyuxM517Z6h?filename=Major%20diseases%20and%20major%20injuries.pdf",
    "0x854e1a8B2E0a6D7fAE73D133998f45F2b81A112c": "https://ipfs.litnet.work/ipfs/QmQ5NUP8xCVotgcmrwi11UEM1yvSNkS9vq1zCyZbJxymSu?filename=Anti-cancer%20insurance.pdf",
}

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
            <BorderBoxContent value={props.value} />
        </Box>
        <Box sx={{display:'flex',flexDirection:'column'}}>
            {
                ipfsAttachments[props.value.address] && (
                    <Box sx={{textAlign:'right',flexGrow:1}}>
                        <Button variant='outlined' fullWidth onClick={() => window.open(ipfsAttachments[props.value.address], '_blank')}>
                            Attachment
                        </Button>
                    </Box>
                )
            }
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
            <Box component="p">
                Policy Description:
                <Typography style={{ whiteSpace: 'pre-line' }}>
                    { replaceWithSlashN(props.value.description) }
                </Typography>
            </Box>
            {/* <Box component="p">
                Policy Description:<p dangerouslySetInnerHTML={{__html: replaceWithBr(props.value.description)}} />
            </Box> */}
            
            <Box component="p">Price:{props.value.price}</Box>
            <Box component="p">MaxQuantity:{props.value.maxQuantity}</Box>
            <Box component='p'>Feature:{props.value.considerSymptom.map((policy=>(<Box key={props.value.symbol} component='li'>{policy}</Box>)))}</Box>
            {/* <Box component="p">Category:{props.value.category}</Box>
            <Box component='p'>Feature:{props.value.feature.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
            <Box component='p'>Coverage:{props.value.coverage.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box> */}
        </Box>
    )
}

function replaceWithBr(input_string) {
    return input_string.replace(/\\n/g, "<br />");
}

function replaceWithSlashN(input_string) {
    return input_string.replace(/\\n/g, "\n");
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
                <Box sx={{textAlign:'right',flexGrow:1}}><Button variant='outlined' fullWidth onClick={()=>props.onclick()} disabled={props.value.expired}>Claim</Button></Box>
                <Box sx={{textAlign:'right',flexGrow:1}}><Button variant='outlined' fullWidth onClick={()=>props.onbuy()} disabled={!props.value.expired}>Pay</Button></Box>
            </Box>
        </Box>
    )
}

function ClaimBoxContent(props){
    let policyStatus = ""
    if(props.value.expired){
        policyStatus = "Expired"
    }
    else{
        policyStatus ="Available"
    };
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
            <Box component="p">Status:{policyStatus}</Box>
            <Box component="p">Policy Description:{props.value.description}</Box>
            <Box component="p">Price:{props.value.price}</Box>
            <Box component="p">Amount:{props.value.amount}</Box>
            <Box component="p">Total Claims:{props.value.amount*props.value.claimMoney}</Box>
        </Box>
    )
}