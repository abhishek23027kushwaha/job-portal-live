import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      // required: true, // Google login ke waqt ise shuru mein false rakhna behtar hai
    },
    phone: {
      type: String,
      // required: true,
    },
    bio:{
      type:String
    },
    role: {
      type: String,
      enum: ["student","recruiter"],
      default: "student",
    },
    resume: {
      type: String, 
    },
    skills: {
      type: [String],
    },

    // --- CHANGE HERE: Experience ko Array banaya ---
    experience: {
     type:String
    },

    profilePhoto: {
        type: String,
        default: ""
    },
    resetOtp: {
        type: String,
    },
    resetOtpExpires: {
        type: Date,
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
export default User;