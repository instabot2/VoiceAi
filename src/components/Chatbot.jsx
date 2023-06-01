import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from "./Navbar";


const Chatbot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [memory, setMemory] = useState([]); // New state for memory
  const [isProcessing, setIsProcessing] = useState(false); // State for processing message

  //const [isListening, setIsListening] = useState(false);
  const conversationRef = useRef(null);

  const programmingKeywords = [
    "programming",
    "code",
    "coding",
    "program",
    "developer",
    "c",
    "java",
    "python",
    "html",
    "javascript",
    "react",
    "ruby",
    "php",
    "swift",
    "typescript",
    "sql",
    "go",
    "rust",
    "scala"
  ];

  
  const handleSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      if (listening) {
        recognitionRef.current.stop();
        setListening(false);
      } else {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => {
          setListening(true);
        };
        recognition.onresult = (event) => {
          const result = event.results[0][0].transcript;
          setInput(result);
          inputRef.current.value = result; // Set the value of the input field using the ref
        };
        recognition.onend = () => {
          if (listening) {
            recognition.start(); // Restart recognition if it was stopped unexpectedly
          }
        };
        recognitionRef.current = recognition;
        recognition.start();
      }
    } else {
      console.log('Speech recognition not supported in this browser.');
      alert('Speech recognition is not supported in this browser.');
    }
  };

  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get data from memory and concatenate with input
    const memoryData = memory.join(" ");
    //const inputWithMemory = `${memoryData} ${input}`;
    const inputWithMemory = `${input} ${memoryData}`;
    // Display alert with captured memory data
    //window.alert(`Captured Memory Data: ${inputWithMemory}`);

    if (input.toLowerCase() === "reset session") {
      handleResetMemory();
      setInput("");
      return;
    }

    setIsProcessing(true); // Show processing message

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
          const timeoutDuration = 100000;
          // Start the speech synthesis
          responsiveVoice.speak(botResponse.trim(), "US English Female", {
            onstart: function () {
              // Speech synthesis has started
              setTimeout(function () {
                // Stop the speech synthesis after the timeout duration
                //responsiveVoice.cancel();
                //alert("Speech synthesis timed out.");
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
        if ('speechSynthesis' in window) {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(botResponse);
          synth.speak(utterance); 
        } else {
          alert("Text-to-speech is not supported on this device.");
        }
      }

 
      setIsProcessing(false); // Hide processing message

      //handleNewMessage();

    } catch (error) {
      console.error(error);
      setIsProcessing(false); // Hide processing message
    }

    setInput("");
  };  

  const handleNewMessage = () => {
    const conversationContainer = conversationRef.current;
    //conversationContainer.scrollTop = conversationContainer.scrollHeight;
    conversationContainer.scrollTop = 0;
  };

  const inputRef = useRef(null);
  useEffect(() => {
    handleNewMessage();
    inputRef.current.focus();
    handleSpeechRecognition(); // Add this line to trigger speech recognition automatically
  }, [conversation]);


  
  const formatOutput = (item) => {
    if (programmingKeywords.some((keyword) => item.input.toLowerCase().includes(keyword.toLowerCase()))) {
      const highlightedCode = Prism.highlight(item.output, Prism.languages.javascript, 'javascript');
      return <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
    } else {
      return <pre>{item.output}</pre>;
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
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-700 border rounded focus:outline-none"
          />
              
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
          >
            Send
          </button>

          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            onClick={handleSpeechRecognition}
          >
            {listening ? 'Stop Listening' : 'Start Listening'}
          </button>


        </form>
      </div>
    </div>
  );
}

export default Chatbot;
