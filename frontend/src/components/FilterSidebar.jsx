import { useDispatch, useSelector } from 'react-redux';
import { setFilterRole, setFilterSalary } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { filterRole, filterSalary } = useSelector(store => store.job);

  const handleRoleChange = (role) => {
    let newRoles;
    if (filterRole.includes(role)) {
      newRoles = filterRole.filter(r => r !== role);
    } else {
      newRoles = [...filterRole, role];
    }
    dispatch(setFilterRole(newRoles));
  }

  const handleSalaryChange = (e) => {
    dispatch(setFilterSalary(e.target.value));
  }

  const clearFilters = () => {
    dispatch(setFilterRole([]));
    dispatch(setFilterSalary(""));
  }

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <>
      {/* 1. Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] md:hidden"
          onClick={onClose}
        />
      )}

      {/* 2. Side Panel */}
      <div className={`
        fixed inset-y-0 left-0 z-[70] w-[85%] max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 ease-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-0 md:w-full md:shadow-none md:border md:border-slate-200 md:rounded-3xl md:sticky md:top-24
      `}>
        
        {/* TOP HEADER: Arrow + Filters Text */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-slate-900 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft className="w-6 h-6 group-active:-translate-x-1 transition-transform" />
            <h3 className="font-bold text-xl tracking-tight">
              Filters
            </h3>
          </button>
          <button onClick={clearFilters} className="text-xs font-semibold text-indigo-600 hover:underline">
            Clear All
          </button>
        </div>

        <div className="space-y-8">
          {/* Role Section */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Role Type</h4>
            <div className="space-y-3">
              {['Frontend', 'Backend', 'Fullstack', 'Designer'].map((role) => (
                <label key={role} className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={filterRole.includes(role)}
                    onChange={() => handleRoleChange(role)}
                    className="w-4 h-4 rounded border-slate-300 accent-indigo-600 cursor-pointer focus:ring-0" 
                  />
                  <span className="group-hover:text-indigo-600 transition-colors">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Section */}
          <div>
            <h4 className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-[0.2em]">Salary Package</h4>
            <select 
              value={filterSalary}
              onChange={handleSalaryChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
            >
              <option value="">All Ranges</option>
              <option value="0-3">0 - 3 LPA</option>
              <option value="3-6">3 - 6 LPA</option>
              <option value="6-10">6 - 10 LPA</option>
              <option value="10-100">10+ LPA</option>
            </select>
          </div>

          {/* Action Button for Mobile */}
          <div className="pt-4 md:hidden">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all"
            >
              Apply & Show Results
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;