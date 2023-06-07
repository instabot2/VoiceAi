app.post('/api/send-email', (req, res) => {
  // Extract the name, email, and message from the request body
  const { name, email, message } = req.body;
  
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your Gmail email address
      pass: 'your-password', // Replace with your Gmail password
    },
  });

  // Create the email message
  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with the sender email address
    to: 'recipient@example.com', // Replace with the recipient email address
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email using Nodemailer
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

