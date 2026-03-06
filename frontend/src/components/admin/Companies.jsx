import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { Search, Plus, Edit2, Building2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../App';
import { setCompanies, setSearchCompanyByText } from '../../redux/companySlice';
import { toast } from 'react-hot-toast';

const Companies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/company/get`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {
                console.log(error);
                // toast.error(error.response?.data?.message || "Failed to fetch companies");
            }
        };
        fetchCompanies();
    }, [dispatch]);

    useEffect(() => {
        dispatch(setSearchCompanyByText(filterText));
    }, [filterText, dispatch]);

    const filteredCompanies = companies.filter((company) => {
        if (!searchCompanyByText) return true;
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });

    return (
        <AdminLayout>
            <div className="space-y-8 animate-in fade-in duration-500">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Registered Companies</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Manage and track all companies you've registered.</p>
                    </div>
                    <button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
                    >
                        <Plus size={20} />
                        New Company
                    </button>
                </div>

                {/* Filter & Search Section */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Filter by name..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>
                </div>

                {/* Companies Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Logo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredCompanies.map((company) => (
                                    <tr key={company._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                {company.logo ? (
                                                    <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
                                                ) : (
                                                    <Building2 size={20} className="text-slate-400" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 text-sm">{company.name}</span>
                                                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                                                    <MapPin size={10} /> {company.location || 'Location not set'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                            {company.createdAt?.split("T")[0]}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="p-2 hover:bg-white hover:border-slate-200 border border-transparent rounded-lg text-slate-400 hover:text-indigo-600 transition-all shadow-sm group-hover:shadow-md"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Empty State */}
                    {filteredCompanies.length === 0 && (
                        <div className="py-20 text-center">
                            <Building2 size={48} className="mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500 font-medium">No companies found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Companies;