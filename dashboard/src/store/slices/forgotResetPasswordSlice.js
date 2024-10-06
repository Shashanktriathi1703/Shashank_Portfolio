import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        loading: false,
        error: null,
        message: null,
    },
    reducers:{
        forgotPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        clearAllErrors(state, action){
            state.error = null;
            state = state;
        }
    }
});

//Forgot Password "forgotPassword" from this method
export const forgotPassword = (email) => async(dispatch) => {
  dispatch(forgotResetPasswordSlice.actions.forgotPasswordRequest());
  try {
    const {data} = await axios.post("https://shashank-portfolio-6o8s.onrender.com/api/v1/user/password/forgot", { email }, {withCredentials: true, headers: {"Content-Type": "application/json"}});
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordSuccess(data.message));
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
  }catch (error) {
    dispatch(forgotResetPasswordSlice.actions.forgotPasswordFailed(error.response.data.message));
  }
};

//Reset Password "resetPassword" from this method
export const resetPassword = (token, password, confirmPassword) => async(dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.resetPasswordRequest());
    try {
      const {data} = await axios.put(`https://shashank-portfolio-6o8s.onrender.com/api/v1/user/password/reset/${token}`, { password, confirmPassword }, {withCredentials: true, headers: {"Content-Type": "application/json"}});
      dispatch(forgotResetPasswordSlice.actions.resetPasswordSuccess(data.message));
      dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
    }catch (error) {
      dispatch(forgotResetPasswordSlice.actions.resetPasswordFailed(error.response.data.message));
    }
};


export const clearAllForgotPasswordErrors = () => (dispatch) => {
    dispatch(forgotResetPasswordSlice.actions.clearAllErrors());
}

export default forgotResetPasswordSlice.reducer;