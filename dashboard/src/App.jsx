/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageProjects from './pages/ManageProjects';
import ViewProject from './pages/ViewProject';
import UpdateProject from './pages/UpdateProject';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import { getAllMessages } from './store/slices/messageSlice';
import { getAllTimeline } from './store/slices/timelineSlice';
import { getAllSkills } from './store/slices/skillSlice';
import { getAllSoftwareApplications } from './store/slices/softwareApplicationSlice';
import { getAllProjects } from './store/slices/projectSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimeline());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllProjects());
  }, []);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage/skills" element={<ManageSkills />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/manage/projects" element={<ManageProjects />} />
          <Route path="/view/project/:id" element={<ViewProject />} />
          <Route path="/update/project/:id" element={<UpdateProject />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition: Bounce/>
      </Router>
    </>
  )
}

export default App