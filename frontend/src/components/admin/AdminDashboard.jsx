import React from 'react';
import AdminLayout from './AdminLayout';
import { 
  Users, Briefcase, Building2, TrendingUp, 
  Clock, CheckCircle, ArrowUpRight 
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
// import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs';
// import useGetAllCompanies from '../hooks/useGetAllCompanies';

const AdminDashboard = () => {
    useGetAllAdminJobs();
    useGetAllCompanies();
    
    const navigate = useNavigate();
    const { user } = useSelector(store => store.user);
    const { allAdminJobs } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);

    // Calculate real stats
    const totalCompanies = companies.length;
    const totalJobs = allAdminJobs.length;
    const totalApplicants = allAdminJobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);
    const activeJobs = allAdminJobs.length; // Simplified for now

    const stats = [
        { id: 1, label: "Total Companies", value: totalCompanies, icon: <Building2 className="text-blue-600" />, bg: "bg-blue-50" },
        { id: 2, label: "Total Jobs Posted", value: totalJobs, icon: <Briefcase className="text-indigo-600" />, bg: "bg-indigo-50" },
        { id: 3, label: "Total Applicants", value: totalApplicants, icon: <Users className="text-emerald-600" />, bg: "bg-emerald-50" },
        { id: 4, label: "Active Jobs", value: activeJobs, icon: <TrendingUp className="text-amber-600" />, bg: "bg-amber-50" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-700">
                
                {/* Welcome Header */}
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Welcome back, {user?.name?.split(' ')[0] || "Admin"}! 👋
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Here's what's happening with your recruitment today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
                                {stat.icon}
                            </div>
                            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Recent Jobs Preview */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Briefcase className="text-indigo-600" size={20} /> My Recent Jobs
                            </h3>
                            <button onClick={() => navigate('/admin/jobs')} className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
                                View All <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {allAdminJobs.slice(0, 5).map((job) => (
                                <div key={job._id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 overflow-hidden">
                                            {job.company?.logo ? <img src={job.company.logo} alt="" className="w-full h-full object-contain" /> : <Building2 size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{job.title}</p>
                                            <p className="text-xs text-slate-500">{job.company?.name} • {job.applications?.length || 0} applicants</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">{job.createdAt?.split('T')[0]}</span>
                                </div>
                            ))}
                            {allAdminJobs.length === 0 && (
                                <div className="p-10 text-center text-slate-500">No jobs posted yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Hiring Tip / Status */}
                    <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between">
                        <div>
                            <CheckCircle size={40} className="mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">Recruitment Status</h3>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                You have {totalApplicants} applicants across {totalJobs} jobs. Keep your listings updated to attract top talent.
                            </p>
                        </div>
                        <button onClick={() => navigate('/admin/jobs/create')} className="mt-6 w-full py-3 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">
                            Post New Job
                        </button>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;