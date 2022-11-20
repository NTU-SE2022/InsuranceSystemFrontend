import {createSlice} from "@reduxjs/toolkit";
export const userDataSlice = createSlice({
    name: "userData",
    initialState:{
        loggedState: ""
    },
    reducers: {
        changeLogged: (state, action) =>{
            state.loggedState = true;
        }
    },
});
export const getLoggedStated = (state) => state.userData;
export default userDataSlice.reducer;