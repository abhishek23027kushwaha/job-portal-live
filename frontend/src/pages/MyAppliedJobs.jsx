import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Search,
  Building2,
  Calendar
} from 'lucide-react';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const MyAppliedJobs = () => {
  useGetAppliedJobs();
  const { allAppliedJobs } = useSelector(store => store.job);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'pending': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'interviewing': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      case 'offer': return 'bg-green-50 text-green-600 border-green-100';
      case 'accepted': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const filteredAppliedJobs = allAppliedJobs.filter((appliedJob) => {
    if (!searchText) return true;
    return appliedJob.job?.title?.toLowerCase().includes(searchText.toLowerCase()) || 
           appliedJob.job?.company?.name?.toLowerCase().includes(searchText.toLowerCase()) || 
           appliedJob.status?.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-lg text-slate-900">My Applications</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Search / Filter */}
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
                type="text" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by job title, company or status..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm placeholder:text-slate-400 transition-all"
            />
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredAppliedJobs.length > 0 ? filteredAppliedJobs.map((appliedJob) => (
            <div key={appliedJob._id} onClick={() => navigate(`/description/${appliedJob.job?._id}`)} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
                            <img src={appliedJob.job?.company?.logo} alt={appliedJob.job?.company?.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{appliedJob.job?.title}</h3>
                            <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
                                <Building2 className="w-3.5 h-3.5" />
                                {appliedJob.job?.company?.name}
                            </div>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(appliedJob.status)}`}>
                        {appliedJob.status}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium bg-slate-50 px-2 py-1.5 rounded-lg w-max">
                        <MapPin className="w-3.5 h-3.5" />
                        {appliedJob.job?.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium bg-slate-50 px-2 py-1.5 rounded-lg w-max">
                         <IndianRupee className="w-3.5 h-3.5" />
                        {appliedJob.job?.salary} LPA
                    </div>
                     <div className="flex items-center gap-2 text-slate-500 text-xs font-medium bg-slate-50 px-2 py-1.5 rounded-lg w-max">
                         <Briefcase className="w-3.5 h-3.5" />
                        {appliedJob.job?.jobType || 'Full Time'}
                    </div>
                     <div className="flex items-center gap-2 text-slate-500 text-xs font-medium bg-slate-50 px-2 py-1.5 rounded-lg w-max">
                         <Calendar className="w-3.5 h-3.5" />
                        Applied {appliedJob.createdAt?.split('T')[0]}
                    </div>
                </div>
            </div>
          )) : (
            allAppliedJobs.length > 0 && (
                <div className="text-center py-10">
                    <p className="text-slate-500">No matching applications found.</p>
                </div>
            )
          )}
        </div>

        {/* Empty State (Hidden if jobs exist) */}
        {allAppliedJobs.length === 0 && (
            <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No applications yet</h3>
                <p className="text-slate-500 mb-6">Start applying to jobs to see them here.</p>
                <button onClick={() => navigate('/jobs')} className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    Browse Jobs
                </button>
            </div>
        )}

      </div>
    </div>
  );
};

export default MyAppliedJobs;
