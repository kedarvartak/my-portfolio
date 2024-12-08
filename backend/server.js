const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');
const corsOptions = require('./config/cors');

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Store codes temporarily (in production, use Redis or a database)
const verificationCodes = new Map();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password
  }
});

// Generate random 6-digit code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Add MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Add article routes
app.post('/api/articles', async (req, res) => {
  try {
    console.log('Received article data:', req.body); // Debug log
    const article = new Article(req.body);
    console.log('Created article model:', article); // Debug log
    await article.save();
    console.log('Article saved successfully'); // Debug log
    res.status(201).json({ success: true, article });
  } catch (error) {
    console.error('Server error:', error); // Debug log
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ success: true, articles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, article });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Send code endpoint
app.post('/api/send-code', async (req, res) => {
  const { email } = req.body;
  
  // Check if email matches the allowed admin email
  if (email !== 'kedar.vartak22@vit.edu') {
    return res.status(400).json({ 
      success: false, 
      message: 'Unauthorized email address' 
    });
  }

  try {
    // Generate new code
    const code = generateCode();
    
    // Store code with 5-minute expiration
    verificationCodes.set(email, {
      code,
      expires: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Panel Login Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Admin Panel Login Verification</h2>
          <p style="color: #666; font-size: 16px;">Your verification code is:</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="color: #333; letter-spacing: 5px; font-size: 32px;">${code}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Verification code sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send verification code' 
    });
  }
});

// Verify code endpoint
app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;

  const storedData = verificationCodes.get(email);

  if (!storedData) {
    return res.status(400).json({ 
      success: false, 
      message: 'No verification code found' 
    });
  }

  if (Date.now() > storedData.expires) {
    verificationCodes.delete(email);
    return res.status(400).json({ 
      success: false, 
      message: 'Verification code expired' 
    });
  }

  if (storedData.code !== code) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid verification code' 
    });
  }

  // Clean up used code
  verificationCodes.delete(email);

  res.json({ success: true, message: 'Code verified successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 