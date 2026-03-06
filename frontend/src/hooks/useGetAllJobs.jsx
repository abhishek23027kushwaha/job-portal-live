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
                const res = await axios.get(`${API_URL}/api/v1/job/get?keyword=${searchJobByText}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs();
    }, [dispatch, searchJobByText]);
}

export default useGetAllJobs;
