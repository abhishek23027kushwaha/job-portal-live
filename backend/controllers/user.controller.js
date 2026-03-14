import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import sendEmail from "../utils/sendEmail.js";
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Generte Token and Send Cookie
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        };

        // Generte Token and Send Cookie
        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            message: `Welcome back ${user.name}`,
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }

}


export const googleLogin = async (req, res) => {
  try {
    const { name, email, photoUrl, role } = req.body;
    console.log(name);
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        profilePhoto: photoUrl || "",
        role: role || "student"
      });
    }

    // Generate Token
    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      message: `Welcome ${user.name}`,
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            })
        };

        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}




export const updateProfile = async (req, res) => {
    try {
        const { name, email, phone, bio, skills ,experience} = req.body;
        const file = req.file; // Multer se file yahan aayegi

        const userId = req.id; // isAuthenticated middleware se
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // --- Cloudinary Upload Logic ---
        if (file) {
            const fileUri = getDataUri(file);
            
            // Resume ke liye resource_type: "auto" dena zaroori hai (PDF ke liye)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: "auto" 
            });

            // Agar user ne Resume upload kiya hai (PDF file)
            if (file.mimetype === "application/pdf") {
                user.resume = cloudResponse.secure_url; // Resume URL save hoga
                user.resumeOriginalName = file.originalname; // Original name save hoga
            } else {
                // Agar Image upload ki hai
                user.profilePhoto = cloudResponse.secure_url;
            }
        }

        // Baki fields update karein
        if (name) user.name = name;
        if (email) user.email = email;
        if (bio) user.bio = bio;
        if(phone) user.phone=phone;
        
        if(experience) user.experience=experience;
        if (skills) user.skills = skills.split(","); // String to Array

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


// =============================================
// FORGOT PASSWORD - OTP SEND
// =============================================
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email", success: false });
        }

        // 4-digit OTP generate karo
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // OTP ko hash karke save karo (security ke liye)
        const hashedOtp = await bcrypt.hash(otp, 10);
        user.resetOtp = hashedOtp;
        user.resetOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save({ validateModifiedOnly: true });

        // Email bhejo
        await sendEmail({
            email: user.email,
            subject: "Your Password Reset OTP - Job Portal",
            message: `Hello ${user.name},\n\nYour OTP to reset your password is: ${otp}\n\nThis OTP is valid for 10 minutes. Do not share it with anyone.\n\nIf you did not request this, please ignore this email.\n\nRegards,\nJob Portal Team`
        });

        return res.status(200).json({
            message: "OTP sent to your email address",
            success: true
        });

    } catch (error) {
        console.error("❌ forgotPassword error:", error.message);
        return res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

// =============================================
// VERIFY OTP
// =============================================
export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user || !user.resetOtp || !user.resetOtpExpires) {
            return res.status(400).json({ message: "OTP not found. Please request a new one", success: false });
        }

        // Expiry check
        if (user.resetOtpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one", success: false });
        }

        // OTP match karo
        const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP. Please try again", success: false });
        }

        return res.status(200).json({
            message: "OTP verified successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// =============================================
// RESET PASSWORD
// =============================================
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user || !user.resetOtp || !user.resetOtpExpires) {
            return res.status(400).json({ message: "OTP not found. Please request a new one", success: false });
        }

        // Expiry check
        if (user.resetOtpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one", success: false });
        }

        // OTP verify karo
        const isOtpValid = await bcrypt.compare(otp, user.resetOtp);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        // Naya password hash karo aur save karo
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        await user.save({ validateModifiedOnly: true });

        return res.status(200).json({
            message: "Password reset successfully! Please login with your new password",
            success: true
        });

    } catch (error) {
        console.error("❌ resetPassword error:", error.message);
        return res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};

// =============================================
// SAVE / UNSAVE JOB
// =============================================
export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isJobSaved = user.savedJobs.includes(jobId);

        if (isJobSaved) {
            // Unsave
            user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
            await user.save({ validateModifiedOnly: true });
            return res.status(200).json({
                message: "Job removed from saved jobs",
                success: true,
                isSaved: false
            });
        } else {
            // Save
            user.savedJobs.push(jobId);
            await user.save({ validateModifiedOnly: true });
            return res.status(200).json({
                message: "Job saved successfully",
                success: true,
                isSaved: true
            });
        }
    } catch (error) {
        console.error("❌ saveJob error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// =============================================
// GET SAVED JOBS
// =============================================
export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).populate({
            path: 'savedJobs',
            populate: {
                path: 'company'
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            savedJobs: user.savedJobs,
            success: true
        });
    } catch (error) {
        console.error("❌ getSavedJobs error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
