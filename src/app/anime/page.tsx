"use client";
import React, { useState } from "react";
import Anivideoplayer from "../components/Anivideoplayer"; // Adjust the import path

const HomePage: React.FC = () => {
  const [videoUrl] = useState<string>(
    "https://ddr8m0gdhyi51.cloudfront.net/death-note-8615/1738676496209_89b101c6-c142-4b9e-b8f9-e15dee255b23_Rebirth/index.m3u8"
  );

  return (
    <div>
      <h1>Welcome to the Video Player</h1>
      <Anivideoplayer videoUrl={videoUrl} />
    </div>
  );
};

export default HomePage;
