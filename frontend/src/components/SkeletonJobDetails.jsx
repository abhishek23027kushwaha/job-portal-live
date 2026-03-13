import React from 'react';
import { motion } from 'framer-motion';

const SkeletonJobDetails = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-10">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="w-8 h-8 bg-slate-100 rounded-full" />
          <div className="w-24 h-5 bg-slate-100 rounded-lg" />
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-slate-100 rounded-full" />
            <div className="w-8 h-8 bg-slate-100 rounded-full" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Main Card Skeleton */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div className="flex gap-4 w-full md:w-2/3">
              <motion.div 
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 bg-slate-200 rounded-2xl flex-shrink-0"
              />
              <div className="space-y-3 w-full">
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="h-7 bg-slate-200 rounded-lg w-3/4"
                />
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="h-4 bg-slate-100 rounded-lg w-1/2"
                />
                <div className="flex gap-2">
                  <div className="w-20 h-6 bg-slate-100 rounded-full" />
                  <div className="w-24 h-6 bg-slate-100 rounded-full" />
                </div>
              </div>
            </div>
            <motion.div 
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
               className="w-full md:w-32 h-12 bg-slate-200 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50" />
                <div className="space-y-2 flex-1">
                  <div className="h-2 bg-slate-100 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
           <div className="w-32 h-6 bg-slate-100 rounded-lg mb-4" />
           <div className="space-y-2">
             {[1, 2, 3, 4].map(i => (
               <motion.div 
                 key={i}
                 animate={{ opacity: [0.2, 0.5, 0.2] }}
                 transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 * i }}
                 className="h-3 bg-slate-50 rounded-lg w-full"
               />
             ))}
           </div>
           <div className="w-40 h-5 bg-slate-100 rounded-lg pt-4" />
           <div className="space-y-3">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex gap-3">
                 <div className="w-5 h-5 rounded-full bg-slate-100 flex-shrink-0" />
                 <div className="h-3 bg-slate-50 rounded-lg w-3/4 flex-grow" />
               </div>
             ))}
           </div>
        </div>

        {/* Company Skeleton */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
           <div className="w-32 h-6 bg-slate-100 rounded-lg mb-4" />
           <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-slate-100 rounded-xl" />
             <div className="space-y-2">
               <div className="h-4 bg-slate-200 rounded-lg w-32" />
               <div className="h-3 bg-slate-100 rounded-lg w-24" />
             </div>
           </div>
           <div className="space-y-2">
             {[1, 2].map(i => (
                <div key={i} className="h-3 bg-slate-50 rounded-lg w-full" />
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonJobDetails;
