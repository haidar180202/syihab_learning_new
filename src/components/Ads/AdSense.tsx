// src/components/Ads/AdSense.tsx

import React, { useEffect } from 'react';

const AdSense: React.FC = () => {
  useEffect(() => {
    // Memuat script AdSense
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adClient = "ca-pub-1477150496838759"; // Ganti dengan ID AdSense Anda
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="adsense-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1477150496838759"  // Ganti dengan ID AdSense Anda
        data-ad-slot="1298004952"           // Ganti dengan Slot Iklan Anda
        data-ad-format="auto"
      />
      
    </div>
  );
};

export default AdSense;
