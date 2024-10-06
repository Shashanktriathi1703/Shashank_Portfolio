import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isupdated: false
    },
    reducers:{
        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;//It sets the "user object" to the "action.payload", which contains the user's information (e.g., username, email).
            state.error = null;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;//It sets error to action.payload, which contains the error message received from the server.
        },
        loadUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;//It sets the "user object" to the "action.payload", which contains the user's information (e.g., username, email).
            state.error = null;
        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;//It sets error to action.payload, which contains the error message received from the server.
        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};//It sets the "user object" to the "action.payload", which contains the user's information (e.g., username, email).
            state.error = null;
            state.message = action.payload;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;//It sets error to action.payload, which contains the error message received from the server.
        },
        updatePasswordRequest(state, action){
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updatePasswordSuccess(state, action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action){
            state.loading = false,
            state.isUpdated = false,
            state.message = null;
            state.error = action.payload;//It sets error to action.payload, which contains the error message received
        },
        updateProfileRequest(state, action){
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action){
            state.loading = false,
            state.isUpdated = false,
            state.message = null;
            state.error = action.payload;//It sets error to action.payload, which contains the error message received
        },
        updateProfileResetAfterUpdate(state, action){
            state.error = null;
            state.isUpdated = false;
            state.message = null;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.user = state.user;
        }
    }
});

//Login "login" from this method
export const login = (email, password) => async(dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try{
        const {data} = await axios.post("https://shashank-portfolio-6o8s.onrender.com/api/v1/user/login", {email, password}, {withCredentials: true, headers: { "Content-Type" : "application/json" }});
        dispatch(userSlice.actions.loginSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    }catch(error){
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
};

//Get user "getuser" from this method
export const getUser = () => async(dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try{
        const {data} = await axios.get("https://shashank-portfolio-6o8s.onrender.com/api/v1/user/me", {withCredentials: true});
        dispatch(userSlice.actions.loadUserSuccess(data.user));
        dispatch(userSlice.actions.clearAllErrors());
    }catch(error){
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
    }
};

//Logout "logout" from this method
export const logout = () => async(dispatch) => {
    try{
        const {data} = await axios.get("https://shashank-portfolio-6o8s.onrender.com/api/v1/user/logout", {withCredentials: true});
        dispatch(userSlice.actions.logoutSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    }catch(error){
        dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
};

//Update Password "updatePassword" from this method
export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async(dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try{
        const {data} = await axios.put("https://shashank-portfolio-6o8s.onrender.com/api/v1/user/update/password", { currentPassword, newPassword, confirmNewPassword }, { withCredentials: true, headers: { "Content-Type" : "application/json" }});
        dispatch(userSlice.actions.updatePasswordSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    }catch(error){
        dispatch(userSlice.actions.updatePasswordFailed(error.response.data.message));
    }
}

//Update Profile "updateProfile" from this method
export const updateProfile = (newData) => async(dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try{
        const {data} = await axios.put("https://shashank-portfolio-6o8s.onrender.com/api/v1/user/update/me", newData, { withCredentials: true, headers: { "Content-Type" : "multipart/form-data" }});
        dispatch(userSlice.actions.updateProfileSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());
    }catch(error){
        dispatch(userSlice.actions.updateProfileFailed(error.response.data.message));
    }
}

//Reset the Profile After Update the Profile "resetProfile" from this method
export const resetProfile = () => (dispatch) =>{
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
}

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
}

export default userSlice.reducer;