import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    emoji: '💼',
    gradient: 'from-violet-500 to-indigo-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    shadow: 'hover:shadow-violet-100',
    title: 'Find Jobs Easily',
    desc: 'Browse thousands of jobs from different industries — all in one place.',
    tag: '10,000+ Jobs',
    tagColor: 'text-violet-600 bg-violet-50 border-violet-200',
  },
  {
    emoji: '⚡',
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    shadow: 'hover:shadow-amber-100',
    title: 'Quick Apply',
    desc: 'Apply to jobs in just one click. No long forms, no hassle.',
    tag: '1-Click Apply',
    tagColor: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  {
    emoji: '🏢',
    gradient: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    shadow: 'hover:shadow-emerald-100',
    title: 'Top Companies',
    desc: 'Connect with trusted and verified companies that are actively hiring now.',
    tag: '500+ Companies',
    tagColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  {
    emoji: '📈',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    shadow: 'hover:shadow-pink-100',
    title: 'Grow Your Career',
    desc: 'Find opportunities that match your skills and help you level up.',
    tag: 'Career Growth',
    tagColor: 'text-rose-600 bg-rose-50 border-rose-200',
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards staggered animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-500 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            Everything You Need to
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent"> Land Your Dream Job</span>
          </h2>
          <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto">
            We make job searching simple, fast, and effective — so you can focus on what matters.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              ref={el => (cardsRef.current[i] = el)}
              className={`group relative bg-white rounded-3xl p-6 border ${f.border} shadow-md ${f.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default overflow-hidden`}
            >
              {/* Subtle background blob */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${f.bg} opacity-60 blur-2xl group-hover:scale-150 transition-transform duration-500`} />

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-2xl shadow-lg mb-5`}>
                {f.emoji}
              </div>

              {/* Tag */}
              <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-3 py-1 ${f.tagColor}`}>
                {f.tag}
              </span>

              {/* Text */}
              <h3 className="text-lg font-bold text-slate-900 mt-3 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${f.gradient} transition-all duration-500 rounded-b-3xl`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
