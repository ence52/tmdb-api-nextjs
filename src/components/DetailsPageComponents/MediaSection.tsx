import { useMovieDetails } from "@/hooks/useMovieDetails";
import React, { useState } from "react";
import ImagesSlider from "./ImagesSlider";
import PosterSlider from "./PosterSlider";
import VideoSlider from "./VideoSlider";

const MediaSection = () => {
  const { images, videos } = useMovieDetails();
  const [activeTab, setActivePage] = useState(0);

  if (!images || !videos) {
    return;
  }
  const tabs = [
    { name: "Videos", length: videos.length },
    { name: "Backdrops", length: images?.backdrops.length },
    { name: "Posters", length: images?.posters.length },
  ];
  return (
    <div className=" space-y-4 pr-10">
      <p className="text-2xl font-bold">Media</p>
      {/* Buttons */}
      <div className="flex text-xl space-x-6">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`flex space-x-2 ${
              activeTab === i ? "border-b-4 border-themeGray" : "border-b-0"
            }`}
            onClick={() => setActivePage(i)}
          >
            <p className="font-light">{tab.name}</p>
            {tab.length > 0 && <p className="font-semibold">{tab.length}</p>}
          </button>
        ))}
      </div>
      <>
        {activeTab === 0 && <VideoSlider />}
        {activeTab === 1 && <ImagesSlider />}
        {activeTab === 2 && <PosterSlider />}
      </>
    </div>
  );
};

export default MediaSection;
