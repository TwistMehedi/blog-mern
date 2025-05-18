import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { generateToken } from "./../utils/generateToken.js";
import { deleteImage, uploadMedia } from "../utils/cloudinay.js";
import mongoose from "mongoose";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const token = jwt.sign(
      { name, email, password: hashedPassword },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

    // console.log("token number 1", token);

    // ✅ Fixes Here
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // ✅ correct spelling
      port: 587, // ✅ common port for TLS
      secure: false, // false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Blog web application - Verify Your Email",
      html: `
        <h1>Verify Your Email</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${process.env.FRONTEND_URL}/verify?token=${token}" target="_blank">Verify Email</a>
      `,
    });

    return res
      .status(200)
      .json({ message: "Verification email sent", success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Internal server registration error ${error}`,
      success: false,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    // console.log("token number 2", token);
    if (!token) {
      return res.status(400).json({ message: "Missing token", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { name, email, password } = decoded;
    //  console.log(decoded);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already verified", success: false });
    };
     

    const user = await User.create({ name, email, password, isVerified: true });
    if (!user) {
      return res.status(401).json({
        message: "User creation problrm",
        success: false,
      });
    };


    if (user) {
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
    };


    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Email verified & user registered",
        success: true,
        user,
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: `Internal server registration error ${error}`,
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        message: `Something is missing`,
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: `Email and password not match`,
        success: false,
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userWithPassword = await User.findOne({ email }).select("-password");

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        user: userWithPassword,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal server login error ${error}`,
      success: false,
    });
  }
};

export const logOut = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server login error ${error}`,
      success: false,
    });
  }
};

export const profile = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Welcome your profile",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal server single user get error ${error}`,
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    if (!name) {
      return res.status(404).json({
        message: "Name not found",
      });
    }
    const userId = req.id;

    const user = await User.findById(userId);

    if (file) {
      if (user.image && user.image.public_id) {
        await deleteImage(user.image.public_id);
      }
    }

    if (name) user.name = name;

    const cloudResponse = await uploadMedia(file.path);

    user.image = {
      public_id: cloudResponse.public_id,
      url: cloudResponse.secure_url,
    };

    const updateData = await user.save();

    res.status(200).json({
      message: "User update successfully",
      success: true,
      updateData,
    });
  } catch (error) {
    res.status(404).json({
      message: "Internal user user update error",
      success: false,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server all user get user",
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        message: "Invalid user id",
        success: false,
      });
    }

    await Post.deleteMany({ user: userId });
    await Comment.deleteMany({ user: userId });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error while deleting user: ${error.message}`,
      success: false,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User with this email does not exist",
        success: false,
      });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "10m" });
 
    existingUser.resetPasswordToken = token;
    existingUser.resetPasswordTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    await existingUser.save();
 
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - Blogify",
      html: `
        <h1>Reset Your Password</h1>
        <p>Click the link below to reset your password. The link will expire in 10 minutes:</p>
        <a href="${process.env.FRONTEND_URL}/forgot-password?token=${token}" target="_blank">Reset Password</a>
      `,
    };

 
    await transporter.sendMail(mailOptions);

   
    return res.status(200).json({
      message: "Password reset email sent successfully",
      success: true,
      token
    });

  } catch (error) {
    console.error("Forgot password error:", error.message);
    return res.status(500).json({
      message: "Internal server error: " + error.message,
      success: false,
    });
  }
};

export const resetPassword = async(req, res)=>{
   try {
    const {token} = req.query;
  const {newPassword, confirmPassword} = req.body;
  if(!token || !newPassword || !confirmPassword){
    return res.status(404).json({
      message:"Token or password fields are missing",
      success: false,
    })
  };

   if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
        success: false,
      });
    };

  const user = await User.findOne({resetPasswordToken:token, resetPasswordTokenExpiresAt: { $gt: Date.now()},});
  if(!user){
    return res.status(404).json({
      message:"Invalid or expired token.",
      success: false
    })
  };

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined,
  user.resetPasswordTokenExpiresAt = undefined

  await user.save();
  return res.status(200).json({ message: "Password updated", success: true });

   } catch (error) {
    console.error(error.message)
    return res.status(500).json({
      message:"Internal server update password error",
      error:error.message,
      success: false
    })
   };
};