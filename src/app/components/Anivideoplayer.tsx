"use client";
import { useState, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming"; // HLS support

interface VideoPlayerProps {
  videoUrl: string;
}

const Anivideoplayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);
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
      fluid: false,
      width: 640,
      height: 360,
      sources: [
        {
          src: videoUrl,
          type: "application/x-mpegURL",
        },
      ],
    });

    playerRef.current.ready(() => {
      const player = playerRef.current;
      if (!player) return;

      const controlBar = player.controlBar;
      const existingButton = document.getElementById("quality-button");

      if (!existingButton) {
        // Create the button element
        const qualityButton = document.createElement("button");
        qualityButton.id = "quality-button";
        qualityButton.innerText = "Quality";
        qualityButton.className =
          "vjs-quality-button text-white px-3 py-1 bg-gray-800 rounded-md cursor-pointer hover:bg-gray-600 transition-all";

        qualityButton.onclick = () => {
          document.getElementById("quality-menu")?.classList.toggle("hidden");
        };

        // Append the button inside the control bar
        controlBar.el()?.appendChild(qualityButton);
      }
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
    <div className="flex flex-col items-center p-5 bg-gray-900 rounded-lg shadow-md w-[660px]">
      {/* Video Player */}
      <div data-vjs-player className="relative w-full">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin rounded-lg"
        />
        {/* Quality Dropdown Menu */}
        <div
          id="quality-menu"
          className="absolute top-2 right-2 bg-gray-800 p-2 rounded-md hidden"
        >
          <label htmlFor="quality-select" className="text-sm text-gray-300">
            Quality:
          </label>
          <select
            id="quality-select"
            value={selectedQuality}
            onChange={(e) => handleQualityChange(e.target.value)}
            className="bg-gray-700 text-white text-sm px-3 py-1 rounded-md border border-gray-600 focus:ring focus:ring-blue-500"
          >
            {qualityLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.height}p
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Anivideoplayer;
