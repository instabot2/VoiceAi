import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from "./Navbar";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [memory, setMemory] = useState([]); // New state for memory
  const conversationRef = useRef(null);
  const synth = useRef(window.speechSynthesis);
  const recognition = useRef(null);

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

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get data from memory and concatenate with input
    const memoryData = memory.join(" ");
    const inputWithMemory = `${memoryData} ${input}`;
    // Display alert with captured memory data
    window.alert(`Captured Memory Data: ${memoryData}`);

    if (input.toLowerCase() === "reset session") {
      handleResetMemory();
      setInput("");
      return;
    }

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

      setConversation([...conversation, { input, output }]);
      document.title = input;

      const utterance = new SpeechSynthesisUtterance(botResponse);
      speak(utterance);

      // Store output in memory
      setMemory(prevMemory => [...prevMemory, output]);
    } catch (error) {
      console.error(error);
    }

    setInput("");
  };

  const speak = (utterance) => {
    synth.current.cancel();
    synth.current.speak(utterance);
  };

  const handleResetMemory = () => {
    setMemory([]); // Reset memory by setting it to an empty array
  };

  useEffect(() => {
    if (conversationRef.current) {
      const conversationContainer = conversationRef.current;
      conversationContainer.scrollTop = conversationContainer.scrollHeight;
      // Scroll the conversation container to the bottom on window resize
      const handleResize = () => {
        conversationContainer.scrollTop = conversationContainer.scrollHeight;
      };
      window.addEventListener("resize", handleResize);
      // Cleanup the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [conversation]);

  useEffect(() => {
    if ('SpeechRecognition' in window) {
      recognition.current = new window.SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        setInput(transcript);
        recognition.current.stop();
      };

      recognition.current.onend = () => {
        recognition.current.stop();
      };

      recognition.current.onerror = (event) => {
        console.error(event.error);
      };
    }
  }, []);

  const formatOutput = (item) => {
    if (programmingKeywords.some((keyword) => item.input.toLowerCase().includes(keyword.toLowerCase()))) {
      const highlightedCode = Prism.highlight(item.output, Prism.languages.javascript, 'javascript');
      return <pre dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
    } else {
      return <pre>{item.output}</pre>;
    }
  };

  useEffect(() => {
    return () => {
      synth.current.cancel();
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar name="VoiceAi" logo="https://i.postimg.cc/K8sbZ1vM/5cb480cd5f1b6d3fbadece79.png" />

      <div className="flex-1 p-6 overflow-y-auto" style={{ width: "100%", maxWidth: "100vw" }}>
        <ul className="space-y-2" ref={conversationRef}>
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
                      {formatOutput(item)}
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
            type="text"
            placeholder="Ask something... or type 'reset session' to reset new chat."
            value={input}
            onChange={handleInput}
            className="flex-1 px-4 py-2 text-gray-700 border rounded focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => recognition.current.start()}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
          >
            Voice
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
