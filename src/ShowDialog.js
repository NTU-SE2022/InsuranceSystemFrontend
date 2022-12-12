import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'; 
import {Box} from '@mui/material';

// interface Policy {
//     companyname: string;
//     policyname: string;
//     category:string;
//     feature:string[];
//     coverage:string[];
//     amount:number;
//     cost:number
//   }

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

function PolicyToClaim(policy,buyAmount){
    let nowDate = new Date();
    console.log(nowDate.getFullYear());
    let nowDueDate = new Date();
    nowDueDate.setFullYear(nowDate.getFullYear()+1);
    return(
        {
            companyName: policy.companyname,
            policyId: policy.policyname,
            policyName: policy.policyname,
            policyStatus: 'available',
            amount:buyAmount,
            effectiveDate: nowDate,
            paymentMethod: policy.cost,
            paymentRecord: '',
            dueDate:nowDueDate,
            money:10,
        }
    )
}

export function BuyPolicyDialog(props){
    const [textInput, setTextInput] = React.useState('')

    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    // const EnoughETH = true;
    const handleClose = () => {
        props.onClose();
    };

    const handlePolicyNumber = () =>{
        if(parseInt(textInput) > props.policy.maxQuantity){
            props.onovernumber();
        }
        else{
            props.handleBuyPolicy(parseInt(textInput));
        }
        // if(EnoughETH){
        //     props.onClose();
            
        //     props.onsuccess();
        // }
        // else{
        //     props.onerror();
        // }
    }
    // const buyETH = (res) => {
    //     res.then(()=>{

    //     }).catch({
    //         props.onerror();
    //     })
    // }
    return(
        <Dialog
        open={props.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >        
        <DialogTitle id="alert-dialog-title">
        {"Buy Polucy?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Box component="p">Policy:{props.policy.policyName}</Box>
                <Box component="p">Cost:{props.policy.price}</Box>
                <TextField id="policyNumber" label="policyNumber" variant="standard" onChange={handleTextInputChange} value={textInput}></TextField>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlePolicyNumber} autoFocus>Ok</Button>
        </DialogActions>
    </Dialog>
    )
}
export function ClaimDialog(props){
    let money = 0;
    if(props.policy != undefined){
        money = props.policy.claimMoney*props.policy.amount;
    }
    const handleClose = () => {
        props.onClose();
    };
    const handleClick = () =>{
        props.onClaim();
    }
    return(
        <Dialog
        open={props.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >        
        <DialogTitle id="alert-dialog-title">
        {"Claim Eligible"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Box component="p">{`Confirm Claim, Insurance Company Claim ${money} WEI`}</Box>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClick} autoFocus>Ok</Button>
        </DialogActions>
    </Dialog>
    )
}

export function ErrorDialog(props){

  
    const handleClose = () => {
        props.onClose();
    };
    return(
        <Dialog
        open={props.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >        
        <DialogTitle id="alert-dialog-title">
        {props.title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {props.context}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
    </Dialog>
    )
}

export function SuccessDialog(){

}

export function FailDialog(){

}