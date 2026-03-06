import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import useGetAllJobs from '../hooks/useGetAllJobs';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from './JobCard';

const SkeletonJobCard = () => (
  <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-3 w-2/3">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-6 bg-slate-200 rounded-lg w-full"
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          className="h-4 bg-slate-100 rounded-lg w-1/2"
        />
      </div>
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        className="w-14 h-14 bg-slate-100 rounded-lg"
      />
    </div>
    <div className="space-y-3 mb-6">
      {[1, 2, 3].map(i => (
        <motion.div 
          key={i}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 * i }}
          className="h-4 bg-slate-50 rounded-lg w-full"
        />
      ))}
    </div>
    <div className="flex gap-2">
      <div className="h-6 bg-slate-100 rounded-full w-20" />
      <div className="h-6 bg-slate-100 rounded-full w-24" />
    </div>
  </div>
);

const Jobs = () => {
  useGetAllJobs();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { allJobs, searchJobByText, filterRole, filterSalary, loading } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
 
  useEffect(() => {
    let filtered = allJobs;

    // 1. Filter by Search Text
    if (searchJobByText) {
      filtered = filtered.filter((job) => {
        return job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
               job.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
               job.description?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
               job.location?.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    }

    // 2. Filter by Role
    if (filterRole.length > 0) {
      filtered = filtered.filter((job) => {
        return filterRole.some(role => job.title?.toLowerCase().includes(role.toLowerCase()));
      });
    }

    // 3. Filter by Salary Range
    if (filterSalary) {
      const [min, max] = filterSalary.split('-').map(Number);
      filtered = filtered.filter((job) => {
        const salary = Number(job.salary);
        if (max) {
           return salary >= min && salary <= max;
        } else {
           return salary >= min;
        }
      });
    }

    setFilterJobs(filtered);
  }, [allJobs, searchJobByText, filterRole, filterSalary]);

  return (
    <div className="bg-slate-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* MOBILE FILTER LOGO/BUTTON */}
        <div className="flex md:hidden items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-200">
          <h2 className="font-bold text-slate-900">Browse Jobs</h2>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="md:w-1/4">
            <FilterSidebar
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)} 
            />
          </div>

          <div className="flex-1">
            <div className="hidden md:flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                   {loading ? "Searching Jobs..." : `Recommended Jobs (${filterJobs?.length})`}
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map(i => <SkeletonJobCard key={i} />)
              ) : filterJobs?.length > 0 ? (
                filterJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-500">No jobs found matching your criteria</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jobs;