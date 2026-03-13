import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import useGetAllJobs from '../hooks/useGetAllJobs';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from './JobCard';
import SkeletonJobCard from '../components/SkeletonJobCard';


const Jobs = () => {
  useGetAllJobs();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { allJobs, searchJobByText, filterRole, filterSalary, loading } = useSelector(store => store.job);
  const filterJobs = React.useMemo(() => {
    let filtered = allJobs;

    // 1. Filter by Search Text
    if (searchJobByText) {
      const lowerSearch = searchJobByText.toLowerCase();
      filtered = filtered.filter((job) => {
        return (
          job.title?.toLowerCase().includes(lowerSearch) ||
          job.company?.name?.toLowerCase().includes(lowerSearch) ||
          job.description?.toLowerCase().includes(lowerSearch) ||
          job.location?.toLowerCase().includes(lowerSearch)
        );
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

    return filtered;
  }, [allJobs, searchJobByText, filterRole, filterSalary]);

  return (
    <div className="bg-slate-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* BREADCRUMB / BACK LINK */}
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
          <button onClick={() => window.history.back()} className="hover:text-indigo-600 transition-colors">Home</button>
          <span>/</span>
          <span className="text-slate-900">Explore Jobs</span>
        </div>

        {/* MOBILE FILTER LOGO/BUTTON */}
        <div className="flex md:hidden items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-extrabold text-slate-900">Browse Jobs</h2>
          
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl font-bold text-sm active:scale-95 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <div className="md:w-1/4 w-full md:sticky md:top-24">
            <FilterSidebar
              isOpen={isFilterOpen} 
              onClose={() => setIsFilterOpen(false)} 
            />
          </div>

          <div className="flex-1 w-full">
            <div className="hidden md:flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                     Recommended <span className="text-indigo-600">Jobs</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-1 font-medium">
                    {loading ? "Searching for the best matches..." : `${filterJobs?.length} positions found for you`}
                  </p>
                </div>
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