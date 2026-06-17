/*
 * =============================================================
 * VEDANT KHALSHINGE — AUTHENTICATION APP
 * Copyright (c) 2026 Vedant Khalshinge. All Rights Reserved.
 * Unauthorized copying or distribution is strictly prohibited.
 * =============================================================
 */

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match your frontend URL if different
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
