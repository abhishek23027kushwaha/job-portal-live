import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Briefcase, ArrowRight, Loader2, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/userSlice';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
    const { loading } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student' // Default value
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${API_URL}/api/v1/user/login`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                
                // Role-based redirection
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGoogleLogin = async () => {
        try {
            dispatch(setLoading(true));
            const result = await signInWithPopup(auth, googleProvider);
            const userFb = result.user;

            const res = await axios.post(`${API_URL}/api/v1/user/google`, {
                name: userFb.displayName,
                email: userFb.email,
                photoUrl: userFb.photoURL,
                role: formData.role
            }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(`Welcome back ${userFb.displayName}!`);
                
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("Firebase Auth Error:", error.code, error.message);
            toast.error(error.message || "Google Sign-in failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
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
                <div className="bg-indigo-600 p-8 text-center text-white relative overflow-hidden">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative z-10"
                    >
                        <h2 className="text-3xl font-black tracking-tight">Welcome Back</h2>
                        <p className="text-indigo-100 text-sm font-medium mt-1">Please select your role to login</p>
                    </motion.div>
                    {/* Decorative circles */}
                    <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Role Selection Tabs */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-3 p-1 bg-slate-100 rounded-2xl"
                        >
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer font-bold text-sm transition-all ${formData.role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
                                <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} className="hidden" />
                                <User size={18} /> Student
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer font-bold text-sm transition-all ${formData.role === 'recruiter' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
                                <input type="radio" name="role" value="recruiter" checked={formData.role === 'recruiter'} onChange={handleChange} className="hidden" />
                                <Briefcase size={18} /> Recruiter
                            </label>
                        </motion.div>

                        {/* Email Input */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-1.5"
                        >
                            <label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </motion.div>

                        {/* Password Input */}
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-1.5"
                        >
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-600">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-black text-indigo-600 hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            type="submit" disabled={loading}
                            className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-70 mt-2"
                        >
                            {loading ? <Loader2 className='animate-spin w-5 h-5' /> : <>Sign In as {formData.role === 'recruiter' ? 'Admin' : 'Student'} <ArrowRight className="w-5 h-5" /></>}
                        </motion.button>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.65 }}
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
                            transition={{ delay: 0.7 }}
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full bg-white text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.2 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Sign in with Google
                        </motion.button>
                    </form>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-slate-500 text-sm font-medium">
                            Don't have an account? <Link to="/signup" className="text-indigo-600 font-black hover:underline">Sign Up</Link>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;