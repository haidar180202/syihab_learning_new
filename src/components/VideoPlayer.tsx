// src/components/VideoPlayer.tsx

import React from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => (
  <video controls style={{ width: '100%', maxHeight: '500px' }}>
    <source src={url} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default VideoPlayer;
