import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
    const { user } = useSelector(store => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <>
            {children}
        </>
    )
};

export default AuthenticatedRoute;
