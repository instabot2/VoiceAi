import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar1 from './Navbar1';
import Footer from './Footer';

const Home = () => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://code.responsivevoice.org/responsivevoice.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://code.jquery.com/jquery-2.1.4.min.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    const voicelist = responsiveVoice.getVoices();
    const vselect = $("#voiceselection");
    $.each(voicelist, function () {
      vselect.append($("<option />").val(this.name).text(this.name));
    });
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleButtonClick = () => {
    responsiveVoice.speak(inputText, $('#voiceselection').val());
  };

  return (
    <>
      <Navbar1 logo="https://i.postimg.cc/K8sbZ1vM/5cb480cd5f1b6d3fbadece79.png" name="VoiceAi" button5="Get Started" />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="https://i.postimg.cc/mrM9k1ym/Article-Page-54.png"
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center  text-gray-600">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full"
                    src="https://i.postimg.cc/K8sbZ1vM/5cb480cd5f1b6d3fbadece79.png"
                  />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-white text-lg">
                    Voice.ai
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                  <p className="text-base text-gray-400">
                    "Unlocking knowledge with the power of language."
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="text-lg mb-4 text-justify">
                  A chatbot powered by the GPT-3.5 architecture. I am capable of communicating with you using natural language processing and machine learning algorithms.
                </p>
                <div>
                  <textarea
                    id="text"
                    cols="45"
                    rows="3"
                    value={inputText}
                    onChange={handleInputChange}
                    className="border border-gray-300 px-4 py-2 rounded-md mr-2"
                    placeholder="Enter your text"
                  ></textarea>
                  <select id="voiceselection"></select>
                  <input
                    onClick={handleButtonClick}
                    type="button"
                    value="Play"
                  />
                </div>
                <Link to="./Chatbot">
                  <button
                    type="button"
                    className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
