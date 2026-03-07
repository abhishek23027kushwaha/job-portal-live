import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase, Target, Zap, Building2, CheckCircle2,
  Users, BarChart3, Star, Mail, Phone, MapPin, ArrowRight,
  Sparkles, TrendingUp, Shield, Globe
} from 'lucide-react';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);


// ─── Data ─────────────────────────────────────────────────────────────────────

const offerings = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    emoji: '💼',
    title: 'Thousands of Job Listings',
    desc: 'Find jobs from different industries and locations across the country.',
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    emoji: '⚡',
    title: 'Easy Job Application',
    desc: 'Apply for jobs quickly with a streamlined, one-click application process.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    emoji: '🏢',
    title: 'Top Companies',
    desc: 'Get exclusive opportunities from trusted and verified employers.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    emoji: '🌍',
    title: 'Remote Opportunities',
    desc: 'Work from anywhere with our curated remote job listings.',
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
  },
];

const reasons = [
  { icon: <Shield className="w-5 h-5" />, text: 'Verified job listings only' },
  { icon: <Zap className="w-5 h-5" />, text: 'Fast & simple application' },
  { icon: <Star className="w-5 h-5" />, text: 'Free for all job seekers' },
  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Real-time job alerts' },
  { icon: <Users className="w-5 h-5" />, text: '5000+ active users' },
  { icon: <TrendingUp className="w-5 h-5" />, text: 'Career growth tracking' },
];

