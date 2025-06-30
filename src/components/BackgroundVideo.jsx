import React from "react";
import "../App.css"; // Import corretto (assicurati che App.css sia dentro src)

const BackgroundVideo = () => {
  return (
    <video autoPlay loop muted className="bg-video">
      <source src="/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
