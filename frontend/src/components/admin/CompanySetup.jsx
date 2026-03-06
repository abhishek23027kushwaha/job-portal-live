import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    MapPin, Globe,  
    ChevronLeft, Loader2, Upload 
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../App';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CompanySetup = () => {
    const params = useParams(); 
    const navigate = useNavigate();
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
   console.log(input);
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/company/get/${params.id}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    const company = res.data.company;
                    setInput({
                        name: company.name || "",
                        description: company.description || "",
                        website: company.website || "",
                        location: company.location || "",
                        file: null
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleCompany();
    }, [params.id]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${API_URL}/api/v1/company/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4">
                <form onSubmit={submitHandler} className="space-y-8">
                    
                    {/* Header with Back Button */}
                    <div className="flex items-center gap-5">
                        <button 
                            type="button"
                            onClick={() => navigate("/admin/companies")}
                            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black text-slate-900">Company Setup</h1>
                            <p className="text-slate-500 font-medium">Complete your company profile to start posting jobs.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                        
                        {/* Company Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Company Name</label>
                            <input 
                                type="text" name="name" value={input.name} onChange={changeEventHandler}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                required
                            />
                        </div>

                        {/* Website */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Website URL</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="text" name="website" value={input.website} onChange={changeEventHandler}
                                    placeholder="https://example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="text" name="location" value={input.location} onChange={changeEventHandler}
                                    placeholder="City, Country"
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Company Logo</label>
                            <div className="relative">
                                <Upload className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input 
                                    type="file" accept="image/*" onChange={changeFileHandler}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all file:hidden cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                            <textarea 
                                name="description" value={input.description} onChange={changeEventHandler}
                                rows="4" placeholder="Brief about your company..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full md:w-max px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Update Company Details"}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CompanySetup;