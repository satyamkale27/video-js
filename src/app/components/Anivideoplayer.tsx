"use client";
import { useState } from "react";
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
  const [qualityLevels, setQualityLevels] = useState<videojs.QualityLevel[]>(
    []
  );

  const [selectedQuality, setSelectedQuality] = useState<string>("");

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

    playerRef.current.on("loadedmetadata", () => {
      const levels = playerRef.current?.qualityLevels();

      if (levels) {
        setQualityLevels(levels.levels_);
      }
    });

    return () => {
      playerRef.current?.dispose();
    };
  }, [videoUrl]);

  const handleQualityChange = (levelId: string) => {
    const levels = playerRef.current?.qualityLevels();
    if (levels) {
      for (let i = 0; i < levels.length; i++) {
        levels[i].enabled = levels[i].id === levelId;
      }
      setSelectedQuality(levelId);
    }
  };

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-default-skin" />
      </div>
      <div className="quality-settings">
        <label htmlFor="quality-select">Quality:</label>
        <select
          id="quality-select"
          value={selectedQuality}
          onChange={(e) => handleQualityChange(e.target.value)}
        >
          {qualityLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.height}p
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Anivideoplayer;
