import React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      onClick={() => navigate(`/description/${job?._id}`)} 
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        borderColor: "rgb(79 70 229 / 0.2)"
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 relative group cursor-pointer"
    >
      
      {/* Top Section: Title & Logo */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {job?.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-slate-500 font-medium">{job?.company?.name}</p>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {job?.jobType}
            </span>
          </div>
        </div>
        
        {/* Company Logo */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-white border border-slate-100 rounded-lg flex items-center justify-center p-2 flex-shrink-0 overflow-hidden shadow-sm"
        >
          <img src={job?.company?.logo} alt={job?.company?.name} className="w-full h-full object-contain" />
        </motion.div>
      </div>
      
      {/* Details Section */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-slate-600">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{job?.location}</span>
        </div>
        
        <div className="flex items-center gap-3 text-slate-600">
          <Briefcase className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">{job?.experienceLevel} year(s) experience</span>
        </div>
        
        <div className="flex items-center gap-3 text-slate-600">
          <IndianRupee className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium">₹ {job?.salary} LPA</span>
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium">
          <Clock className="w-3 h-3" />
          {job?.createdAt?.split("T")[0]}
        </div>
        
        <div className="flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">
          <Zap className="w-3 h-3 fill-orange-500 text-orange-500" />
          Be an early applicant
        </div>
      </div>

      {/* Category Badge */}
      <div className="inline-block bg-slate-50 text-slate-500 px-4 py-1 rounded-lg text-xs font-medium">
        {job?.position} positions
      </div>

      {/* Hidden Hover Action */}
      <div className="absolute bottom-4 right-6 overflow-hidden">
        <motion.button 
          initial={{ x: 20, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          animate={ { x: 20, opacity: 0 }}
          className="text-indigo-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 opacity-0"
        >
          Apply Now &rarr;
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;