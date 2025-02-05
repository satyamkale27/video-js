"use client";
import React, { useState } from "react";
import Anivideoplayer from "../components/Anivideoplayer"; // Adjust the import path

const HomePage: React.FC = () => {
  const [videoUrl] = useState<string>(
    "https://ddr8m0gdhyi51.cloudfront.net/death-note-8615/1738676496209_89b101c6-c142-4b9e-b8f9-e15dee255b23_Rebirth/index.m3u8"
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to the Video Player
      </h1>
      <div className="w-full max-w-5xl">
        {" "}
        {/* Increase the width here */}
        <Anivideoplayer videoUrl={videoUrl} />
      </div>
    </div>
  );
};

export default HomePage;
