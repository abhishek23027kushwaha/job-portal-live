import React, { useState } from 'react';
import { Search, User, Briefcase, Settings, LogOut, X, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../App'; // Check karein ki path sahi hai
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSearchJobByText } from '../redux/jobSlice';
import { setUser } from '../redux/userSlice';

const Navbar = () => {
  const {user} = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    dispatch(setSearchJobByText(query));
    navigate("/jobs");
  }

  // Sign Out Handler
  const handleLogout = async () => {
    try {
      // 1. Firebase se logout
      await signOut(auth);

      // 2. Backend API se GET logout request
      // GET request mein 2nd argument sidhe options/config hota hai
      const res = await axios.get(`${API_URL}/api/v1/user/logout`, {
        withCredentials: true
      });

      if (res.data.success) {
        setIsOpen(false);
        dispatch(setUser(null));
        toast.success(res.data.message || "Logged out successfully");
        navigate('/login');
      } 
    } catch (error) {
      console.error("Logout Error:", error);
      // Optional chaining use karein taaki agar response na ho toh code crash na kare
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: Logo & Brand */}
          {!isSearchOpen && (
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 flex-shrink-0 cursor-pointer animate-in fade-in duration-300"
            >
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                JobPortal
              </span>
            </div>
          )}

          {/* CENTER: Search Bar */}
          <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex flex-1 max-w-md mx-4 md:mx-8 items-center gap-2 transition-all`}>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                autoFocus={isSearchOpen}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full bg-slate-50 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Search jobs, companies..."
              />
            </div>
            {/* Desktop search button or just Enter */}
            <button onClick={searchJobHandler} className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-indigo-700 transition-all">
              Search
            </button>
            {isSearchOpen && (
              <button onClick={() => setIsSearchOpen(false)} className="md:hidden p-2 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="flex items-center gap-2">
            
            <button 
              onClick={() => navigate('/my-applied-jobs')}
              className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors mr-1"
            >
              <Briefcase className="w-4 h-4" />
              <span>My Jobs</span>
            </button>
            
            {!isSearchOpen && (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* User Profile Dropdown or Login/Signup Buttons */}
            {!isSearchOpen && (
              user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {user?.name?.[0].toUpperCase() || "A"}
                  </button>

                  {isOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20 animate-in fade-in zoom-in duration-200">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-xs text-slate-500">Signed in as</p>
                          <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                        </div>
                        
                        <button onClick={() => { setIsOpen(false); navigate('/profile'); }} className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 gap-2 font-medium">
                          <User className="w-4 h-4" /> My Profile
                        </button>

                        <button onClick={() => { setIsOpen(false); navigate('/saved-jobs'); }} className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 gap-2">
                          <Bookmark className="w-4 h-4" /> Saved Jobs
                        </button>
                        
                        <button onClick={() => { setIsOpen(false); navigate('/my-applied-jobs'); }} className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 gap-2">
                          <Briefcase className="w-4 h-4" /> My Applied Jobs
                        </button>
                        
                        <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 gap-2">
                          <Settings className="w-4 h-4" /> Settings
                        </button>
                        
                        <div className="border-t border-slate-100 my-1"></div>
                        
                        <button 
                          onClick={handleLogout} 
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 gap-2 transition-colors font-semibold"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate('/login')}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-600"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm shadow-indigo-200"
                  >
                    Signup
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;