import { useDispatch, useSelector } from 'react-redux';
import { setFilterRole, setFilterSalary } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, IndianRupee, Briefcase, Trash2 } from 'lucide-react';

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

  return (
    <>
      {/* 1. Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* 2. Side Panel */}
      <div className={`
        fixed inset-y-0 left-0 z-[70] w-[85%] max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:z-0 md:w-full md:shadow-none md:bg-transparent
      `}>
        
        <div className="flex flex-col h-full md:h-auto bg-white md:rounded-3xl md:border md:border-slate-200/60 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shadow-indigo-100">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 whitespace-nowrap">
                  Job Filters
                </h3>
              </div>
              
              {(filterRole.length > 0 || filterSalary) && (
                <button 
                  onClick={clearFilters} 
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="p-6 space-y-8 overflow-y-auto flex-1">
            {/* Role Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight className="w-4 h-4 text-indigo-500" />
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Job Category</h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {['Frontend', 'Backend', 'Fullstack', 'Designer'].map((role) => (
                  <label 
                    key={role} 
                    className={`
                      flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group
                      ${filterRole.includes(role) 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={filterRole.includes(role)}
                        onChange={() => handleRoleChange(role)}
                        className="w-4 h-4 rounded-md border-slate-300 text-indigo-600 focus:ring-0 cursor-pointer" 
                      />
                      <span className="text-sm font-semibold">{role}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Salary Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <IndianRupee className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Expected Salary</h4>
              </div>
              <div className="relative">
                <select 
                  value={filterSalary}
                  onChange={handleSalaryChange}
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
                >
                  <option value="">All Ranges</option>
                  <option value="0-3">0 - 3 LPA</option>
                  <option value="3-6">3 - 6 LPA</option>
                  <option value="6-10">6 - 10 LPA</option>
                  <option value="10-100">10+ LPA</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button for Mobile */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/30 md:hidden">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-[0.98] transition-all"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default FilterSidebar;