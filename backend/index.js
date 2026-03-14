import express from "express";
import dotenv from "dotenv";
dotenv.config({});
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import companyRoute from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173', 
            'http://127.0.0.1:5173', 
            'https://job-portal-live-tc14.onrender.com', 
            'https://job-portal-live-1-zoc3.onrender.com',
            'https://job-portal-live-2-pojy.onrender.com'
        ];
        // Allow requests with no origin (like mobile apps or curl) or matching allowedOrigins or ending with .onrender.com
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

connectDB();
// Health check endpoint (Render ke liye - backend alive rakhe)
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "Backend is running!" });
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT,()=>{
    // connectDB();
    console.log(`Server running at port ${PORT}`);
})




















