from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from ffmpeg_handler import process_video
import os
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory="processed"), name="static")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_video(file: UploadFile):
    print("/upload request recieved")
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    return {"file_path": file_path}

@app.post("/process/")
async def process_command(file_path: str = Form(...), command: str = Form(...)):
    print("/process request recieved")
    output_path = process_video(file_path, command)
    return {"output_path": output_path}

@app.get("/preview/")
async def preview_video(output_path: str):
    print("/preview request recieved")
    return FileResponse(output_path, media_type="video/mp4")
