// src/components/TextContent.tsx

import React from 'react';

interface TextContentProps {
  text: string;
  imageUrl?: string;
}

const TextContent: React.FC<TextContentProps> = ({ text, imageUrl }) => (
  <div>
    <p>{text}</p>
    {imageUrl && <img src={imageUrl} alt="Materi terkait" style={{ width: '100%', maxWidth: '400px', marginTop: '10px' }} />}
  </div>
);

export default TextContent;
