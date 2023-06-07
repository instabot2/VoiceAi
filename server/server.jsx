import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your Gmail email address
      pass: 'your-password', // Replace with your Gmail password
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with the sender email address
    to: 'recipient@example.com', // Replace with the recipient email address
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
