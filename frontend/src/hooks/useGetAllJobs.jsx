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
                // Fetch more jobs at once for a smoother experience, or use pagination
                const res = await axios.get(`${API_URL}/api/v1/job/get?keyword=${searchJobByText}&limit=100`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs();
    }, [dispatch, searchJobByText]);
}

export default useGetAllJobs;
