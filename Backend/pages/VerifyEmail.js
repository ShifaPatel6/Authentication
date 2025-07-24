const express = require('express');
const router = express.Router();
const User = require('../UserSchema')


router.post("/verify-otp", async (req, res) => {
       const { email, Otpverify } = req.body;

       const user = await User.findOne({ email });

       if (!user) {
              return res.status(404).json({ message: "User not found" });
       }

       if (
              user.otp !== parseInt(Otpverify) ||
              user.otpExpiry < new Date()
       ) {
              return res.status(400).json({ message: "Invalid or expired OTP" });
       }

       user.verify = true;
       user.otp = null;
       user.otpExpiry = null;
       await user.save();

       return res.json({ status: true, message: "OTP Verified Successfully" });

});



module.exports = router

