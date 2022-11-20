

import React, {Fragment} from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/store';
import {getLoggedStated} from './store/userData';
import Insurance from './Insurance';
import InsuranceLogged from './InsuranceLogged';
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
                    {/* <Route exact path="/" element={ loggedIn ? ( <Insurance />): ( <SignIn /> )}/> */}
                    <Route exact path="/" element={<Insurance/>}/>
                    <Route exact path="/connect" element={<InsuranceLogged/>}/>
                </Routes>
        </Router> 
    </Provider>   
    // <React.StrictMode>
    //   <StyledEngineProvider injectFirst>
    //     <Diagnosis />
    //   </StyledEngineProvider>
    // </React.StrictMode>
  );
