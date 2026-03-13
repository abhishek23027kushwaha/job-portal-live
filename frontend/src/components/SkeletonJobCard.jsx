import React from 'react';
import { motion } from 'framer-motion';

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

export default SkeletonJobCard;
