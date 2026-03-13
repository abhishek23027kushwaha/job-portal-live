import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Jobs from './pages/Jobs'
import Signup from './pages/Signup'
import JobDetails from './pages/JobDetails'
import EditProfile from './pages/EditProfile'
import Profile from './pages/Profile'
import MyAppliedJobs from './pages/MyAppliedJobs'
import AboutUs from './pages/AboutUs'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './redux/userSlice'
import axios from 'axios'

// Admin Components Imports
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import AdminDashboard from './components/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import PublicRoute from './components/PublicRoute'

export const API_URL = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  ? 'http://localhost:5000' 
  : 'https://job-portal-live-tc14.onrender.com';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/user/profile/view`, {
           withCredentials: true
        });
        if(res.data.success){
          dispatch(setUser(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [dispatch]);

  // Check if current path is an admin path or auth path
  const isAdminPath = location.pathname.startsWith('/admin');
  const isAuthPath = ['/signup', '/login', '/forgot-password'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              {/* User Routes */}
              <Route path='/' element={<Home/>} />
              <Route path='/jobs' element={<Jobs/>} />
              <Route path='/about' element={<AboutUs/>} />
              <Route path='/description/:id' element={<JobDetails/>} />
              <Route path='/profile/edit' element={<AuthenticatedRoute><EditProfile/></AuthenticatedRoute>} />
              <Route path='/profile' element={<AuthenticatedRoute><Profile/></AuthenticatedRoute>} />
              <Route path='/my-applied-jobs' element={<AuthenticatedRoute><MyAppliedJobs/></AuthenticatedRoute>} />
              <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>} />
              <Route path='/login' element={<PublicRoute><Login/></PublicRoute>} />
              <Route path='/forgot-password' element={<PublicRoute><ForgotPassword/></PublicRoute>} />

              {/* Admin Routes */}
              <Route path='/admin/companies' element={<ProtectedRoute><Companies/></ProtectedRoute>} />
              <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>} />
              <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup/></ProtectedRoute>} />
              <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>} />
              <Route path='/admin/jobs/create' element={<ProtectedRoute><PostJob/></ProtectedRoute>} />
              <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants/></ProtectedRoute>} />
              <Route path='/admin/dashboard' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer tabhi dikhega jab na auth page ho aur na admin page */}
      {!isAuthPath && !isAdminPath && <Footer />}
    </div>
  )
}

export default App
