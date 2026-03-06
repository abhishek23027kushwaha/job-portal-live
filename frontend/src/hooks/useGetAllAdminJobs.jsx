import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";
import { API_URL } from "../App";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/job/getadminjobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    }, [dispatch]);
}

export default useGetAllAdminJobs;
