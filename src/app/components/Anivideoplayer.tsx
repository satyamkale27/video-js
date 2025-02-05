"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming"; // Import the HLS plugin

interface VideoPlayerProps {
  videoUrl: string; // .m3u8 URL
}

const Anivideoplayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Players | null>(null);

  useEffect(() => {
    if (!videoRef.current || typeof window === "undefined") return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      autoplay: false,
      preload: "auto",
      responsive: true,
      fluid: true,
      sources: [
        {
          src: videoUrl, // URL to your .m3u8 file
          type: "application/x-mpegURL", // HLS MIME type
        },
      ],
    });

    return () => {
      playerRef.current?.dispose();
    };
  }, [videoUrl]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </div>
    </div>
  );
};

export default Anivideoplayer;
