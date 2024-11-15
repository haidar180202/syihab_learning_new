// src/pages/Course/CourseDetail.tsx

import React from 'react';
import { AdSense, AudioPlayer, TextContent, VideoPlayer } from '../components';


const CourseDetail: React.FC = () => {
  return (
    <div>
      <h1>Course Detail</h1>
      <TextContent text="Belajar React dengan baik" imageUrl="https://example.com/image.png" />
      <VideoPlayer url="https://example.com/video.mp4" />
      <AudioPlayer url="https://example.com/audio.mp3" />
      <AdSense />
    </div>
  );
};

export default CourseDetail;
