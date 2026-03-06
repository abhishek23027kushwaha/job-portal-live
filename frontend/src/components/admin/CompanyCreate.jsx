import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';
import { Building2, ChevronLeft, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../App'; // Path check kar lena
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        if(!companyName.trim()) {
            return toast.error("Company name is required!");
        }
        setLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/v1/company/register`, {companyName}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company?._id;
                // Registration ke baad seedha Setup page par bhejna hai
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-top-4">
                
                {/* Back Link */}
                <button 
                    onClick={() => navigate("/admin/companies")}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors"
                >
                    <ChevronLeft size={20} />
                    Back to Companies
                </button>

                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                    {/* Heading */}
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Company Name</h1>
                        <p className="text-slate-500 font-medium mt-2">
                            What would you like to give your company name? You can change this later.
                        </p>
                    </div>

                    {/* Input Field */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 ml-1">Company Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-4 text-slate-400" size={20} />
                            <input 
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="e.g. Google, Microsoft, Giffy Sign"
                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg font-medium"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button 
                            onClick={() => navigate("/admin/companies")}
                            className="px-8 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={loading}
                            onClick={registerNewCompany}
                            className="px-10 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CompanyCreate;