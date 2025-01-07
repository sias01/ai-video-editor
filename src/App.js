import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import ChatBox from "./ChatBox";
import "./style.css";

function App() {
    const [videoPath, setVideoPath] = useState("");
    const [previewPath, setPreviewPath] = useState("");

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
    
        // Upload the video
        const response = await fetch("http://localhost:8000/upload/", {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
        console.log("Uploaded file data:", data); // Debugging log
        setVideoPath(data.file_path);
    
        // Fetch preview of the uploaded video
        const previewResponse = await fetch(`http://localhost:8000/preview/?output_path=${encodeURIComponent(data.file_path)}`);
        if (previewResponse.ok) {
            const videoBlob = await previewResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);
            setPreviewPath(videoUrl);
        }
    };
    
    const handleCommandSubmit = async (command) => {
        const formData = new FormData();
        formData.append("file_path", videoPath);
        formData.append("command", command);
    
        // Process the video
        const response = await fetch("http://localhost:8000/process/", {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
        console.log("Processed file data:", data); // Debugging log
    
        // Fetch preview of the processed video
        const previewResponse = await fetch(`http://localhost:8000/preview/?output_path=${encodeURIComponent(data.output_path)}`);
        if (previewResponse.ok) {
            const videoBlob = await previewResponse.blob();
            const videoUrl = URL.createObjectURL(videoBlob);
            setPreviewPath(videoUrl);
        }
    };
    
    
    return (
        <div className="app">
            <div className="editor">
                <VideoPlayer src={previewPath} />
                <ChatBox onCommandSubmit={handleCommandSubmit} />
            </div>
            <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e.target.files[0])}
            />
        </div>
    );
}

export default App;
