import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSingleJob, setLoading } from "../redux/jobSlice";
import { API_URL } from "../App";

const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleJob = async () => {
            dispatch(setLoading(true));
            try {
                const res = await axios.get(`${API_URL}/api/v1/job/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        if (jobId) fetchSingleJob();
    }, [jobId, dispatch]);
}

export default useGetSingleJob;
