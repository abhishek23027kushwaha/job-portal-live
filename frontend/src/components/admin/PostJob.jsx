import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, DollarSign, ListChecks, 
  Building2, ChevronLeft, Loader2 
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../App';
import { toast } from 'react-hot-toast';
import { setCompanies } from '../../redux/companySlice';
import { setAllJobs } from '../../redux/jobSlice';

const PostJob = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    const { companies } = useSelector(store => store.company); 

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/company/get`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
            }
        }
        if(companies.length === 0) fetchCompanies();
    }, [dispatch, companies.length]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/api/v1/job/post`, {
                ...input,
                experienceLevel: input.experience, // field name match with backend
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
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
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500 pb-10">
                
                {/* Back Button & Title */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create New Job</h1>
                        <p className="text-slate-500 text-sm font-medium">Fill in the details to post a new opening.</p>
                    </div>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    
                    {/* Main Content Card */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* Job Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Job Title</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input 
                                        type="text" name="title" value={input.title} onChange={changeEventHandler}
                                        placeholder="e.g. Senior React Developer"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Company Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Select Company</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <select 
                                        name="companyId" value={input.companyId} onChange={changeEventHandler}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select a company</option>
                                        {
                                            companies?.length > 0 && companies.map((company) => (
                                                <option key={company._id} value={company._id}>{company.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Job Description</label>
                                <textarea 
                                    name="description" value={input.description} onChange={changeEventHandler}
                                    rows="4" placeholder="Describe the role and responsibilities..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                    required
                                />
                            </div>

                            {/* Requirements */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-1">
                                    <ListChecks size={16} /> Requirements (Comma separated)
                                </label>
                                <input 
                                    type="text" name="requirements" value={input.requirements} onChange={changeEventHandler}
                                    placeholder="React, Tailwind, Nodejs, MongoDB"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Salary (in LPA)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input 
                                        type="number" name="salary" value={input.salary} onChange={changeEventHandler}
                                        placeholder="e.g. 5"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                                    <input 
                                        type="text" name="location" value={input.location} onChange={changeEventHandler}
                                        placeholder="e.g. Remote, Surat, Bangalore"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Experience & Position */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Experience Level (Years)</label>
                                <input 
                                    type="number" name="experience" value={input.experience} onChange={changeEventHandler}
                                    placeholder="e.g. 2"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">No. of Positions</label>
                                <input 
                                    type="number" name="position" value={input.position} onChange={changeEventHandler}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required
                                />
                            </div>

                             {/* Job Type */}
                             <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Job Type</label>
                                <input 
                                    type="text" name="jobType" value={input.jobType} onChange={changeEventHandler}
                                    placeholder="e.g. Full-time, Internship"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    required
                                />
                            </div>

                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4">
                        <button 
                            type="button" onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-slate-600 font-bold hover:bg-slate-200 rounded-xl transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" disabled={loading}
                            className={`px-10 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Post Job"}
                        </button>
                    </div>
                    
                    {
                        companies?.length === 0 && (
                            <p className="text-xs text-red-500 font-bold text-center mt-4">
                                *Please register a company first before posting a job.
                            </p>
                        )
                    }
                </form>
            </div>
        </AdminLayout>
    );
};

export default PostJob;