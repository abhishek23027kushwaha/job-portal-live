import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  ChevronLeft,
  Share2,
  Bookmark,
  Building2,
  Globe
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import axios from 'axios';
import { API_URL } from '../App';
import useGetSingleJob from '../hooks/useGetSingleJob';
import { setSingleJob } from '../redux/jobSlice';
import SkeletonJobDetails from '../components/SkeletonJobDetails';
import ShareModal from '../components/ShareModal';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useGetSingleJob(id);

  // Modal State
  const [isShareModalOpen, setIsShareModalOpen] = React.useState(false);
  const [loadingApply, setLoadingApply] = React.useState(false);

  // Page ko top se open karo
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { singleJob, loading } = useSelector(store => store.job);
  const { user } = useSelector(store => store.user);
  const navigate = useNavigate();

  const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const isSaved = user?.savedJobs?.some(savedJob => (savedJob._id || savedJob) === id) || false;

  const saveJobHandler = async () => {
    if (!user) {
      toast.error("Please login to save this job");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/v1/user/save/${id}`, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        
        // Update user state in redux
        let updatedSavedJobs;
        if (res.data.isSaved) {
            updatedSavedJobs = [...(user.savedJobs || []), id];
        } else {
            updatedSavedJobs = (user.savedJobs || []).filter(job => (job._id || job) !== id);
        }
        dispatch(setUser({ ...user, savedJobs: updatedSavedJobs }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      navigate("/login");
      return;
    }

    try {
      setLoadingApply(true);
      const res = await axios.get(`${API_URL}/api/v1/application/apply/${id}`, { withCredentials: true });

      if (res.data.success) {
        toast.success(res.data.message);
        
        // Confetti Burst!
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#818cf8', '#312e81']
        });

        // Backend changes singleJob state so we should update it
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingApply(false);
    }
  }

  if (loading) return <SkeletonJobDetails />;
  if (!singleJob) return <div className="flex items-center justify-center min-h-screen text-slate-500 font-medium">Job not found</div>

  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      
      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        jobTitle={singleJob?.title}
        url={window.location.href}
      />

      {/* Header / Nav */}
      <div className="bg-white sticky top-0 z-10 border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-semibold text-slate-900">Job Details</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={saveJobHandler}
              className={`p-2 hover:bg-slate-100 rounded-full transition-colors ${isSaved ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'}`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        
        {/* Job Header Card - Integrated Apply Button */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            
            {/* Left Section: Logo & Titles */}
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img src={singleJob?.company?.logo} alt={singleJob?.company?.name} className="w-full h-full object-contain" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">{singleJob?.title}</h1>
                <div className="flex items-center gap-2 text-slate-600 font-medium mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>{singleJob?.company?.name}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                   <span className="text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {singleJob?.jobType}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {singleJob?.experienceLevel} year(s) exp
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: Action Button */}
            <div className="w-full md:w-auto">
              <button 
                onClick={isApplied || loadingApply ? null : applyJobHandler}
                disabled={isApplied || loadingApply}
                className={`w-full md:w-auto font-bold px-8 py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${isApplied ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-indigo-100'}`}
              >
                {loadingApply ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Applying...
                  </>
                ) : (
                  isApplied ? "Applied" : "Apply Now"
                )}
              </button>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
             <div className="flex items-center gap-3 text-slate-600">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase">Location</span>
                <span className="text-sm font-semibold text-slate-700">{singleJob?.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                 <Briefcase className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase">Experience</span>
                <span className="text-sm font-semibold text-slate-700">{singleJob?.experienceLevel} Year(s)</span>
              </div>
            </div>

             <div className="flex items-center gap-3 text-slate-600">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                 <IndianRupee className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium uppercase">Salary</span>
                <span className="text-sm font-semibold text-slate-700">₹ {singleJob?.salary} LPA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
           <h2 className="text-lg font-bold text-slate-900 mb-4">Job Description</h2>
           <p className="text-slate-600 leading-relaxed mb-6">
             {singleJob?.description}
           </p>

           <h3 className="text-md font-bold text-slate-900 mb-3">Key Requirements:</h3>
           <ul className="space-y-3">
             {singleJob?.requirements?.map((req, index) => (
               <li key={index} className="flex items-start gap-3 text-slate-600">
                 <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                 </div>
                 <span className="text-sm leading-relaxed">{req}</span>
               </li>
             ))}
           </ul>
        </div>
        
        {/* Company Card */}
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">About Company</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                 <img src={singleJob?.company?.logo} alt={singleJob?.company?.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{singleJob?.company?.name}</h3>
                <a href={singleJob?.company?.website} target="_blank" rel="noreferrer" className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                  Visit Website <Globe className="w-3 h-3" />
                </a>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {singleJob?.company?.description}
            </p>
         </div>
      </div>
    </div>
  );
};

export default JobDetails;