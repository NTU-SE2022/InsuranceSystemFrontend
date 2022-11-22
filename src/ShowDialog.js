import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'; 
import {Box} from '@mui/material';
export function BuyPolicyDialog(props){
    const [textInput, setTextInput] = React.useState('')

    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
    const EnoughETH = false;
    const handleClose = () => {
        props.onClose();
    };

    const handlePolicyNumber = () =>{
        if(EnoughETH){
            props.onClose();
            props.onPolicyNumber(
                {
                    name:props.policyname,
                    cost:props.cost,
                    number:textInput
                }
            )
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
                <Box component="p">Policy:{props.policyName}</Box>
                <Box component="p">Cost:{props.policyCost}</Box>
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