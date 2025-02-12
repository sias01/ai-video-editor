import React, { useState, useEffect } from "react"
import VideoPlayer from "./VideoPlayer"
import ChatBox from "./ChatBox"
import { FileUploader } from "react-drag-drop-files"
import { Upload } from "lucide-react"
import "./style.css"

const fileTypes = ["MP4", "MOV", "AVI"] // Define the allowed file types

function App() {
  const [videoPath, setVideoPath] = useState("")
  const [previewPath, setPreviewPath] = useState("")
  const [outputMessage, setOutputMessage] = useState("") // State for feedback messages
  const [statusMessage, setStatusMessage] = useState("") // State for status messages
  const [conversation, setConversation] = useState([]) // Initial conversation
  const [isModalVisible, setIsModalVisible] = useState(false) // State for modal visibility

  useEffect(() => {
    if (outputMessage) {
      const timer = setTimeout(() => {
        setOutputMessage("")
        setIsModalVisible(false)
      }, 5000) // Hide the popup after 5 seconds

      return () => clearTimeout(timer) // Clear the timeout if the component unmounts
    }
  }, [outputMessage])

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage("")
      }, 3000) // Hide the status message after 3 seconds

      return () => clearTimeout(timer) // Clear the timeout if the component unmounts
    }
  }, [statusMessage])

  const handleFileUpload = async (file) => {
    setStatusMessage("Uploading...")
    const formData = new FormData()
    formData.append("file", file)

    try {
      // Upload the video
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error uploading the video file.")
      }

      const data = await response.json()
      console.log("Uploaded file data:", data) // Debugging log
      setVideoPath(data.file_path)
      setStatusMessage("Uploaded!")

      // Fetch preview of the uploaded video
      const previewResponse = await fetch(
        `http://localhost:8000/preview/?output_path=${encodeURIComponent(data.file_path)}`,
      )
      if (previewResponse.ok) {
        const videoBlob = await previewResponse.blob()
        const videoUrl = URL.createObjectURL(videoBlob)
        setPreviewPath(videoUrl)
      } else {
        throw new Error("Error fetching the video preview.")
      }
    } catch (error) {
      console.error("File upload error:", error)
      setOutputMessage("Failed to upload the video. Please try again.")
      setIsModalVisible(true) // Show modal on error
    }
  }

  const handleCommandSubmit = async (command) => {
    if (!videoPath) {
      setOutputMessage("Error: Please upload a video before issuing commands.")
      setIsModalVisible(true) // Show modal on error
      return
    }

    setStatusMessage("Processing...")
    const formData = new FormData()
    formData.append("file_path", videoPath)
    formData.append("command", command)

    try {
      // Process the video based on the command
      const response = await fetch("http://localhost:8000/process/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error processing the video command.")
      }

      const data = await response.json()
      console.log("Processed file data:", data) // Debugging log
      setStatusMessage("Processed!")

      // Fetch preview of the processed video
      const previewResponse = await fetch(
        `http://localhost:8000/preview/?output_path=${encodeURIComponent(data.output_path)}`,
      )
      if (previewResponse.ok) {
        const videoBlob = await previewResponse.blob()
        const videoUrl = URL.createObjectURL(videoBlob)
        setPreviewPath(videoUrl)
        setOutputMessage(`Command "${command}" executed successfully!`)
      } else {
        throw new Error("Error fetching the processed video preview.")
      }

      // Fetch the updated conversation
      const chatResponse = await fetch("http://localhost:8000/getChat/")
      if (!chatResponse.ok) {
        throw new Error("Error fetching the chat conversation.")
      }

      const chatData = await chatResponse.json()
      setConversation(chatData)
    } catch (error) {
      console.error("Command processing error:", error)
      setOutputMessage("Failed to process the video command. Please try again.")
      setIsModalVisible(true) // Show modal on error
    }
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const handleFileChange = (file) => {
    handleFileUpload(file)
  }

  return (
    <div className="app">
      <div className="editor">
        <div className="video-section flex items-center justify-center">
          {previewPath ? (
            <VideoPlayer src={previewPath} />
          ) : (
            <div className="file-upload-container w-full max-w-md">
              <FileUploader handleChange={handleFileChange} name="file" types={fileTypes}>
                <div className="flex flex-col items-center gap-4">
                  <Upload className="w-12 h-12 text-emerald-500" />
                  <p className="text-lg text-zinc-400">Upload or drop a file right here</p>
                  <p className="text-sm text-zinc-500">MP4, MOV, AVI</p>
                </div>
              </FileUploader>
            </div>
          )}
          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </div>
        <div className="chat-section">
          <ChatBox
            conversation={conversation}
            onCommandSubmit={handleCommandSubmit}
            setConversation={setConversation}
          />
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{outputMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

