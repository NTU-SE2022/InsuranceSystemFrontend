

import React, {Fragment} from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/store';
import {getLoggedStated} from './store/userData';
import Insurance from './Insurance';
import InsuranceLogged from './InsuranceLogged';
import SignIn from './Doctor/SignIn';
import useEthereum from "./WEB3/useEthereum";
import {  
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export const userWallet = React.createContext()
//     isMetaMaskInstalled:false,
//     provider:null,
//     accounts:[],
//     web3:null,
//     enable:() =>{},
//     disable:() =>{}
//   });
// export const userWallet = React.createContext()
//   const {
//     isMetaMaskInstalled,
//     provider,
//     accounts,
//     web3,
//     enable,
//     disable
// } = useEthereum();
// Importing the Bootstrap CSS

const App = () => {
    return(
        <Provider store={store}>
            <userWallet.Provider value={useEthereum()}>
            <Router>
                    <Routes>
                        {/* <Route exact path="/" element={ loggedIn ? ( <Insurance />): ( <SignIn /> )}/> */}
                        <Route exact path="/" element={<Insurance/>}/>
                        <Route path="/connect" element={<InsuranceLogged/>}/>
                    </Routes>
            </Router>
            </userWallet.Provider> 
        </Provider>
    )  
};

ReactDOM.createRoot(document.querySelector("#root")).render(
    <App></App>
    // <React.StrictMode>
    //   <StyledEngineProvider injectFirst>
    //     <Diagnosis />
    //   </StyledEngineProvider>
    // </React.StrictMode>
);
