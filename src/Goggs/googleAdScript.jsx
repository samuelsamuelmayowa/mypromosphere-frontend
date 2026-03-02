import React, { useEffect } from 'react';

const GoogleAdScript = () => {
  useEffect(() => {
    // Load the AdSense script
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3685684291051070";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // Initialize the ad once the script loads
    script.onload = () => {
      if (window.adsbygoogle && typeof window.adsbygoogle.push === "function") {
        window.adsbygoogle.push({});
      }
    };

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="ad-container">
      {/* AdSense ad unit */}
      <ins className="adsbygoogle"
        style={{ display: 'block', margin: "10px auto" }}
        data-ad-client="ca-pub-3685684291051070"
        data-ad-slot="6853488502"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  )
};

export default GoogleAdScript;
