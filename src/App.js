import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPageA from './LoginPageA';
import SignUpPage from './SignUpPage';
import IkusasaProgram from './IkusasaProgram';
import JobApplicationPage from './JobApplicationPage';
import ForgotPassPage from './ForgotPassPage';
import ResetPass from './ResetPass';
import WorkExperience from './WorkExperience';
import UserApply from './UserApply';
import AuthPage from './AuthPage';
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
import AdminDash from './AdminDash';
import ScreeningPage from './ScreeningPage';
import WorkUpdate from './WorkUpdate';
import JobDetails from './JobDetails';
import OneProfile from './OneProfile';
import Prof from './Prof';
import ProfEdu from './ProfEdu';
import CVTemplate from './CVTemplate';
import ProfileModal from './ProfileModal';
import Theme from './TemplateSelector';
import ProfilePic from './ProfilePic';
import { NotificationProvider } from './NotificationContext';
import ScheduleInterview from './ScheduleInterview';
import NotificationDetailPage from './NotificationDetailPage'; 
import SupportPage from './SupportPage'; 

//SupportPage
//ResumeUploadForm
const App = () => {

  return (
    <NotificationProvider>

    <Router>
      <Routes>
      {/* <Route path="/" element={<UserViewPost />} /> */}
      {/* <Route path="/" element={<AdminDashboard/>} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/Prof" element={<Prof />} />
        <Route path="/ProfEdu" element={<ProfEdu />} />
        <Route path="/SupportPage" element={<SupportPage />} />

        <Route path="/schedule-interview/:appId" element={<ScheduleInterview />} />
        <Route path="/CVTemplate" element={<CVTemplate />} />
        <Route path="/ProfileModal" element={<ProfileModal />} />
        <Route path="/Theme" element={<Theme />} />
        <Route path="/ProfilePic" element={<ProfilePic />} />
        {/* <Route path="/Notifications" element={<Notifications />} /> */}
        <Route path="/notification/:notificationId" element={<NotificationDetailPage />} />

        <Route path="/OneProfile" element={<OneProfile />} />
        <Route path="/CreateJob" element={<CreateJob />} />
        <Route path="/UserViewPost" element={<UserViewPost />} />
        <Route path="/ViewJobDetails/:id" element={<ViewJobDetails />} />
        <Route path="/LoginPageA" element={<LoginPageA />} />
        <Route path="/ikusasaprogram" element={<IkusasaProgram />} />
        <Route path="/AdminCPost" element={<AdminCPost />} />
        <Route path="/ScreeningPage" element={<ScreeningPage />} />
        <Route path="/AdminViewCandidates" element={<AdminViewCandidates />} />
        <Route path="/JobApplicationPage" element={<JobApplicationPage />} />
        <Route path="/ForgotPassPage" element={<ForgotPassPage />} />
        <Route path="/ViewPosts" element={<ViewPosts />} />
        <Route path="/AdminDash" element={<AdminDash />} />
        <Route path="/AdminJobsView" element={<AdminJobsView />} />
        <Route path="/WorkUpdate" element={<WorkUpdate />} />
        <Route path="/JobDetails/:jobId" element={<JobDetails />} />
        <Route path="/ViewAJobs" element={<ViewAJobs />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/WorkExperience" element={<WorkExperience />} />
        <Route path="/UserApply/:id" element={<UserApply />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/ProPage" element={<ProPage />} />

      </Routes>
    </Router>
    </NotificationProvider>

  );
};

export default App;
