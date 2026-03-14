import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../App';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Building2,
  Bookmark,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SavedJobs = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.user);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loadingSaved, setLoadingSaved] = useState(true);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/user/saved-jobs`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingSaved(false);
            }
        }
        fetchSavedJobs();
    }, []);

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
                    <h1 className="font-bold text-lg text-slate-900">Saved Jobs</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="space-y-4">
                    {loadingSaved ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : savedJobs.length > 0 ? (
                        savedJobs.map((job) => (
                            <div 
                                key={job._id}
                                onClick={() => navigate(`/description/${job._id}`)}
                                className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer relative overflow-hidden shadow-sm"
                            >
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <img src={job?.company?.logo} alt={job?.company?.name} className="w-full h-full object-contain p-1" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{job.title}</h4>
                                            <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">{job.jobType}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-500 flex items-center gap-1">
                                            <Building2 className="w-3.5 h-3.5" /> {job?.company?.name}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                                <MapPin className="w-3.5 h-3.5" /> {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                                                <IndianRupee className="w-3.5 h-3.5" /> {job.salary} LPA
                                            </div>
                                        </div>
                                    </div>
                                    <div className="self-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                        <ArrowRight className="w-5 h-5 text-indigo-500" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bookmark className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No saved jobs</h3>
                            <p className="text-slate-500 mb-6">You haven't saved any jobs yet.</p>
                            <button 
                                onClick={() => navigate('/jobs')}
                                className="bg-indigo-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                            >
                                Browse Jobs
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedJobs;
