"use client"

import React, { useState } from 'react'

interface Message {
    role: string;
    parts: { text: string }[];
}

const ChatBot = () => {
    const [userMessage, setUserMessage] = useState<string>("");
    const [history, setHistory] = useState<Message[]>([]); // Fixed typo

    const sendMessage = async () => {
        if (!userMessage.trim()) return; // Prevent empty messages

        const res = await fetch("/api/gemini", {
            method: "POST",
            body: JSON.stringify({ userMessage: userMessage.trim(), history }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data.response, data.history);
            setHistory(data.history); // Fixed typo
            setUserMessage(""); // Reset input correctly
        }
    };

    return (
        <div>
            <div>
                {history.map((msg, index) => (
                    <p className="text-white text-xl" key={index}>
                        {msg.role === "user" ? "You: " : "Bot: "}
                        {msg.parts[0].text}
                    </p>
                ))}
            </div>
            <input 
                type="text" 
                value={userMessage} 
                onChange={(e) => setUserMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatBot;
