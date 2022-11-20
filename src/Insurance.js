import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import WalletConnectionCard from './WalletConnectionCard';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Insurance() {
  return (
    <Container maxWidth="sx">
    <Box sx={{flexGrow:1, margin: 10}}>
      <Box sx={{ flexGrow: 1,boxShadow: 1, borderRadius: 2, backgroundColor: '#E0E0E0', p: 2}}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item><WalletConnectionCard variant="outlined"></WalletConnectionCard></Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Container>
  );
}