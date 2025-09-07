/**
 * Auth Routes - Bus Ticket Booking System
 *
 * Defines API endpoints for user authentication and account management.
 *
 * Routes:
 * - POST /register: Register a new user account.
 * - POST /login: Log in an existing user.
 * - POST /logout: Log out the current user.
 * - POST /send-verify-otp: Send account verification OTP (protected).
 * - POST /verify-account: Verify user account with OTP (protected).
 * - POST /is-auth: Check if user is authenticated (protected).
 * - POST /send-reset-otp: Send password reset OTP.
 * - POST /reset-password: Reset user password.
 *
 * Middleware:
 * - userAuth: Protects routes that require authentication.
 *
 * Usage:
 * Import and use this router in your Express app for authentication-related endpoints.
 */

import express from 'express';
import {
    login,
    register,
    logout,
    // sendVerificationOtp,
    verifyEmail,
    isAuthenticated, resetPassword, sendPasswordResetOtp
} from '../controllers/authController.js';
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
// authRouter.post('/send-verify-otp', userAuth, sendVerificationOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendPasswordResetOtp);
authRouter.post('/reset-password', resetPassword);




export default authRouter;
