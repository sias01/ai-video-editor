import React, { useState } from "react";

function ChatBox({ onCommandSubmit }) {
    const [command, setCommand] = useState(""); // State to store the command input

    const handleCommandChange = (e) => {
        setCommand(e.target.value); // Update the command state when the user types
    };

    const handleSubmit = () => {
        if (command.trim()) { // Check if the command is not empty
            onCommandSubmit(command); // Pass the command to the parent component
            setCommand(""); // Clear the input field after submitting
        }
    };

    return (
        <div className="chatbox">
            <textarea
                value={command}
                onChange={handleCommandChange}
                placeholder="Enter FFmpeg command..."
                rows="4"
                cols="50"
                style={{ resize: "none" }} // Optional: Prevent resizing of the textarea
            />
            <br />
            <button onClick={handleSubmit}>Submit Command</button>
        </div>
    );
}

export default ChatBox;
