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

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                
                {/* Header */}
                <div className="bg-indigo-600 p-8 text-center text-white">
                    <h2 className="text-3xl font-black tracking-tight">Welcome Back</h2>
                    <p className="text-indigo-100 text-sm font-medium mt-1">Please select your role to login</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Role Selection Tabs */}
                        <div className="flex gap-3 p-1 bg-slate-100 rounded-2xl">
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer font-bold text-sm transition-all ${formData.role === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
                                <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} className="hidden" />
                                <User size={18} /> Student
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl cursor-pointer font-bold text-sm transition-all ${formData.role === 'recruiter' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}>
                                <input type="radio" name="role" value="recruiter" checked={formData.role === 'recruiter'} onChange={handleChange} className="hidden" />
                                <Briefcase size={18} /> Recruiter
                            </label>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-slate-600 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-600">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-black text-indigo-600 hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                                <input 
                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" disabled={loading}
                            className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 mt-2"
                        >
                            {loading ? <Loader2 className='animate-spin w-5 h-5' /> : <>Sign In as {formData.role === 'recruiter' ? 'Admin' : 'Student'} <ArrowRight className="w-5 h-5" /></>}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            Don't have an account? <Link to="/signup" className="text-indigo-600 font-black hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;