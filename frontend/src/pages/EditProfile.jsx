import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, Briefcase, Linkedin, Github, 
  Globe, Upload, X, Plus, Trash2, Loader2, MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice'; // Apne slice ka sahi path check karein

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  // Redux se user nikalna
  const { user } = useSelector(store => store.user);

  // --- States ---
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [file, setFile] = useState(null);
  const [experiences, setExperiences] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    bio: ""
  });

  // --- useEffect: Data ko Form mein bharna ---
  useEffect(() => {
    if (user) {
        setFormData({
            name: user.name || "",
            title: user.profile?.title || user.title || "",
            email: user.email || "",
            phone: user.phoneNumber || user.phone || "",
            bio: user.profile?.bio || user.bio || ""
        });

        // Skills handle karna
        setSkills(user.profile?.skills || user.skills || []);

        // Experience handle karna (Parsing logic)
        const expData = user.profile?.experience || user.experience;
        if (expData) {
            try {
                // Agar data string hai (JSON), toh parse karein, warna array set karein
                const parsedExp = typeof expData === 'string' ? JSON.parse(expData) : expData;
                setExperiences(Array.isArray(parsedExp) ? parsedExp : [parsedExp]);
            } catch (e) {
                setExperiences(Array.isArray(expData) ? expData : [expData]);
            }
        }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const addExperienceField = () => {
    setExperiences([...experiences, ""]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleExpChange = (index, value) => {
    const updated = [...experiences];
    updated[index] = value;
    setExperiences(updated);
  };

  // --- Final Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("title", formData.title);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("bio", formData.bio);
    data.append("skills", skills.join(",")); // Array to string
    data.append("experience", JSON.stringify(experiences)); // Array to JSON string
    
    if (file) {
        data.append("file", file); // Profile photo ya Resume
    }

    try {
      const res = await axios.post(`${API_URL}/api/v1/user/profile/update`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        // SABSE ZAROORI: Naya data Redux mein bhejna taaki UI update ho jaye
        dispatch(setUser(res.data.user)); 
        toast.success(res.data.message || "Profile Updated!");
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
            <div className="flex gap-3">
                <button onClick={() => navigate(-1)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-all">Cancel</button>
                <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Photo & Socials */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 text-center">
              <div className="relative inline-block mb-4">
                 <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 mx-auto border-4 border-white shadow-md overflow-hidden">
                    {user?.profilePhoto ? (
                        <img src={user.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-4xl font-bold text-indigo-600">{formData.name?.[0] || 'U'}</span>
                    )}
                 </div>
                 <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-slate-200 cursor-pointer text-slate-600 hover:text-indigo-600 transition-colors">
                    <Upload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                 </label>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{formData.name || "Full Name"}</h2>
              <p className="text-slate-500 text-sm">{formData.title || "Your Title"}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500" /> Social Links</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2">
                        <Linkedin className="w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="LinkedIn URL" className="flex-1 text-sm outline-none bg-transparent" />
                    </div>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2">
                        <Github className="w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="GitHub URL" className="flex-1 text-sm outline-none bg-transparent" />
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Main Form */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Personal Details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-indigo-500" /> Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                        <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl bg-slate-50">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <input readOnly name="email" value={formData.email} onChange={handleChange} className="flex-1 bg-transparent outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Phone</label>
                        <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <input name="phone" value={formData.phone} onChange={handleChange} className="flex-1 bg-transparent outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-500 uppercase ml-1">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
                    </div>
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-indigo-500" /> Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                            {skill}
                            <button onClick={() => setSkills(skills.filter(s => s !== skill))}><X className="w-3 h-3" /></button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={handleAddSkill} placeholder="Add a skill..." className="flex-1 px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
                    <button onClick={() => { if(newSkill.trim()) setSkills([...skills, newSkill.trim()]); setNewSkill(""); }} className="bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800 transition-colors">
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Briefcase className="w-5 h-5 text-indigo-500" /> Experience</h3>
                    <button onClick={addExperienceField} className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline"><Plus className="w-4 h-4" /> Add Experience</button>
                </div>
                <div className="space-y-3">
                    {experiences.map((exp, index) => (
                        <div key={index} className="flex gap-2 group animate-in fade-in slide-in-from-top-1">
                            <div className="relative flex-1">
                                <Briefcase className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                <input 
                                    value={exp}
                                    onChange={(e) => handleExpChange(index, e.target.value)}
                                    placeholder="e.g. 1 Year at Giffy Sign"
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <button onClick={() => removeExperience(index)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-5 h-5" /></button>
                        </div>
                    ))}
                    {experiences.length === 0 && <p className="text-sm text-slate-400 text-center py-2">Click add to include your experience.</p>}
                </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Upload className="w-5 h-5 text-indigo-500" /> Resume / CV</h3>
                <label className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-indigo-500 hover:bg-slate-50 cursor-pointer block transition-all group">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-indigo-500 transition-colors" />
                    <p className="text-sm font-medium text-slate-600">{file ? file.name : "Click to upload Resume (PDF)"}</p>
                    <input type="file" className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                {user?.profile?.resume && (
                    <p className="text-center mt-2 text-xs text-indigo-500">
                        Current Resume: <a href={user.profile.resume} target="_blank" className="underline">{user.profile.resumeOriginalName || "View"}</a>
                    </p>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;