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
    return(
        <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        <Box component="p">Company Name:{props.value.companyname}</Box>
        <Box component="p">Policy Name:{props.value.policyname}</Box>
        <Box component="p">Category:{props.value.category}</Box>
        <Box component='p'>Feature:{props.value.feature.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
        <Box component='p'>Coverage:{props.value.coverage.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
        </Box>
    )
}
