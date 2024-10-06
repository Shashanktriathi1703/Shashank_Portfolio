import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
    name: "application",
    initialState: {
        softwareApplications: [],
        loading: false,
        error: null,
        message:null
    },
    reducers: {
        getAllSoftwareApplicationsRequest(state, action){
            state.softwareApplications = [];
            state.loading = true;
            state.error = null;   
        },
        getAllSoftwareApplicationsSuccess(state, action){
            state.softwareApplications = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllSoftwareApplicationsFailed(state, action){
            state.softwareApplications = state.softwareApplications;
            state.loading = false;
            state.error = action.payload;
        },
        addNewSoftwareRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewSoftwareSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewSoftwareFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteSoftwareApplicationRequest(state, action){  
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteSoftwareApplicationSuccess(state, action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteSoftwareApplicationFailed(state, action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetApplicationSlice(state, action){
            state.error = null;
            state.loading = false;
            state.message = null;
            state.softwareApplications = state.softwareApplications;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.softwareApplications = state.softwareApplications;
        }
    }
});

export const getAllSoftwareApplications = () => async(dispatch) => {
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest());
  try {
    const { data } = await axios.get("https://shashank-portfolio-6o8s.onrender.com/api/v1/softwareApplication/getall",{ withCredentials: true });
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(data.softwareApplication));
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(error.response.data.message));
  }
}

export const addNewSoftwareApplication = (data) => async(dispatch) => {
    dispatch(softwareApplicationSlice.actions.addNewSoftwareRequest());
    try {
        const response = await axios.post("https://shashank-portfolio-6o8s.onrender.com/api/v1/softwareApplication/add", data, {withCredentials: true, headers:{"Content-Type":"multipart/form-data"}});//const {data} => de-structure kr rahe
        dispatch(softwareApplicationSlice.actions.addNewSoftwareSuccess(response.data.message)); // isiliye aise likh rahe warna agar hum "const response" likhte then hume "response.data.message" likhna padta 
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch(error){
        dispatch(softwareApplicationSlice.actions.addNewSoftwareFailed(error.response.data.message));
    }
}

export const deleteSoftwareApplication = (id) => async (dispatch) => {
    dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest());
    try {
      const { data } = await axios.delete(`https://shashank-portfolio-6o8s.onrender.com/api/v1/softwareApplication/delete/${id}`, {withCredentials: true});
      dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(data.message));
      dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(error.response.data.message) );
    }
  };

export const clearAllApplicationSliceErrors = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.clearAllErrors()); 
}

export const resetApplicationSlice = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.resetApplicationSlice());
}
export default softwareApplicationSlice.reducer;