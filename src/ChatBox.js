import React, { useState } from "react";
import "./ChatBox.css";

function ChatBox({ conversation, onCommandSubmit, setConversation }) {
    const [command, setCommand] = useState(""); // State to store the command input

    const handleCommandChange = (e) => {
        setCommand(e.target.value); // Update the command state when the user types
    };

    const handleSubmit = () => {
        if (command.trim()) { // Check if the command is not empty
            const newConversation = [...conversation, { role: "user", content: command }];
            setConversation(newConversation); // Update the conversation state
            onCommandSubmit(command); // Pass the command to the parent component
            setCommand(""); // Clear the input field after submitting
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") { // Check if the pressed key is "Enter"
            handleSubmit();
        }
    };

    return (
        <div className="chatbox">
            <div className="chatbox-title">
                <img src="SC-logo.jpg" alt="Logo" className="chatbox-logo" /> {/* Add the logo here */}
                SmartClip
            </div>
            <div className="conversation">
                {conversation
                    .filter((message) => message.role !== "system")
                    .map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role === "user" ? "user" : "assistant"}`}
                        >
                            {message.content}
                        </div>
                    ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={command}
                    onChange={handleCommandChange}
                    onKeyDown={handleKeyDown} // Listen for the Enter key press
                    placeholder="Type a message..."
                />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
}

export default ChatBox;
