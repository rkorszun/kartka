import React, { useEffect } from 'react';

interface VideoPlayerProps {
  onVideoEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onVideoEnd, 21500); // 21.5 seconds
    return () => clearTimeout(timer);
  }, [onVideoEnd]);

  return (
    <div className="video-container">
      <iframe
        src="https://www.youtube.com/embed/VBKPhxuaU38?autoplay=1"
        title="Życzenia świąteczne"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
