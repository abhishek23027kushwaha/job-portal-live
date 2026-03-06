import React from 'react';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* 1. Heading Left Side Mein */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-900">
          Latest <span className="text-indigo-600">Jobs</span>
        </h2>
        <p className="text-slate-500 mt-2">Get the most recent job openings posted today.</p>
      </motion.div>

      {/* 2. Grid for 6 Jobs */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {allJobs?.length > 0 ? allJobs.slice(0, 6).map((job) => (
          <JobCard key={job._id} job={job} />
        )) : (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500">No jobs found</p>
          </div>
        )}
      </motion.div>

      {/* 3. View All Button */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <button className="text-sm font-bold text-indigo-600 hover:underline">
          View all jobs &rarr;
        </button>
      </motion.div>
    </section>
  );
};

export default LatestJobs;