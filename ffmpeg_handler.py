import subprocess
import os
import ollama

def ollama_func(user_query, input_path, output_path):
    # response = ollama.chat(model='llama3.2', messages=[
    # response = ollama.chat(model='tinyllama', messages=[
    #         {"role": "system", "content": f"""Read the query given below. There is a video and this query in order to edit this video. Give only the ffmpeg command to do it. Path to the video: "input.mp4", output should be saved at "output.mp4". Make sure you start the command with "ffmpeg -y". ONLY FFMPEG COMMAND, DO NOT RETURN ANYTHING ELSE."""},
    #         {"role": "user", "content": user_query}
    #     ])
    # print("Ollama response: ",response['message']['content'])
    # if '"' in response['message']['content']:
    #     full_response = response['message']['content'].replace("input.mp4", input_path.replace("\\", "/")).replace("output.mp4", output_path.replace("\\", "/")).replace("`","")
    # else:
    #     full_response = response['message']['content'].replace("input.mp4", '"' + input_path.replace("\\", "/") + '"').replace("output.mp4", '"' + output_path.replace("\\", "/") + '"').replace("`","")
    # print("FFmpeg replaced command: ", full_response)
    full_response = """
    ffmpeg -i "uploads/how to record screen and audio in windows 10 - Google Search - Google Chrome 2021-11-11 18-11-13.mp4" -ss 0:5 -t 2 "processed/processed_how to record screen and audio in windows 10 - Google Search - Google Chrome 2021-11-11 18-11-13.mp4"
    """
    return full_response

OUTPUT_DIR = "processed"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def process_video(input_path: str, command: str) -> str:
    output_path = os.path.join(OUTPUT_DIR, f"processed_{os.path.basename(input_path)}")
    # full_command = f"""ffmpeg -y -i "{input_path}" {command} "{output_path}" """
    print("Generating command")
    full_command = ollama_func(command, input_path, output_path)
    print("Running command: ", full_command)
    try:
        subprocess.run(full_command, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"FFmpeg error: {e}")
    return output_path
