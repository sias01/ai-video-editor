import React, { useState } from "react"
import "./ChatBox.css"

function ChatBox({ conversation, onCommandSubmit, setConversation }) {
  const [command, setCommand] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)

  const suggestions = ["Trim the first 10 seconds", "Add a watermark", "Convert to grayscale", "Increase brightness"]

  const handleCommandChange = (e) => {
    setCommand(e.target.value)
  }

  const handleSubmit = (message) => {
    const finalCommand = message || command
    if (finalCommand.trim()) {
      const newConversation = [...conversation, { role: "user", content: finalCommand }]
      setConversation(newConversation)
      onCommandSubmit(finalCommand)
      setCommand("")
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className="chatbox">
      <div className="chatbox-title">
        <div className="logo-container">
          <img src="SC-logo.jpg" alt="Logo" className="logo-image" />
        </div>
        <span>SmartClip</span>
      </div>
      <div className="conversation">
        {conversation
          .filter((message) => message.role !== "system")
          .map((message, index) => (
            <div key={index} className={`message ${message.role === "user" ? "user" : "assistant"}`}>
              {message.content}
            </div>
          ))}
      </div>
      {showSuggestions && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <button key={index} className="suggestion-button" onClick={() => handleSubmit(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      )}
      <div className="input-container">
        <input
          type="text"
          value={command}
          onChange={handleCommandChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={() => handleSubmit()}>Send</button>
      </div>
    </div>
  )
}

export default ChatBox
