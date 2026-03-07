import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../App';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']); 
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post(`${API_URL}/api/v1/user/forgot-password`, { email });
        if (res.data.success) {
            toast.success(res.data.message);
            setStep(2);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
        setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
        toast.error("Please enter 4-digit OTP");
        return;
    }
    try {
        setLoading(true);
        const res = await axios.post(`${API_URL}/api/v1/user/verify-otp`, { email, otp: otpValue });
        if (res.data.success) {
            toast.success(res.data.message);
            setStep(3);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
        setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
        toast.error("Passwords do not match!");
        return;
    }
    try {
        setLoading(true);
        const res = await axios.post(`${API_URL}/api/v1/user/reset-password`, { 
            email, 
            otp: otp.join(''), 
            password: passwords.new 
        });
        if (res.data.success) {
            toast.success(res.data.message);
            navigate('/login');
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
        setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single char
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
             <button 
                onClick={() => navigate(-1)}
                className="absolute top-0 left-0 p-2 text-white/80 hover:text-white transition-colors"
                type="button"
             >
                <ArrowLeft className="w-6 h-6" />
             </button>

            <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                <KeyRound className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
                {step === 1 && "Forgot Password?"}
                {step === 2 && "Verify Email"}
                {step === 3 && "Reset Password"}
            </h2>
            <p className="text-indigo-100 text-sm">
                {step === 1 && "Don't worry! It happens. Please enter the email associated with your account."}
                {step === 2 && `We've sent a code to ${email}. Enter it below to verify.`}
                {step === 3 && "Create a new strong password for your account."}
            </p>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50%] right-[-20%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Form Section */}
        <div className="p-8">
            
            {/* STEP 1: EMAIL */}
            {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Send OTP <ArrowRight className="w-5 h-5" /></>}
                    </button>
                    <div className="text-center">
                        <Link to="/login" className="text-slate-500 text-sm font-medium hover:text-indigo-600 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </form>
            )}

            {/* STEP 2: OTP */}
            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="flex justify-center gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="w-14 h-14 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Verify OTP <CheckCircle2 className="w-5 h-5" /></>}
                    </button>
                    <div className="text-center">
                         <button type="button" onClick={() => setStep(1)} className="text-slate-500 text-sm font-medium hover:text-indigo-600 hover:underline">
                            Wrong Email?
                        </button>
                    </div>
                </form>
            )}

            {/* STEP 3: NEW PASSWORD */}
            {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-600 ml-1">New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="password" 
                                value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-600 ml-1">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="password" 
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Reset Password <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>
            )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
