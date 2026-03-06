import React, { useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { 
  User, Mail, Phone, FileText, ExternalLink, 
  CheckCircle2, XCircle, ChevronLeft 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../App';
import { setAllApplicants } from '../../redux/jobSlice';
import { toast } from 'react-hot-toast';

const Applicants = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { allApplicants } = useSelector(store => store.job);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/application/${params.id}/applicants`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job.applications));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApplicants();
    }, [params.id, dispatch]);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${API_URL}/api/v1/application/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Refresh applicants
                const updatedApplicants = allApplicants.map(app => 
                    app._id === id ? { ...app, status: status.toLowerCase() } : app
                );
                dispatch(setAllApplicants(updatedApplicants));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Status update failed");
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Header Section */}
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Applicants <span className="text-indigo-600">({allApplicants?.length || 0})</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Review candidate profiles and update their hiring status.</p>
                    </div>
                </div>

                {/* Applicants Table */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resume</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {allApplicants && allApplicants.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold overflow-hidden">
                                                    {item.applicant?.profilePhoto ? (
                                                        <img src={item.applicant.profilePhoto} alt="Applicant" className="w-full h-full object-cover" />
                                                    ) : (
                                                        item.applicant?.name?.[0]
                                                    )}
                                                </div>
                                                <span className="font-bold text-slate-900 text-sm">{item.applicant?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                    <Mail size={12} className="text-slate-400" />
                                                    {item.applicant?.email}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                                                    <Phone size={12} className="text-slate-400" />
                                                    {item.applicant?.phone || "N/A"}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.applicant?.resume ? (
                                                <a 
                                                    href={item.applicant.resume} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-bold transition-colors"
                                                >
                                                    <FileText size={16} />
                                                    <span className="max-w-[120px] truncate">{item.applicant.resumeOriginalName || 'Resume'}</span>
                                                    <ExternalLink size={12} />
                                                </a>
                                            ) : (
                                                <span className="text-slate-400 text-xs">Not Uploaded</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                item.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                item.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                                'bg-amber-50 text-amber-600 border-amber-100'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => statusHandler("Accepted", item._id)}
                                                    title="Accept Candidate"
                                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => statusHandler("Rejected", item._id)}
                                                    title="Reject Candidate"
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {(!allApplicants || allApplicants.length === 0) && (
                        <div className="py-20 text-center">
                            <User size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No one has applied for this job yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Applicants;