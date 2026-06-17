const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser, findUserById } = require('../models/userModel');
const { SECRET_KEY } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, {
    expiresIn: '1h'
  });
};

const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    const userExists = findUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ success: false, message: 'User with this email already exists.' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      id: Date.now().toString(),
      fullName,
      email,
      password: hashedPassword
    };

    createUser(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.'
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logout successful.'
  });
};

const getProfile = (req, res) => {
  // req.user is set by the protect middleware
  const user = findUserById(req.user.id);
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.status(200).json({
    success: true,
    message: 'Profile retrieved.',
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email
    }
  });
};

const getDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Dashboard data retrieved.',
    data: {
      stats: { logins: 42, activeSessions: 1 },
      recentActivity: ['Logged in securely', 'Viewed protected route']
    }
  });
};

module.exports = {
  signup,
  login,
  logout,
  getProfile,
  getDashboard
};
