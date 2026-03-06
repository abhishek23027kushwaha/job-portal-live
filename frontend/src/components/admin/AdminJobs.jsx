import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Plus, Edit2, Briefcase, Eye, Calendar, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../App';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../redux/jobSlice';

const AdminJobs = () => {
    useGetAllAdminJobs();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        dispatch(setSearchJobByText(searchQuery));
    }, [searchQuery, dispatch]);

    const filteredJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
               job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Posted Jobs</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Create, edit and manage job listings for your companies.</p>
                    </div>
                    <button 
                        onClick={() => navigate("/admin/jobs/create")}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                    >
                        <Plus size={20} />
                        Post New Job
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Search by job title or company..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Jobs Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Job Role</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date Posted</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredJobs.map((job) => (
                                    <tr key={job._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                    <Briefcase size={18} />
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">{job.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                                <Building2 size={16} className="text-slate-400" />
                                                {job.company?.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <Calendar size={16} />
                                                {job.createdAt?.split("T")[0]}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View Applicants Button */}
                                                <button 
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all"
                                                >
                                                    <Eye size={14} />
                                                    <span>{job.applications?.length} Applicants</span>
                                                </button>
                                                
                                                {/* Edit Job Button */}
                                                {/* <button 
                                                    onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {filteredJobs.length === 0 && (
                        <div className="py-20 text-center">
                            <Briefcase size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No jobs posted yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminJobs;