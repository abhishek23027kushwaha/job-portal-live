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
    origin: ['http://localhost:5173', 'https://job-portal-live-1-zoc3.onrender.com'], 
    credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

connectDB();
// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT,()=>{
    // connectDB();
    console.log(`Server running at port ${PORT}`);
})




















