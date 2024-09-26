const User = require('../database/model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const otpCache = new NodeCache({ stdTTL: 180 }); // 180 seconds

// Login 
exports.login = async (req, res) => {
  try {
    // Get all data
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password' });
    }

    // Find the user
    const user = await User.findOne({ userEmail:email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found!' });
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid Password!' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in cache with the email as the key
    otpCache.set(email, otp);

    // Send OTP email
    await sendOtpEmail(user.userEmail, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent to email',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log(email, otp);

    // Validate input
    if (!otp) {
      return res.status(400).json({ success: false, message: 'Please provide the OTP' });
    }

    // Find the user
    const user = await User.findOne({ userEmail:email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found!' });
    }

    // Get OTP from cache
    const cachedOtp = otpCache.get(email);
    console.log(`Cached OTP: ${cachedOtp}, Provided OTP: ${otp}`);

    // Check if OTP matches and is not expired
    if (cachedOtp && cachedOtp === otp) {
      // Create JWT token with user ID and organizationId
      const token = jwt.sign(
        {
          id: user._id,
          organizationId: user.organizationId,
          userName: user.userName, 
        },
        process.env.JWT_SECRET, // JWT secret from environment variables
        { expiresIn: '12h' }
      );

      // Remove sensitive data from response
      user.password = undefined;

      // Send response with user data (excluding organizationId)
      res.status(200).json({
        success: true,
        token: `Bearer ${token}`, // Prepend "Bearer " to the token
        user: {
          id: user._id,
          email: user.userEmail,
          userName: user.userName,
          role: user.role,
        },
      });

      // Invalidate the OTP after successful verification
      otpCache.del(email);
    } else {
      res.status(401).json({ success: false, message: 'Invalid or expired OTP!' });
    }
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};






// Nodemailer transporter setup using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Function to send OTP email
const sendOtpEmail = (email, otp) => {
  const mailOptions = {
    from: `"BillBizz" <${process.env.EMAIL}>`,
    to: email,
    subject: 'BillBizz Software OTP',
    text: `Hey there,

Your One-Time Password (OTP) is: ${otp}

This code is valid for 2 minutes. Please use it promptly to ensure secure access.

Thanks for using our service!

Cheers,

BillBizz`,
  };

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
      return false;
    } else {
      console.log('Email sent:', info.response);
      return true;
    }
  });
};