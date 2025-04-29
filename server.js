require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

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
    user: 'jarred59@ethereal.email',
    pass: 'uxxzjfTUDGTneMsd5d'
  }
});

// Submit contact form (only send email now)
app.post('/api/contacts', async (req, res) => {
  try {
    const { firstName, lastName, company, email, inquiry, message } = req.body;

    // Send email notification
    const mailOptions = {
      from: 'atharh1678@gmail.com', // Sender
      to: 'atharh1678@gmail.com',   // Receiver
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
      message: 'Email sent successfully!'
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
