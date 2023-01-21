const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Register User

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be up to 6 characters');
  }

  // Check if use email already exixts
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email has already been registered');
  }

  // Create new User

  const user = await User.create({ name, email, password });

  // Generate Token
  const token = generateToken(user._id);

  // Send Http-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
  });

  if (user) {
    const { name, email, _id, photo, phone, bio } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate Request
  if (!email || !password) {
    res.status(400);
    throw new Error('Please add email and password');
  }

  // Check if user exits
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User not found, please signup ');
  }

  // User Exists, check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate Token
  const token = generateToken(user._id);

  // Send Http-only cookie
  if (passwordIsCorrect) {
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
    });
  }

  if (user && passwordIsCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Logout User

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({
    message: 'Successfully Logged Out',
  });
});

// Get User Details
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, _id, photo, phone, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
    });
  } else {
    res.status(400);
    throw new Error('User Not Found');
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(false);
  }

  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }

  return res.json(false);
});

// Update User Profile
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, bio, phone, photo, email } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.bio = req.body.bio || bio;
    user.phone = req.body.phone || phone;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      bio: updatedUser.bio,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
};
