# SmartClip

## Overview
**SmartClip** is a tool that combines artificial intelligence and video processing to simplify video editing tasks. Using the interface, users can import videos, communicate their editing requirements through a chatbox, and watch live previews of their edits in real-time. The application uses AI capabilities to generate and execute FFmpeg commands, to ensure seamless and efficient video editing.

---

## Features
- **User-Friendly Interface**: Import videos and interact with a split-screen layout—video on the left, chatbox on the right.
- **AI-Powered Editing**: The chatbox, powered by **Ollama**, interprets user commands and generates FFmpeg scripts for video alterations.
- **Live Video Preview**: Watch changes in real-time as FFmpeg commands are executed.
- **Customizable Architecture**: Backend with **FastAPI** and a **React-based frontend** for modular development and easy scaling.

---

## Architecture
```
AI-VIDEO-EDITOR/
│
├── public/
│   ├── index.html
│   ├── SC-logo.jpg
│
├── src/
│   ├── App.js
│   ├── ChatBox.js
│   ├── ChatBox.css
│   ├── index.js
│   ├── style.css
│   ├── upload.png
│   ├── VideoPlayer.js
│
├── .gitignore
├── app.py
├── ffmpeg_handler.py
├── package.json
├── package-lock.json
```

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- FFmpeg installed ([Installation Guide](https://www.geeksforgeeks.org/how-to-install-ffmpeg-on-windows/))
- Ollama API access
- Docker installed for Ollama

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/sias01/ai-video-editor.git
   cd ai-video-editor
   ```

2. **Setup Backend**
   - Create a virtual environment:
     ```bash
     python -m venv venv
     venv\Scripts\activate # On Linux: source venv/bin/activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the FastAPI server:
     ```bash
     uvicorn backend.main:app --reload
     ```

3. **Setup Frontend**
   - Install dependencies:
     ```bash
     npm install
     ```
   - If using PowerShell, run:
     ```bash 
     $env:NODE_OPTIONS="--openssl-legacy-provider"
     ```
   - Start the development server:
     ```bash
     npm start
     ```

4. **Setup Ollama**
   - Download Ollama's Docker image from [here](https://github.com/ollama/ollama).
   - Pull the Llama-3.2 model:
     ```bash
     ollama pull llama3.2
     ```

5. **Run the Application**
   - Access the application at `http://localhost:3000`

---

## Usage
1. **Import a Video**
   - Drag and drop or upload a video file into the interface.
2. **Interact with the Chatbox**
   - Provide editing instructions (e.g., "Trim the first 10 seconds," "Add a watermark," or "Change resolution to 1080p").
3. **Live Preview**
   - Watch real-time updates as your commands are processed and executed.
4. **Export the Final Video**
   - Once satisfied with the edits, download the processed video.

---

## Example Commands
- "Trim the video to the first 30 seconds."
- "Add a text overlay that says 'Sample Video' at the top-left corner."
- "Change video resolution to 720p."
- "Increase playback speed by 1.5x."
- "Make the video black and white from 30 seconds to 40 seconds"

---

## Acknowledgements
- **FFmpeg**: For providing a powerful video processing framework.
- **Ollama**: For enabling natural language understanding in the chatbox.
- **React**: For creating an interactive frontend experience.
- **FastAPI**: For building a high-performance backend.

---

## Contact
For questions, feedback, or suggestions:
- **Author**: [PG](https://github.com/sias01)
- **Email**: shreyasdesai31012002@gmail.com

Feel free to open issues or contribute to make this project better!
