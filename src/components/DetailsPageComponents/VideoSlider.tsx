import React, { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { VideoResult } from "@/types/MediaVideos";
const VideoSlider: FC<{ videos: VideoResult[] }> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div>
      {videos && (
        <Swiper
          spaceBetween={0}
          slidesPerView={1.2}
          scrollbar={{ draggable: true }}
          modules={[Navigation, Pagination, Scrollbar]}
          loop={false}
          className="pb-6"
        >
          {videos.slice(0, 5).map((video) => (
            <SwiperSlide key={video.key}>
              <div
                className="relative cursor-pointer w-3/4"
                onClick={() => setSelectedVideo(video.key)}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  alt="Video thumbnail"
                  className="rounded-lg w-full"
                />
                <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 w-full">
                  <p className="self-start text-lg  mt-10">{video.name}</p>
                  <button className="text-white my-auto text-4xl self-center">
                    ▶
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-black p-4 rounded-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSlider;