const stats = [
  { value: '5000+', label: 'Job Seekers', icon: <Users className="w-6 h-6" />, color: 'from-indigo-500 to-purple-600' },
  { value: '1000+', label: 'Jobs Posted', icon: <Briefcase className="w-6 h-6" />, color: 'from-amber-500 to-orange-500' },
  { value: '200+', label: 'Companies', icon: <Building2 className="w-6 h-6" />, color: 'from-emerald-500 to-teal-500' },
  { value: '98%', label: 'Success Rate', icon: <BarChart3 className="w-6 h-6" />, color: 'from-rose-500 to-pink-500' },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const AboutUs = () => {
  const navigate = useNavigate();

  /* ── Refs ── */
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const missionRef = useRef(null);
  const offerRef = useRef(null);
  const offerCardsRef = useRef([]);
  const whyRef = useRef(null);
  const statsRef = useRef(null);
  const statsCardsRef = useRef([]);
  const visionRef = useRef(null);
  const contactRef = useRef(null);
  const floatingOrbsRef = useRef([]);

  /* ── Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from(heroBadgeRef.current, { y: -30, opacity: 0, duration: 0.6 })
        .from(heroTitleRef.current, { y: 60, opacity: 0, duration: 0.9, skewY: 3 }, '-=0.2')
        .from(heroSubRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5, stagger: 0.15 }, '-=0.3');

      // ── Floating orbs continuous animation
      floatingOrbsRef.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          y: i % 2 === 0 ? -25 : 25,
          x: i % 3 === 0 ? 15 : -15,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });

      // ── Mission scroll reveal
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // ── Offer section heading
      gsap.from('.offer-heading', {
        scrollTrigger: { trigger: offerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // ── Offer cards stagger
      offerCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          rotateY: 15,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });

      // ── Why Choose Us
      gsap.from('.why-heading', {
        scrollTrigger: { trigger: whyRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        x: -80,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
      gsap.from('.why-item', {
        scrollTrigger: { trigger: whyRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
      });
      gsap.from('.why-image-block', {
        scrollTrigger: { trigger: whyRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // ── Stats counter animation
      statsCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          scale: 0.85,
          duration: 0.6,
          delay: i * 0.12,
          ease: 'back.out(1.7)',
        });
      });

      // ── Counting number animation
      stats.forEach((stat, i) => {
        const el = document.getElementById(`stat-val-${i}`);
        if (!el) return;
        const numericValue = parseInt(stat.value.replace(/\D/g, ''));
        const suffix = stat.value.replace(/[0-9]/g, '');
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const counter = { val: 0 };
            gsap.to(counter, {
              val: numericValue,
              duration: 2,
              ease: 'power2.out',
              delay: i * 0.15,
              onUpdate: function () {
                el.textContent = Math.floor(counter.val) + suffix;
              },
            });
          },
        });
      });

      // ── Vision
      gsap.from('.vision-card', {
        scrollTrigger: { trigger: visionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
      });

      // ── Contact
      gsap.from('.contact-left', {
        scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        x: -60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
      gsap.from('.contact-right', {
        scrollTrigger: { trigger: contactRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        x: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />

      {/* ─────────────────────────────────────────────────────────────────────
          1. HERO / INTRODUCTION SECTION
      ───────────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
      >
        {/* Decorative orbs */}
        <div ref={el => floatingOrbsRef.current[0] = el} className="absolute top-20 left-10 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div ref={el => floatingOrbsRef.current[1] = el} className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
        <div ref={el => floatingOrbsRef.current[2] = el} className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
        <div ref={el => floatingOrbsRef.current[3] = el} className="absolute bottom-1/3 left-1/4 w-56 h-56 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          {/* Badge */}
          <div ref={heroBadgeRef} className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Trusted by 5000+ job seekers
          </div>

          {/* Title */}
          <h1
            ref={heroTitleRef}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            About{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CareerGraph
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full opacity-60" />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={heroSubRef}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            We help job seekers find the right opportunities and connect companies with talented professionals.
            Our platform makes job searching{' '}
            <span className="text-indigo-400 font-semibold">simple, fast, and accessible</span>{' '}
            for everyone.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/jobs')}
              className="hero-cta group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-indigo-900/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Jobs
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="hero-cta flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              Join for Free
            </button>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1440 30 1080 80 720 60C360 40 0 80 0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          2. OUR MISSION
      ───────────────────────────────────────────────────────────────────── */}
      <section ref={missionRef} className="py-24 px-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left: Decorative card */}
          <div className="w-full md:w-5/12 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl blur-xl opacity-30 scale-105" />
              <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold">Our Mission</span>
                </div>
                <div className="space-y-4">
                  {['Connect talent & companies', 'Simplify hiring process', 'Make careers accessible'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-200 flex-shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/20 text-indigo-200 text-sm">
                  Building bridges between talent & opportunity
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-7/12">
            <span className="inline-block text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">
              What drives us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Our{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Our mission is to connect talented individuals with the right companies and make the hiring process
              faster, smarter, and more efficient. We believe every person deserves access to great career
              opportunities regardless of where they are.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Industries supported', val: '30+' },
                { label: 'Cities covered', val: '100+' },
                { label: 'Avg. time to hire', val: '7 days' },
                { label: 'Satisfaction rate', val: '98%' },
              ].map((m, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-2xl font-black text-indigo-600">{m.val}</p>
                  <p className="text-sm text-slate-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          3. WHAT WE OFFER
      ───────────────────────────────────────────────────────────────────── */}
      <section ref={offerRef} className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="offer-heading text-center mb-16">
            <span className="inline-block text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              What We{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Offer
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Everything you need to land your dream job — all in one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, i) => (
              <div
                key={i}
                ref={el => offerCardsRef.current[i] = el}
                className={`group relative rounded-3xl p-6 border ${item.border} ${item.bg} overflow-hidden cursor-default hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl`}
              >
                {/* Gradient accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-3xl bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-5 shadow-lg`}>
                  {item.icon}
                </div>
                <p className="text-2xl mb-2">{item.emoji}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          4. WHY CHOOSE US
      ───────────────────────────────────────────────────────────────────── */}
      <section ref={whyRef} className="py-24 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="w-full lg:w-1/2">
            <span className="why-heading inline-block text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">
              Reasons to join
            </span>
            <h2 className="why-heading text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Us?
              </span>
            </h2>
            <p className="why-heading text-slate-500 text-lg mb-10 leading-relaxed">
              We've built a platform that puts job seekers first. No fluff, just results. Here's why thousands
              choose us every day.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <div
                  key={i}
                  className="why-item flex items-center gap-3 bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3 hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                    {r.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual block */}
          <div className="why-image-block w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Companies Hiring', val: '200+', icon: '🏢' },
                    { label: 'Active Jobs', val: '1000+', icon: '💼' },
                    { label: 'Users Placed', val: '3K+', icon: '🎯' },
                    { label: 'Daily Listings', val: '50+', icon: '📋' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-colors">
                      <p className="text-2xl mb-2">{item.icon}</p>
                      <p className="text-2xl font-black text-white">{item.val}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 bg-indigo-600/30 rounded-2xl p-4 border border-indigo-500/30">
                  <div className="flex -space-x-2">
                    {['A', 'B', 'C', 'D'].map((l, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-indigo-900">
                        {l}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-300">
                    <span className="text-white font-bold">+5000</span> job seekers joined this week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          5. PLATFORM STATISTICS
      ───────────────────────────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden"
      >
        {/* Background decor */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 60% 50%, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-indigo-200 text-sm font-bold uppercase tracking-widest mb-3">
            Our Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Platform Statistics
          </h2>
          <p className="text-indigo-200 text-lg mb-16 max-w-xl mx-auto">
            Numbers that speak for themselves — real impact, real careers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                ref={el => statsCardsRef.current[i] = el}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-1 group"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <p id={`stat-val-${i}`} className="text-4xl font-black text-white mb-1">
                  {s.value}
                </p>
                <p className="text-indigo-200 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          6. OUR VISION
      ───────────────────────────────────────────────────────────────────── */}
      <section ref={visionRef} className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="vision-card relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-indigo-950 p-12 shadow-2xl text-center">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium px-5 py-2 rounded-full mb-8">
                <TrendingUp className="w-4 h-4" />
                Looking ahead
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Our{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>

              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                "Our vision is to become one of the most trusted platforms where people can{' '}
                <span className="text-white font-semibold">build their careers</span> and companies can
                find the{' '}
                <span className="text-indigo-400 font-semibold">best talent</span> — making the world
                of work more connected, fair, and human."
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {['🌏 Global Reach', '🤖 AI-powered matching', '📊 Data-driven insights', '🤝 Trusted partnerships'].map((tag, i) => (
                  <span key={i} className="bg-white/10 border border-white/15 text-slate-300 text-sm font-medium px-4 py-2 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          7. CONTACT SECTION
      ───────────────────────────────────────────────────────────────────── */}
      <section ref={contactRef} className="py-24 max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left */}
          <div className="contact-left w-full lg:w-1/2">
            <span className="inline-block text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">
              Get in touch
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Let's{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Connect
              </span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              Have questions, suggestions, or just want to say hello? Our team is always ready to help you
              on your career journey.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: 'Email Us',
                  value: 'support@careergraph.com',
                  color: 'from-indigo-500 to-purple-600',
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: 'Call Us',
                  value: '+91 98765 43210',
                  color: 'from-emerald-500 to-teal-500',
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: 'Visit Us',
                  value: 'Tech Hub, Bengaluru, India',
                  color: 'from-amber-500 to-orange-500',
                },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-5 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all group">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{c.label}</p>
                    <p className="text-slate-800 font-semibold">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Contact Card */}
          <div className="contact-right w-full lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 p-8 shadow-2xl">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-xl" />

              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-2">Ready to Get Started?</h3>
                <p className="text-indigo-200 text-sm mb-8 leading-relaxed">
                  Join thousands of job seekers who found their dream jobs through our platform. It's free!
                </p>

                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full bg-white/15 border border-white/20 text-white placeholder-indigo-300 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-white/15 border border-white/20 text-white placeholder-indigo-300 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm transition-all"
                  />
                  <textarea
                    rows={3}
                    placeholder="Your message or query..."
                    className="w-full bg-white/15 border border-white/20 text-white placeholder-indigo-300 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm transition-all resize-none"
                  />
                </div>

                <button
                  className="w-full bg-white text-indigo-700 font-bold py-4 rounded-2xl hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-indigo-300 text-xs text-center mt-4">
                  Typically replies within 2 hours ⚡
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
