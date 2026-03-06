import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null, 
        searchJobByText: "",
        allApplicants: [],
        allAppliedJobs: [],
        filterRole: [],
        filterSalary: "",
        loading: false,
    },
    reducers: {
        // actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllApplicants: (state, action) => {
            state.allApplicants = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setFilterRole: (state, action) => {
            state.filterRole = action.payload;
        },
        setFilterSalary: (state, action) => {
            state.filterSalary = action.payload;
        }
    }
});
export const { 
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs, 
    setSearchJobByText, 
    setAllApplicants,
    setAllAppliedJobs,
    setFilterRole,
    setFilterSalary,
    setLoading 
} = jobSlice.actions;
export default jobSlice.reducer;
