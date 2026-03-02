import React, { useEffect } from 'react';

const Adds = () => {
  useEffect(() => {
    // Load the AdSense script
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3685684291051070";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Initialize the ad
    script.onload = () => {
      if (window.adsbygoogle && typeof window.adsbygoogle.push === "function") {
        window.adsbygoogle.push({});
      }
    };

    return () => {
      // Clean up script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ad-container">
      <ins className="adsbygoogle"
           style={{ display: 'block', textAlign: 'center' }}
           data-ad-layout="in-article"
           data-ad-format="fluid"
           data-ad-client="ca-pub-3685684291051070"
           data-ad-slot="2335658994"></ins>
    </div>
  );
};

export default Adds;
