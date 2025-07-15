/**
 * Authentication Controller - Bus Ticket Booking System
 *
 * Handles user registration, login, and logout using JWT and secure HTTP-only cookies.
 * Also sends a verification email upon successful registration.
 *
 * Functions:
 *
 * - register(req, res):
 *   Registers a new user. Validates input, checks for existing user, hashes password, saves user,
 *   generates JWT token, sets it in a secure HTTP-only cookie, and sends a verification email.
 *   Responds with success or error message.
 *
 * - login(req, res):
 *   Authenticates a user. Validates input, checks user existence, verifies password, generates JWT token,
 *   and sets it in a secure HTTP-only cookie. Responds with success or error message.
 *
 * - logout(req, res):
 *   Logs out the user by clearing the authentication cookie. Responds with success or error message.
 *
 * Security:
 * - Passwords are hashed using bcrypt before storage.
 * - JWT tokens are signed and set to expire in 7 days.
 * - Cookies are set as httpOnly and secure in production, with proper sameSite settings.
 * - Verification email is sent using nodemailer after registration.
 *
 * Usage:
 * Import and use these controller functions in your Express routes for authentication endpoints.
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import transport from "../config/nodeMailer.js";

export const register = async (req, res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.json({
            success: false,
            message: "Please provide all fields"
        })
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

        });
        //send verification email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Account Verification',
            text: `Welcome to Bus Booking Website, Your account has been created with email id: ${email}`
        }

        // Attempt to send verification email and log result or error for debugging
        try {
            const info = await transport.sendMail(mailOptions);
            console.log('Email sent successfully:', info);
        } catch (mailError) {
            console.error('Error sending verification email:', mailError);
        }

        // Send success response
        return res.json({
            success: true,
            message: "User registered successfully",
        })

        }catch(error){
        res.json({
            success: false,
            message: "Error occurred while registering user",
            error: error.message
        });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({
            success: false,
            message: "Please provide all fields"
        });
    }
    try {
        // Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Email"
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Error occurred while logging in",
            error: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
        return res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Error occurred while logging out",
            error: error.message
        });
    }
}

//user email verification
export const sendVerificationOtp = async (req, res) => {
    try {
        // Use authenticated userId from middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" });
        }
        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000;
        await user.save();
        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your verification OTP is ${otp}. It is valid until ${new Date(user.verifyOtpExpireAt).toLocaleString()}.`
        };
        await transport.sendMail(mailOptions);
        res.json({ success: true, message: "Verification OTP sent successfully on email" });
    } catch (error) {
        res.json({ success: false, message: "Error occurred while sending verification OTP." });
    }
}

export const verifyEmail = async (req, res) => {
    // Use authenticated userId from middleware
    const userId = req.user?.id;
    const { otp } = req.body;
    if (!userId || !otp) {
        return res.json({ success: false, message: "Missing Details" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP expired" });
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error occurred while verifying email." });
    }
}

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.json({ success: false, message: "User not authenticated" });
        }
        return res.json({ success: true, message: "User is authenticated", userId });
    } catch (error) {
        return res.json({ success: false, message: "Internal Server Error" });
    }
}

// send password reset OTP
export const sendPasswordResetOtp = async (req, res) => {
    // Validate request body
    const {email} = req.body;

    // Check if email is provided
    if (!email) {
        return res.json({
            success: false,
            message: "Email is required"
        });
    }
    try {
        // Check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOpt = otp;
        user.resetOptExpireAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your password reset OTP is ${otp}. It is valid until ${new Date(user.resetOptExpireAt).toLocaleString()}.`
        };
        await transport.sendMail(mailOptions);
        return res.json({
            success: true,
            message: "Password reset OTP sent successfully on email"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: "Error occurred while sending password reset OTP",
            error: error.message
        });
    }
}

//user verify password reset OTP
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({
            success: false,
            message: "Please provide all fields"
        });
    }
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        if (user.resetOpt === '' || user.resetOpt !== otp) {
            return res.json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if( user.resetOptExpireAt < Date.now()) {
            return res.json({
                success: false,
                message: "OTP expired"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOpt = '';
        user.resetOptExpireAt = 0;
        await user.save();
        return res.json({
            success: true,
            message: "Password reset successfully"
        });

    }catch(error){
        return res.json({
            success: false,
            message: "Error occurred while resetting password",
            error: error.message
        });
    }
}