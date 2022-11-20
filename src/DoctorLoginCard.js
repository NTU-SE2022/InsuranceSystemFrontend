import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        <FontAwesomeIcon icon={faUserDoctor} fontSize="100px"/>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Doctor
      </Typography>
      <Typography variant="body2">
        Use ID / Password to verify your role.
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" style={{margin: '0 auto', display: "flex"}} href="SignIn">Login</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
