//import React from 'react'
//import Navbar1 from './Navbar1';
//import Footer from './Footer';
//import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar1 from './Navbar1';
import Footer from './Footer';
import { useState } from 'react';
import Fuse from 'https://cdn.skypack.dev/fuse.js';
const cheerio = require('cheerio');

const About = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const data = [
      { name: 'John Doe', role: 'Developer', description: 'Experienced web developer specializing in front-end development.', web: 'https://example.com/johndoe' },
      { name: 'Jane Smith', role: 'Designer', description: 'Creative UI/UX designer with a passion for user-centered design.', web: 'https://example.com/janesmith' },
      // Add more items to the data array
    ];

    if (!data.length) {
      console.log('Data array is empty');
      return;
    }
    //const searchQuery = 'developer'; // Modify this with your search query
    try {
      const fuse = new Fuse(data, { keys: ['name', 'role', 'description'] });
      const results = searchQuery ? fuse.search(searchQuery) : [];
      console.log('Search Query:', searchQuery);
      console.log('Search Results:', results);
      setSearchResults(results.map((result) => result.item));
      responsiveVoice.speak(`You searched for ${searchQuery}`);
    } catch (error) {
      console.error('An error occurred during search:', error);
      responsiveVoice.speak(`An error occurred during search: ${error}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <>
      <Navbar1 name="VoiceAi" logo="https://i.postimg.cc/K8sbZ1vM/5cb480cd5f1b6d3fbadece79.png" button5="Get Started" />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">

          <div className="container px-5 py-4 mx-auto">
            <div className="flex items-center justify-center space-x-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search..."
                  style={{ width: '60vw' }}
                  className="py-2 px-4 border border-gray-300 rounded h-full"
                />
                <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded h-full">
                  Search
                </button>
            </div>
          </div>
          
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-medium mb-4">Search Results</h2>
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-medium">{result.name}</h3>
                    <p className="text-gray-500">{result.role}</p>
                    <p>{result.description}</p>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
          
        </div>


        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">
              OUR TEAM
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We are a dynamic and creative team of professionals with a passion for innovation and a deep understanding of technology. With diverse backgrounds and expertise, we bring a unique perspective to each project we work on.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://i.postimg.cc/gjrFJS3m/images-1.jpg"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-white">
                    AI 1st Github
                  </h2>
                  <h3 className="text-gray-500 mb-3">Web Developer</h3>
                  <p className="mb-4 text-justify">
                    Passionate web developer with a love for web3.0, AI, and emerging technologies. I create stunning websites and custom web applications.
                  </p>
                  <span className="inline-flex">
                    <a className="text-gray-500" href=''>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500" href=''>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500" href=''>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/2">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src="https://i.postimg.cc/gjrFJS3m/images-1.jpg"
                />
                <div className="flex-grow sm:pl-8">
                  <h2 className="title-font font-medium text-lg text-white">
                    Ai 2nd GPT-3.5 Turbo
                  </h2>
                  <h3 className="text-gray-500 mb-3">Web Developer</h3>
                  <p className="mb-4 text-justify">
                    Talented web developer with a passion for the latest technologies. We create stunning websites and custom web applications that push the boundaries of what's possible.
                  </p>
                  <span className="inline-flex">
                    <a className="text-gray-500" href='https://www.linkedin.com/'>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500" href='https://twitter.com/'>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500" href='https://www.instagram.com/' target='_blank'>
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
