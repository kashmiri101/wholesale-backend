require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { connection } = require('./db');
const Inquiry =require('./Inquiry')

// adjust path if needed
const PORT = process.env.PORT || 3001;

// Make sure `db.js` is in the same directory as server.js

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this based on where your frontend is hosted
    methods: 'GET,POST'
  }));
app.use(bodyParser.json());

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'melany.lindgren@ethereal.email',
    pass: 'rPmGBHw2mrVZjCVe9Z'
  }
});

// Submit contact form (only send email now)
app.post('/api/contacts', async (req, res) => {
  try {
    const { firstName, lastName, company, email, inquiry, message } = req.body;

    // Save to PostgreSQL
    const newInquiry = await Inquiry.create({
      first_name: firstName,
      last_name: lastName,
      company,
      email,
      inquiry,
      message,
      created_at: new Date() // if not automatically handled
    });

    // After successful save, send email
    const mailOptions = {
      from: 'atharh1678@gmail.com',
      to: 'atharh1678@gmail.com',
      subject: `New Contact Form Submission: ${inquiry}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Inquiry Type:</strong> ${inquiry}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: 'Data saved and email sent successfully!',
      data: newInquiry
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'production'
        ? 'Server error'
        : err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
connection();
