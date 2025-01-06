import React, { useEffect, useRef } from "react";

function VideoPlayer({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
        // Ensure the video element is ready to load and play
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [src]); // Re-load the video when the `src` changes

    return (
        <div className="video-player">
            <video
                ref={videoRef}
                controls
                width="100%"
                height="auto"
                src={src}
            />
        </div>
    );
}

export default VideoPlayer;
