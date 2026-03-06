import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === 'recruiter') {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        }
    }, [user, navigate]);

    return (
        <>
            {children}
        </>
    )
};

export default PublicRoute;
