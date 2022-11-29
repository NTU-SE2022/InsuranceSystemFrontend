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
    const EnoughETH = true;
    const handleClose = () => {
        props.onClose();
    };

    const handlePolicyNumber = () =>{
        if(EnoughETH){
            props.onClose();
            props.onPolicyNumber(
                PolicyToClaim(props.policy,parseInt(textInput))
            );
            props.onsuccess();
        }
        else{
            props.onerror();
        }
    }

    return(
        <Dialog
        open={props.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >        
        <DialogTitle id="alert-dialog-title">
        {"是否購買保單"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Box component="p">Policy:{props.policy.policyname}</Box>
                <Box component="p">Cost:{props.policy.cost}</Box>
                <TextField id="policyNumber" label="policyNumber" variant="standard" onChange={handleTextInputChange} value={textInput}></TextField>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handlePolicyNumber} autoFocus>OK</Button>
        </DialogActions>
    </Dialog>
    )
}
export function ClaimDialog(props){
    let money = 0;
    console.log(props)
    if(props.policy != undefined){
        money = props.policy.money*props.policy.amount;
    }
    const handleClose = () => {
        props.onClose();
    };
    const handleClick = () =>{
        props.onsuccess();
        props.onClose();
        props.onSetMoney();
    }
    return(
        <Dialog
        open={props.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >        
        <DialogTitle id="alert-dialog-title">
        {"符合理賠資格"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Box component="p">{`請確認是否申請理賠，若按下確認，保險公司將立即理賠相對應費用 ${money} ETH`}</Box>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button onClick={handleClick} autoFocus>OK</Button>
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