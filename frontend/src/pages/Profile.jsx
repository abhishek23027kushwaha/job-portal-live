import React from 'react';
import axios from 'axios';
import { API_URL } from '../App';
import { 
  User, Mail, Phone, Briefcase, Linkedin, Github, 
  Globe, MessageSquare, PenSquare, Bookmark, MapPin, Building2, IndianRupee, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.user);

    // Parsing Experience logic (consistent with EditProfile)
    const getExperiences = () => {
        const expData = user?.profile?.experience || user?.experience;
        if (!expData) return [];
        try {
            const parsedExp = typeof expData === 'string' ? JSON.parse(expData) : expData;
            return Array.isArray(parsedExp) ? parsedExp : [parsedExp];
        } catch (e) {
            return Array.isArray(expData) ? expData : [expData];
        }
    };

    const experiences = getExperiences();
    const skills = user?.profile?.skills || user?.skills || [];

    return (
        <div className="bg-slate-50 min-h-screen py-8 px-4 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                    <button 
                        onClick={() => navigate('/profile/edit')}
                        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
                    >
                        <PenSquare className="w-4 h-4" /> Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Left Column: Photo & Socials */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
                            <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mx-auto border-4 border-white shadow-md overflow-hidden mb-4">
                                {user?.profilePhoto ? (
                                    <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-4xl font-bold text-indigo-600">{user?.name?.[0] || 'U'}</span>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">{user?.name || "Full Name"}</h2>
                            <p className="text-slate-500 text-sm">{user?.title || "Project Enthusiast"}</p>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500" /> Social Links</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <Linkedin className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-600 truncate">Not Provided</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <Github className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-600 truncate">Not Provided</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Personal Information */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-indigo-500" /> Personal Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Email</p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">{user?.email}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Phone</p>
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">{user?.phoneNumber || user?.phone || "Not Provided"}</span>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 space-y-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase">Bio</p>
                                    <p className="text-slate-600 text-sm italic leading-relaxed">
                                        { user?.bio || "No bio added yet."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-indigo-500" /> Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.length > 0 ? (
                                    skills.map((skill, index) => (
                                        <span key={index} className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-indigo-100">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-400 italic">No skills listed.</p>
                                )}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-indigo-500" /> Experience Highlights
                            </h3>
                            <div className="space-y-4">
                                {experiences.length > 0 ? (
                                    experiences.map((exp, index) => (
                                        <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-500 border border-slate-200">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-slate-700 font-semibold">{exp}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-400 italic py-2 text-center">No professional experience listed.</p>
                                )}
                            </div>
                        </div>

                        {/* Resume View */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-indigo-500" /> Attached Resume
                            </h3>
                            {user?.resume ? (
                                <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
                                                {user?.resumeOriginalName || "Resume.pdf"}
                                            </p>
                                            <p className="text-xs text-slate-500">Official Document</p>
                                        </div>
                                    </div>
                                    <a 
                                        href={user.resume} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="text-xs font-bold text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                    >
                                        View Document
                                    </a>
                                </div>
                            ) : (
                                <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
                                    <p className="text-sm text-slate-400 italic">No resume uploaded yet.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
