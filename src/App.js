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

        const response = await fetch("http://localhost:8000/upload/", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Uploaded file data:", data); // Debugging log
        setVideoPath(data.file_path);
        setPreviewPath(data.file_path); // Initially set to original video
    };

    const handleCommandSubmit = async (command) => {
        const formData = new FormData();
        formData.append("file_path", videoPath);
        formData.append("command", command);
    
        const response = await fetch("http://localhost:8000/process/", {
            method: "POST",
            body: formData,
        });
    
        const data = await response.json();
        console.log("Processed file data:", data); // Debugging log
    
        // Extract filename from the output path and decode it
        const videoFileName = decodeURIComponent(data.output_path.split('/').pop()); // Decode URL-encoded filename
        const videoUrl = `http://localhost:8000/static/${videoFileName}`; // Construct URL
    
        setPreviewPath(videoUrl); // Set the preview path to the video URL
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
