import React from 'react'
import Navbar1 from './Navbar1'
import Footer from './Footer'

const config = require('./config.js');
const email = config.email;
const password = config.password;

const Contact = () => {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();

  // Create a transporter with your email provider settings
  const transporter = nodemailer.createTransport({
    service: 'your-email-service',
    auth: {
      user: email,
      pass: password,
    },
  });

  // Define the email message
  const mailOptions = {
    from: email,
    to: 'recipient@example.com',
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending the email:', error);
      setErrorMessage('An error occurred while sending the email.');
      setSuccessMessage('');
    } else {
      console.log('Email sent:', info.response);
      setSuccessMessage('Email sent successfully!');
      setErrorMessage('');
      setName('');
      setEmail('');
      setMessage('');
    }
  });
};

  
  
  return (
    <>
      <Navbar1 name="VoiceAi" logo="https://i.postimg.cc/K8sbZ1vM/5cb480cd5f1b6d3fbadece79.png" button5="Get Started" />
      <div className="py-4 lg:py-8 relative">
        <img
          src=""
          className="h-2/5 lg:h-full w-full lg:w-1/2 absolute inset-0 object-cover object-center xl:block hidden"
          alt="map"
        />
        <div className="xl:mx-auto xl:container relative">
          <div className="flex flex-wrap xl:mx-auto xl:container">
            <div className="w-full relative lg:w-1/2 xl:mt-10 mb-10 2xl:pr-24 2xl:pl-0 xl:pl-12 pl-0">
              <img
                src=""
                className="h-full w-full xl:w-1/2 absolute inset-0 bg-cover bg-center xl:hidden"
                alt="map"
              />
              <div className="w-full flex flex-col items-start xl:justify-start relative z-20 xl:px-0 px-4 xl:py-0 py-4">
                <div className="w-full 2xl:pl-48 xl:pt-1">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-gray-800">
                    We’re Here
                  </h1>
                  <div className="w-full md:w-10/12 mt-3">
                    <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider">
                      We believe digital innovation is at the heart of every
                      business success
                    </h2>
                    <div className="mt-4 md:mt-8">
                      <h2 className="text-sm md:text-base text-indigo-700 font-semibold">
                        Address
                      </h2>
                      <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                        Shah Alam, Selangor Malaysia
                      </h2>
                    </div>
                    <div className="mt-4 md:mt-8">
                      <h2 className="text-sm md:text-base text-indigo-700 font-semibold">
                        Contact
                      </h2>
                      <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                        +60 192393364(Whatsapp)
                      </h2>
                    </div>
                    <div className="mt-4 md:mt-8">
                      <h2 className="text-sm md:text-base text-indigo-700 font-semibold">
                        Email
                      </h2>
                      <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                        <a href="mailto: instabot2.0@gmail.com" target="_blank">
                          instabot2.0@gmail.com
                        </a>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="w-full lg:w-1/2 xl:pt-10 lg:pl-24">
              <div className="flex flex-col items-start xl:justify-start 2xl:justify-end xl:px-0 px-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-indigo-700">
                  Let’s Talk
                </h1>
                <div className="w-full 2xl:w-8/12 mt-3" role="form">
                  <h2 className="text-gray-800 dark:text-white text-base md:text-lg leading-8 tracking-wider">
                    For enquiries, please email us using the form below
                  </h2>
                  <div className="mt-4 md:mt-8">
                    <p className="text-gray-800 dark:text-white text-base font-medium">
                      Name
                    </p>
  
                    <input
                      className="mt-3 text-base dark:bg-gray-800 border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800 dark:text-white"
                      type="text"
                      placeholder="Justin Timberlake"
                      aria-label="enter your name input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                        
                  </div>
                  <div className="mt-4 md:mt-8">
                    <p className="text-gray-800 dark:text-white text-base font-medium">
                      Email Address
                    </p>

                    <input
                      className="mt-3 text-base dark:bg-gray-800 border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800 dark:text-white"
                      type="email"
                      placeholder="example@mail.com"
                      aria-label="enter your email input"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                        
                  </div>
                  <div className="mt-4 md:mt-8">
                    <p className="text-gray-800 dark:text-white text-base font-medium">
                      Message
                    </p>

                    <textarea
                      className="mt-3 text-base dark:bg-gray-800 border-2 w-11/12 lg:w-full xl:w-10/12 resize-none hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black xl:h-40 py-5 pl-4 text-gray-800 dark:text-white"
                      type="text"
                      placeholder="Write us something..."
                      aria-label="enter your message input"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                        
                  </div>
                  <div className="py-5">

                    <button
                      className="py-3 md:py-5 dark:bg-white dark:text-gray-800 px-5 md:px-10 bg-gray-900 text-white hover:opacity-90 ease-in duration-150 text-sm md:text-lg tracking-wider font-semibold focus:border-4 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
  </>
  )
}

export default Contact;
