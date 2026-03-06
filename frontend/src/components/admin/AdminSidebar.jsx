import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Briefcase, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../App';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const handleLogout = async () => {
    try {
      // 1. Firebase logout
      await signOut(auth);

      // 2. Backend logout
      const res = await axios.get(`${API_URL}/api/v1/user/logout`, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message || "Logged out successfully");
        dispatch(setUser(null));
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };
  
  const menuItems = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard size={20}/>, 
      path: "/admin/dashboard" 
    },
    { 
      name: "Companies", 
      icon: <Building2 size={20}/>, 
      path: "/admin/companies" 
    },
    { 
      name: "Jobs", 
      icon: <Briefcase size={20}/>, 
      path: "/admin/jobs" 
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50">
      
      {/* Brand Logo */}
      <div className="p-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <Briefcase className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Job<span className="text-indigo-600">Admin</span>
          </h1>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] ml-4 mb-4">Main Menu</p>
        
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-semibold text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={14} className="text-white/70" />}
            </button>
          );
        })}
      </nav>

      {/* Admin Profile Snippet */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center overflow-hidden">
            {user?.profilePhoto ? (
              <img src={user.profilePhoto} alt="Admin" className="w-full h-full object-cover" />
            ) : (
              <span className="text-indigo-600 font-bold">{user?.name?.[0]}</span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || "Admin Name"}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold text-sm"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;