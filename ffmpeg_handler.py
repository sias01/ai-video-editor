import subprocess
import os

OUTPUT_DIR = "processed"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_video(input_path: str, command: str) -> str:
    output_path = os.path.join(OUTPUT_DIR, f"processed_{os.path.basename(input_path)}")
    full_command = f"""ffmpeg -y -i "{input_path}" {command} "{output_path}" """
    print("Running command: ", full_command)
    
    try:
        subprocess.run(full_command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg error: {e}")
    
    return output_path
