/**
 * User Model - Bus Ticket Booking System
 *
 * Defines the Mongoose schema and model for user accounts.
 *
 * Fields:
 * - name (String, required): User's full name.
 * - email (String, required, unique): User's email address.
 * - password (String, required): User's hashed password.
 * - verifyOtp (String, default: ''): OTP for account verification.
 * - verifyOtpExpireAt (Number, default: 0): Expiry timestamp for verification OTP.
 * - isAccountVerified (Boolean, default: false): Account verification status.
 * - resetOpt (String, default: ''): OTP for password reset.
 * - resetOptExpireAt (Number, default: 0): Expiry timestamp for reset OTP.
 *
 * Exports:
 * - User: Mongoose model for user operations.
 */

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name :{type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    verifyOtp: {type: String, default: ''},
    verifyOtpExpireAt: {type: Number, default: 0},
    isAccountVerified: {type: Boolean, default: false},
    resetOpt: {type: String, default: ''},
    resetOptExpireAt: {type: Number, default: 0},

})

const User = mongoose.model('User', userSchema)
export default User