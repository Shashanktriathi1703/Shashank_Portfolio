import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: "project",
    initialState: {
        projects: [],
        loading: false,
        error: null,
        message: null,
        singleProject: {}
    },
    reducers: {
        getAllProjectRequest(state, action){
            state.projects = [];
            state.loading = true;
            state.error = null;
        },
        getAllProjectSuccess(state, action){
            state.projects = action.payload;
            state.error = null;
            state.loading = false;
        },
        getAllProjectFailed(state, action){
            state.projects = state.projects;
            state.error = action.payload;
            state.loading = false;
        },
        addNewProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewProjectSuccess(state, action){
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        addNewProjectFailed(state, action){
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },
        deleteProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteProjectSuccess(state, action){
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteProjectFailed(state, action){
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },
        updateProjectRequest(state, action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProjectSuccess(state, action){
            state.message = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateProjectFailed(state, action){
            state.message = null;
            state.loading = false;
            state.error = action.payload;
        },
        resetProjectSlice(state, action){
            state.error = null;
            state.message = null;
            state.projects = state.projects;
            state.loading = false;
        },
        clearAllErrors(state, action){
            state.error = null;
            state.projects = state.projects;
        }        
    }
});

export const getAllProjects = () => async(dispatch) => {
    dispatch(projectSlice.actions.getAllProjectRequest());
    try{
        const { data } = await axios.get("http://localhost:4000/api/v1/project/getall", { withCredentials: true });
        dispatch(projectSlice.actions.getAllProjectSuccess(data.projects));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch(error){
        dispatch(projectSlice.actions.getAllProjectFailed(error.response.data.message));
    }
}

export const addNewProject = (data) => async(dispatch) => {
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const response = await axios.post("http://localhost:4000/api/v1/project/add", data, {withCredentials: true, headers:{"Content-Type":"multipart/form-data"}});//const {data} => de-structure kr rahe (ek aur cheez "application/json" isko tab use karte jab hamare form mai koi image na hoti to) 
        dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message)); // isiliye aise likh rahe warna agar hum "const response" likhte then hume "response.data.message" likhna padta 
        dispatch(projectSlice.actions.clearAllErrors());
    } catch(error){
        dispatch(projectSlice.actions.addNewProjectFailed(error.response.data.message));
    }
}

export const updateProject = (id, projectdata) => async(dispatch) => {
    dispatch(projectSlice.actions.updateProjectRequest());
    try{
        const { data } = await axios.put(`http://localhost:4000/api/v1/project/update/${id}`, projectdata, {withCredentials: true, headers:{"Content-Type": "multipart/form-data"}});
        dispatch(projectSlice.actions.updateProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch(error){
        dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message));
    }
}

export const deleteProject = (id) => async (dispatch) => {
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
      const { data } = await axios.delete(`http://localhost:4000/api/v1/project/delete/${id}`, {withCredentials: true});
      dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
      dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message) );
    }
}

export const clearAllProjectSliceErrors = () => (dispatch) => {
    dispatch(projectSlice.actions.clearAllErrors()); 
}

export const resetProjectSlice = () => (dispatch) => {
    dispatch(projectSlice.actions.resetProjectSlice());
}

export default projectSlice.reducer;