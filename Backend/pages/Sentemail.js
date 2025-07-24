const express = require('express');
const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require('../UserSchema')


const router = express.Router();




router.post('/otp-sent', async (req, res) => {
       console.log("OTP endpoint hit");

       const { email } = req.body;
       if (!email) return res.status(400).json({ status: false, message: "Email required" });

       const user = await User.findOne({ email });

       if (!user) {
              return res.status(404).json({ message: "User not found" });
       }
       const otp = Math.floor(1000 + Math.random() * 9000);
       const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
       user.otp = otp;
       user.otpExpiry = expiry;
       await user.save();
       let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                     user: process.env.EMAIL_USER,
                     pass: process.env.EMAIL_PASS,
              },
       }
       );

       let mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: "Your OTP for Verification",
              text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
       };

       try {
              await transporter.sendMail(mailOptions);
              return res.json({ status: true, message: "OTP sent", otp }); // Remove OTP in prod
       } catch (err) {
              return res.status(500).json({ status: false, message: "Failed to send OTP , Please enter Valid email address" });
       }

});



module.exports = router;
