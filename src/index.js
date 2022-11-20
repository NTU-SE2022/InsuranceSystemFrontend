

import React, {Fragment} from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from '@mui/material/styles';
import store from './store';
import { Provider } from 'react-redux'
import Diagnosis from './Diagnosis';
import SignIn from './Doctor/SignIn';
import {  
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';



// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.querySelector("#root")).render(
    <Provider store={store}>
        <Router>
                <Routes>
                    <Route exact path="/" element={<Diagnosis />}/>
                    <Route exact path="/SignIn" element={<SignIn/>}/>
                    {/* <Route exact path="/connect" element={<Connect/>}/> */}
                </Routes>
        </Router> 
    </Provider>   
    // <React.StrictMode>
    //   <StyledEngineProvider injectFirst>
    //     <Diagnosis />
    //   </StyledEngineProvider>
    // </React.StrictMode>
  );
