import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MotivationalSection = () => {
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const btnRef = useRef(null);
  const particle1 = useRef(null);
  const particle2 = useRef(null);
  const particle3 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particle animations (loop)
      gsap.to(particle1.current, {
        y: -20, x: 10, rotation: 15,
        duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });
      gsap.to(particle2.current, {
        y: 18, x: -12, rotation: -20,
        duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.5,
      });
      gsap.to(particle3.current, {
        y: -14, x: 8, rotation: 10,
        duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      });

      // ScrollTrigger entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(tagRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )
      .fromTo(btnRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 px-4"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800" />

      {/* Radial glow spots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Floating Particles */}
      <div ref={particle1} className="absolute top-10 left-10 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl shadow-xl">
        💼
      </div>
      <div ref={particle2} className="absolute bottom-12 right-16 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl shadow-xl">
        🚀
      </div>
      <div ref={particle3} className="absolute top-16 right-12 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl shadow-xl">
        ✨
      </div>

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Badge */}
        <div ref={tagRef}>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-indigo-200 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Your Future Awaits
          </span>
        </div>

        {/* Main Heading */}
        <h2 ref={headingRef} className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 drop-shadow-lg">
          Your Career Journey
          <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
            Starts Here.
          </span>
        </h2>

        {/* Subtext */}
        <p ref={subRef} className="text-lg md:text-xl text-indigo-200 max-w-xl mx-auto mb-10 leading-relaxed">
          Find the opportunity you deserve. Thousands of companies are looking for someone just like you — right now.
        </p>

        {/* CTA Button */}
        <div ref={btnRef}>
          <button
            onClick={() => navigate('/jobs')}
            className="group inline-flex items-center gap-3 bg-white text-indigo-700 font-bold text-base px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-900/40 hover:bg-yellow-300 hover:text-indigo-900 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Explore Jobs Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {[
            { value: '10K+', label: 'Jobs Listed' },
            { value: '500+', label: 'Companies' },
            { value: '50K+', label: 'Job Seekers' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-xs text-indigo-300 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotivationalSection;
