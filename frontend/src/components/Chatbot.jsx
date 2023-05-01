import React, { useState } from "react";
import axios from "axios";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from "./Navbar";

const Chatbot = () => {

    const [input, setInput] = useState("");
    const [conversation, setConversation] = useState([]);

    const [previousResponse, setPreviousResponse] = useState("");

    const programmingKeywords = ["programming", "code", "coding", "program", "developer", "c", "java", "python", "html", "javascript", "react"];

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let botResponse = "";

        if (input.toLowerCase().startsWith("krishna")) {
            try {
                const response = await fetch("http://localhost:5001/chatbot", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        input,
                        messages: conversation,
                    }),
                });

                const { response: openaiResponse, messages: updatedMessages } = await response.json();
                setConversation(updatedMessages);
                botResponse = openaiResponse;
            } catch (error) {
                console.error(error);
            }
        } else {
            const options = {
                method: "POST",
                url: "https://chatgpt-api7.p.rapidapi.com/ask",
                headers: {
                    "content-type": "application/json",
                    "X-RapidAPI-Key": "9ec25d2accmsha2f4b9a8bf1feccp12fd72jsn7fa8b52e09eb",
                    "X-RapidAPI-Host": "chatgpt-api7.p.rapidapi.com",
                },
                data: `{"query":"${input}"}`,
            };

            try {
                const response = await axios.request(options);
                botResponse = response.data.response;

                if (previousResponse !== "" && programmingKeywords.some(keyword => input.toLowerCase().includes(keyword))) {
                    botResponse = `<code dangerouslySetInnerHTML={{ __html: Prism.highlight(previousResponse, Prism.languages.javascript, 'javascript') }} />`;
                }
            } catch (error) {
                console.error(error);
            }
        }

        setConversation([...conversation, { input, output: botResponse }]);
        document.title = input;

        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(botResponse);
        synth.speak(utterance);

        setInput("");
        setPreviousResponse(botResponse);
    };
    return (
        <>
            <div className="flex justify-center items-center mx-auto">
                <div className="w-11/12 border rounded ">
                    <div>
                        <div className="w-full">
                            <Navbar name="Shruti" logo="https://i.postimg.cc/vBd2MN55/5cb480cd5f1b6d3fbadece79.png" />
                            <div className="relative w-full p-6 h-[40rem]">
                                <ul className="space-y-2">
                                    {conversation && conversation.map((message, index) => (
                                        <li key={index} className={index % 2 === 0 ? "bg-gray-200 p-2 rounded-lg self-start" : "bg-green-200 p-2 rounded-lg self-end"}>
                                            <p className="text-gray-800">{message.input}</p>
                                            {typeof message.output === "string" ? (
                                                <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: message.output }} />
                                            ) : (
                                                message.output
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            className="w-full border rounded-l-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                            placeholder="Ask me anything..."
                                            value={input}
                                            onChange={handleInput}
                                        />
                                        <button
                                            type="submit"
                                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
                                            }
                                            export default Chatbot;