// src/components/AudioPlayer.tsx

import React from 'react';

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => (
  <audio controls>
    <source src={url} type="audio/mp3" />
    Your browser does not support the audio element.
  </audio>
);

export default AudioPlayer;
