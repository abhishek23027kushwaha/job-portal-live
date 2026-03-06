import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/30 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden animate-moving-gradient">
      
      {/* Decorative background blur to add depth */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -z-10"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-72 h-72 bg-blue-50/50 rounded-full blur-3xl -z-10"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* Small Badge above heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3 h-3" />
          <span>New opportunities added today</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6"
        >
          HIRE THE BEST <br />
          <span className="text-indigo-600 drop-shadow-sm">TECH TALENT</span> 
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed"
        >
          The most minimal way to find your next career move. No noise, just high-quality job listings from verified companies.
        </motion.p>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => navigate('/jobs')} 
            className="group relative flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10">EXPLORE ALL JOBS</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <motion.div 
              className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
            />
          </button>
        </motion.div>

        {/* Social Proof */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-8 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <div className="text-sm font-medium text-slate-500 italic">Trusted by 500+ startups</div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;