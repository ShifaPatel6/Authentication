const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
       email: { type: String, required: true },
       otp: { type: String, required: true },
       // expiresAt: { type: Date, required: true },
       isVerified: { type: Boolean, default: false },
       // createdAt: { type: Date, default: Date.now },
});

const OtpModel = mongoose.model("Otp", otpSchema);

module.exports = OtpModel;
