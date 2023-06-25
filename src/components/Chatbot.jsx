import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from "./Navbar";
import microphoneImage from '/microphone-solid-24.png';
import microphoneOffImage from '/microphone-off-solid-24.png';
import sendImage from '/send-solid-24.png';



const Chatbot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [memory, setMemory] = useState([]); // New state for memory
  const [isProcessing, setIsProcessing] = useState(false); // State for processing message
  const conversationRef = useRef(null);
  const inputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasSentWelcomeMessage, setHasSentWelcomeMessage] = useState(false);
  
 
  useEffect(() => {
    handleNewMessage();
    inputRef.current.focus();
    // On component load, send the welcome message if it hasn't been sent already
    if (!hasSentWelcomeMessage) {
      sendWelcomeMessage();
    }
  }, [conversation, hasSentWelcomeMessage]);
  
  
  useEffect(() => {
    if (inputRef.current && window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInput(transcript);
      };
      recognition.onend = () => {
        setInput("");
      };
      recognition.start();
      return () => {
        recognition.stop();
      };
    }
  }, []);

  
  const microphonePermission = () => {
    const [microphonePermission, setMicrophonePermission] = useState();
    useEffect(() => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setMicrophonePermission(true);
        })
        .catch(error => {
          setMicrophonePermission(false);
        });
    }, []);
    return microphonePermission;
  }
  
  const sendWelcomeMessage = async () => {
    setIsProcessing(true);
    const options = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "1825e65d0bmsh424a5ef12353dc4p1f84d8jsn208df257599c",
        "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
      },
      data: {
        query: "Introduce yourself",
      },
    };

    try {
      const response = await axios.request(options);
      const { response: botResponse } = response.data;
      // Speak the AI response
      responsiveVoice.speak(botResponse);
      setIsProcessing(false);
      setHasSentWelcomeMessage(true);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };
  
  const programmingKeywords = [
    "programming","code","coding","program","developer","c","java","python","html","javascript","react","ruby",
    "php","swift","typescript","sql","go","rust","scala"
  ];

  const errorHandler = (errorMessage) => {
    responsiveVoice.speak("AI response: " + errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input) {
      // Stop execution if input is empty
      //window.alert(`Input empty?`);
      errorHandler("Input is empty!");
      return;
    }
  
    // Get data from memory and concatenate with input
    //const memoryData = memory.join(" ");
    const memoryData = memory.join(" ").trim();
    let inputWithMemory = input.trim();
    //const inputWithMemory = `${memoryData} ${input}`;
    //const inputWithMemory = `${input} ${memoryData}`;
    //const inputWithMemory = `${input ? input + ' ' : ''}${memoryData}`;
    //window.alert(`Captured Memory Data: ${inputWithMemory}`);
    //let inputWithMemory = input;
    // Check if input contains programming keywords
    const containsProgrammingKeyword = programmingKeywords.some(keyword => input.toLowerCase().includes(keyword));
    if (containsProgrammingKeyword) {
      inputWithMemory += ` ${memoryData}`;
    }

    if (input.toLowerCase() === "reset session") {
      handleResetMemory();
      setInput("");
      return;
    }

    setIsProcessing(true); // Show processing message

    
    let speechTimeoutId; // Variable to hold the timeout ID
    const timeoutDuration = 20000; // Duration in milliseconds

    const resetOptions = {
      method: "POST",
      url: "https://chatgpt-api8.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "1825e65d0bmsh424a5ef12353dc4p1f84d8jsn208df257599c",
        "X-RapidAPI-Host": "chatgpt-api8.p.rapidapi.com",
      },
      data: `{"query":"reset"}`,
    };
  
    const options = {
      method: "POST",
      url: "https://chatgpt-api7.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "9ec25d2accmsha2f4b9a8bf1feccp12fd72jsn7fa8b52e09eb",
        "X-RapidAPI-Host": "chatgpt-api7.p.rapidapi.com",
      },
      data: `{"query":"${inputWithMemory}"}`,
    };


    try {
      //fix bugs axios error 400
      
      const response = await axios.request(options);
      const { conversation_id, response: botResponse } = response.data;
      const containsProgrammingKeyword = programmingKeywords.some(keyword => input.toLowerCase().includes(keyword));
      const output = containsProgrammingKeyword ? `${botResponse}` : botResponse;

      setMemory(prevMemory => [...prevMemory, output]);

      //setConversation([...conversation, { input, output }]);
      setConversation([{ input, output }, ...conversation])
      document.title = input;
      
      handleNewMessage();
      
      
      function isMobile() {
        // Check if the user agent contains "Android" or "iPhone" or "iPad"
        return /Android|iPhone|iPad/i.test(navigator.userAgent);
      }
      
      const timeoutDuration = 100000;
      let speechTimeoutId; // Declare the variable for the timeout ID

      //const botResponse = conversation[conversation.length - 1]?.output;
      if (isMobile()) {
        // Mobile device (Android or iPhone/iPad)
        responsiveVoice.enableEstimationTimeout = false;
        if (botResponse) {
          //const audio = new Audio(
          //  `http://api.voicerss.org/?key=4c61b6d8a10143b6ba750516b0062b25&hl=en-us&c=MP3&f=16khz_16bit_stereo&src=${encodeURIComponent(
          //    botResponse
          //  )}`
          //);
          //audio.play();
          
          //this is the library <script src="https://code.responsivevoice.org/responsivevoice.js?key=EEoD2YI1"></script>
          responsiveVoice.speak(botResponse.trim(), "US English Female");
          //responsiveVoice.speak("hello world","US English Female");
          // Start the speech synthesis
          responsiveVoice.speak(botResponse.trim(), "US English Female", {
            onstart: function () {
              // Speech synthesis has started - fix bugs
              speechTimeoutId = setTimeout(function () {
                // Stop the speech synthesis after the timeout duration
                responsiveVoice.cancel();
                // alert("Speech synthesis timed out.");
              }, timeoutDuration);
            },
            onend: function () {
              // Speech synthesis has ended
              // Cancel the timeout if the synthesis completes before the timeout duration
              clearTimeout(timeoutId);
            },
          });
        }
      } else {
        // Other platforms
        //const detectedLanguage = langdetect.detect(botResponse);
        //console.log(detectedLanguage); // Output: 'en' for English
        //const LanguageDetect = require('language-detect');

        if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(botResponse);     
        
          // Set the language of the utterance based on the detected language
          //utterance.lang = detectedLanguage;

          // Set up the onend event handler - fix bugs
          utterance.onend = function() {
            clearTimeout(speechTimeoutId); // Clear the timeout when speech synthesis ends
            console.log("Speech synthesis has ended");
            // Perform any desired actions here
          };
          
          synth.speak(utterance);
          
          //fix bugs,  Set the timeout to cancel speech synthesis if it exceeds the duration
          speechTimeoutId = setTimeout(function () {
            // Stop the speech synthesis after the timeout duration
            synth.cancel();
            // alert("Speech synthesis timed out.");
          }, timeoutDuration);
      
        } else {
          //alert("Text-to-speech is not supported on this device.");
          errorHandler("Text-to-speech is not supported on this device.");
        }
      }
      
      setIsProcessing(false); // Hide processing message

      //handleNewMessage();

    } catch (error) {
      
      if (error.response && error.response.status === 400) {
        console.log('Error 400: Bad Request');
        // Handle the 400 error here    
        try {
            await axios.request(resetOptions);
            console.log('Reset request successful');
            responsiveVoice.speak("Error 400: Bad Request, Successful reset!", "US English Female"); 
          } catch (resetError) {
            console.error('Reset request failed:', resetError);
            errorHandler(resetError);
          }
          responsiveVoice.speak("Processing halt! Refresh it", "US English Female");
          return; // Halt execution 
        }

      console.error(error);
      setIsProcessing(false); // Hide processing message
      // Call the errorHandler function with the error object
      errorHandler(error);
    }

    setInput("");
  };  
  
  const handleVoiceCapture = () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInput(transcript);
      };
      recognition.onerror = (event) => { 
        const errorMessage = "Voice capture error: " + event.error;
        console.error(errorMessage);
        errorHandler(errorMessage);       
      };
      recognition.start();
    } catch (error) {
      //console.error("Voice capture initialization error:", error);
      //alert("Voice capture initialization error: " + error.message);      
      const errorMessage = "Voice capture initialization error: " + error.message;
      console.error(errorMessage);
      errorHandler(errorMessage);
    }
  };

  
  const handleNewMessage = () => {
    const conversationContainer = conversationRef.current;
    //conversationContainer.scrollTop = conversationContainer.scrollHeight;
    conversationContainer.scrollTop = 0;
  };


  const formatOutput = (item) => {
    if (item && item.input && item.output && programmingKeywords.some((keyword) => item.input.toLowerCase().includes(keyword.toLowerCase()))) {
      const highlightedCode = Prism.highlight(item.output, Prism.languages.javascript, 'javascript');
      return <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
    } else if (item && item.output) {
      return <pre>{item.output}</pre>;
    } else {
      const errorMessage = "Output is undefined or missing.";
      errorHandler(errorMessage);
      return null; // Return appropriate JSX or handle the case when result is undefined
    }
  };

  const handleResetMemory = () => {
    setMemory([]);
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar name="VoiceAi" logo="https://i.postimg.cc/K8sbZ1vM/5cb480cd5f1b6d3fbadece79.png" />

      <div className="sticky top-0 z-10">
        {isProcessing && (
          <div className="flex justify-end pr-4"> {/* Add pr-4 for right padding */}
            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-transparent rounded shadow-none overflow-y-auto max-h-full w-auto">
              <div className="block text-justify">
                <div className="whitespace-pre-wrap break-words">
                  Ai processing...
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 overflow-y-auto" ref={conversationRef} style={{ width: "100%", maxWidth: "100vw" }}>
        <ul className="space-y-2">
          {conversation.map((item, index) => (
            <React.Fragment key={index}>
              <li className="flex justify-start">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                  <span className="block">{item.input}</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow overflow-y-auto max-h-full w-auto">
                  <div className="block text-justify">
                    <div className="whitespace-pre-wrap break-words">
                      {item.output}
                    </div>
                  </div>                    
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>

      </div>

      <div className="sticky bottom-0 z-10 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center">
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask something... or type 'reset session' to reset new chat."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 border rounded focus:outline-none"
          />    
    
          <button
            type="submit"
            className="flex items-center px-2 py-1 ml-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
          >
            <img src={sendImage} alt="Send" className="mr-2" style={{ alignSelf: "center" }} />
          </button>

          <button
            type="button"
            onClick={handleVoiceCapture}
            className="px-2 py-1 ml-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
          >
            {isRecording ? (
              <img src={microphoneOffImage} alt="Stop Voice" className="mr-2" />
            ) : (
              <img src={microphoneImage} alt="Start Voice" className="mr-2" />
            )}
          </button>

          {!microphonePermission && (
            <div className="sticky top-0 z-10 bg-red-500 text-white text-center py-2">
              Please grant microphone permissions to use voice input.
            </div>
          )}


        </form>
      </div>
    </div>
  );
}

export default Chatbot;
