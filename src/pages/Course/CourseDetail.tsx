// src/pages/Course/CourseDetail.tsx

import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { AdSense, AudioPlayer, TextContent, VideoPlayer } from '../../components';

// src/pages/Course/CourseDetail.tsx
interface CourseDetailProps {
  title: string;
  description: string;
  videoUrl: string;
  audioUrl: string;
  textContent: string;
  imageUrl?: string;
}

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetailProps | null>(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) return;

      const courseDoc = doc(db, 'courses', id);
      const courseSnapshot = await getDoc(courseDoc);
      if (courseSnapshot.exists()) {
        setCourse(courseSnapshot.data() as CourseDetailProps);
      }
    };

    fetchCourseDetail();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      <h2>{course.title}</h2>
      <TextContent text={course.textContent} imageUrl={course.imageUrl} />
      <VideoPlayer url={course.videoUrl} />
      <AudioPlayer url={course.audioUrl} />
      <AdSense />
    </div>
  );
};

export default CourseDetail;
