import React, { FC, useState } from "react";
import ImagesSlider from "./ImagesSlider";
import PosterSlider from "./PosterSlider";
import VideoSlider from "./VideoSlider";
import { VideoResult } from "@/types/MediaVideos";
import { MediaImages } from "@/types/MediaImages";

interface MediaProps {
  videos: VideoResult[];
  images: MediaImages;
}

const MediaSection: FC<MediaProps> = (props) => {
  const [activeTab, setActivePage] = useState(0);

  if (!props.images || !props.videos) {
    return;
  }
  const tabs = [
    { name: "Videos", length: props.videos.length },
    { name: "Backdrops", length: props.images?.backdrops.length },
    { name: "Posters", length: props.images?.posters.length },
  ];
  return (
    <div className=" space-y-4 md:pr-10 ">
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
        {activeTab === 0 && <VideoSlider videos={props.videos} />}
        {activeTab === 1 && <ImagesSlider images={props.images} />}
        {activeTab === 2 && <PosterSlider images={props.images} />}
      </>
    </div>
  );
};

export default MediaSection;
