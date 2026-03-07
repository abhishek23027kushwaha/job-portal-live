import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.id;
        next();
    } catch (error) {
        console.log("Authentication error:", error.message);
        return res.status(401).json({
            message: "Authentication failed. Please login again.",
            success: false,
        });
    }
}
export default isAuthenticated;
