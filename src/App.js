// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import LoginPageA from './LoginPageA';

import SignUpPage from './SignUpPage';
import IkusasaProgram from './IkusasaProgram';
import JobApplicationPage from './JobApplicationPage';
import ForgotPassPage from './ForgotPassPage';
import ResetPass from './ResetPass';
import EducationUpdate from './EducationUpdate';
import EducationPage from './EducationPage';
import WorkExperience from './WorkExperience';
import UserApply from './UserApply';
import AuthPage from './AuthPage';
import ProfileUpdate from './ProfileUpdate';
import ViewPosts from './ViewPosts';
import ProPage from './ProPage';
import LandingPage from './LandingPage';
import UserProfile from './UserProfile';
import CreateJob from './CreateJob';
import UserViewPost from './UserViewPost';
import ViewJobDetails from './ViewJobDetails';
import AdminJobsView from './AdminJobsView';
import AdminCPost from './AdminCPost';
import ViewAJobs from './ViewAJobs';
import AdminViewCandidates from './AdminViewCandidates';

import ProfileUsers from './ProfileUsers';
import AdminDash from './AdminDash';
import ProfileEdit from './ProfileEdit';
import ScreeningPage from './ScreeningPage';
import WorkUpdate from './WorkUpdate';
import JobDetails from './JobDetails';
import OneProfile from './OneProfile';



// OneProfile
const App = () => {

  return (
    <Router>
      <Routes>
      {/* <Route path="/" element={<UserViewPost />} /> */}
      {/* <Route path="/" element={<AdminDashboard/>} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/OneProfile" element={<OneProfile />} />

        <Route path="/CreateJob" element={<CreateJob />} />
        <Route path="/UserViewPost" element={<UserViewPost />} />
        <Route path="/ViewJobDetails/:id" element={<ViewJobDetails />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/LoginPageA" element={<LoginPageA />} />

        <Route path="/ikusasaprogram" element={<IkusasaProgram />} />
        <Route path="/AdminCPost" element={<AdminCPost />} />
        <Route path="/ProfileEdit" element={<ProfileEdit />} />
        <Route path="/ScreeningPage" element={<ScreeningPage />} />
        <Route path="/AdminViewCandidates" element={<AdminViewCandidates />} />
        <Route path="/JobApplicationPage" element={<JobApplicationPage />} />
        <Route path="/ForgotPassPage" element={<ForgotPassPage />} />
        <Route path="/ViewPosts" element={<ViewPosts />} />
        <Route path="/ProfileUsers" element={<ProfileUsers />} />
        <Route path="/AdminDash" element={<AdminDash />} />
        <Route path="/AdminJobsView" element={<AdminJobsView />} />
        <Route path="/WorkUpdate" element={<WorkUpdate />} />
        <Route path="/JobDetails/:jobId" element={<JobDetails />} />

        <Route path="/ViewAJobs" element={<ViewAJobs />} />

        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/EducationUpdate" element={<EducationUpdate />} />
        <Route path="/EducationPage" element={<EducationPage />} />
        <Route path="/WorkExperience" element={<WorkExperience />} />
        <Route path="/ProfileUpdate" element={<ProfileUpdate />} />
        <Route path="/UserApply/:id" element={<UserApply />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/ProPage" element={<ProPage />} />

        {/* Add more routes for additional pages */}
      </Routes>
    </Router>
  );
};

export default App;
