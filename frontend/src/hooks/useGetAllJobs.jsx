import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs, setLoading } from "../redux/jobSlice";
import { API_URL } from "../App";

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchJobByText } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${API_URL}/api/v1/job/get?keyword=${searchJobByText}&limit=100`, { withCredentials: true });
                console.log("Jobs API Response:", res.data); // Debug log
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                } else {
                    // success:false aaya toh empty array set karo
                    dispatch(setAllJobs([]));
                    console.warn("Jobs fetch returned success:false:", res.data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error?.response?.data || error.message);
                dispatch(setAllJobs([])); // Error pe bhi empty array set karo
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs();
    }, [dispatch, searchJobByText]);
}

export default useGetAllJobs;
