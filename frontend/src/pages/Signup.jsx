import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Briefcase, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../App';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' // Default role
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };


  // --- Normal Email/Password Signup ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await axios.post(`${API_URL}/api/v1/user/register`, formData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        if (res.data.success) {
            toast.success(res.data.message);
            dispatch(setUser(res.data.user));

            if(res.data.user.role === "recruiter"){
                navigate("/admin/companies");
            } else {
                navigate("/");
            }
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  // --- Google Signup Integration ---
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const userFb = result.user;

      const res = await axios.post(`${API_URL}/api/v1/user/google`, {
        name: userFb.displayName,
        email: userFb.email,
        photoUrl: userFb.photoURL,
        role: formData.role // Selected role bhej rahe hain
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(`Welcome ${userFb.displayName}!`);
        
        // --- Logic: Role ke basis par redirection ---
        if (res.data.user.role === 'recruiter') {
            navigate("/admin/companies"); // Admin ke liye companies page
        } else {
            navigate("/"); // Student ke liye home page
        }
      }
    } catch (error) {
      console.error("Firebase Auth Error:", error.code, error.message);
      toast.error(error.message || "Google Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-10 overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-50"></div>
          <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
      >
        
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
            <p className="text-indigo-100 text-sm font-medium">Join us to find jobs or hire top talent</p>
          </motion.div>
          <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          
          {/* Role Selection Tabs */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 mb-8 p-1 bg-slate-100 rounded-2xl"
          >
            <button 
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold text-sm ${formData.role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <User size={18} /> Student
            </button>
            <button 
              type="button"
              onClick={() => handleRoleChange('recruiter')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold text-sm ${formData.role === 'recruiter' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Briefcase size={18} /> Recruiter
            </button>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-1.5"
            >
              <label className="text-xs font-bold text-slate-600 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700" required />
              </div>
            </motion.div>

            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-1.5"
            >
              <label className="text-xs font-bold text-slate-600 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700" required />
              </div>
            </motion.div>

            <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-1.5"
            >
              <label className="text-xs font-bold text-slate-600 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-12 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-700" 
                    required 
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-indigo-500 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-70 mt-2"
            >
              {loading ? <Loader2 className='animate-spin w-5 h-5' /> : <>Create {formData.role === 'recruiter' ? 'Admin' : 'Student'} Account <ArrowRight className="w-5 h-5" /></>}
            </motion.button>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative my-6"
            >
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                    <span className="px-2 bg-white/0 text-slate-400">Or continue with</span>
                </div>
            </motion.div>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="w-full bg-white text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
            >
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8 text-center"
          >
            <p className="text-slate-500 text-sm font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;