import { VideoResult } from "@/types/MediaVideos";
import React, { FC } from "react";

const VideoComponent: FC<{ video: VideoResult }> = ({ video }) => {
  return (
    <div className="w-full aspect-video">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${video.key}`}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoComponent;
