import nodemailer from 'nodemailer';

const sendEmail = async ({ name, email, message }) => {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email provider settings here (e.g., SMTP, API key, etc.)
      // Refer to the Nodemailer documentation for more details
    });

    // Compose the email message
    const mailOptions = {
      from: 'your-email@example.com', // Sender address
      to: 'recipient@example.com', // Recipient address
      subject: 'New Contact Form Submission',
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'An error occurred while sending the email' };
  }
};

export default sendEmail;
