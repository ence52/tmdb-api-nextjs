import React, { FC } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Media } from "@/types/Media";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MediaCard from "./MediaCard";
const MediaSlider: FC<{
  medias: Media[];
  mediaType: string;
  title: string;
}> = ({ medias, title, mediaType }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap  gap-6 md:pt-10 pt-4 space-y-4">
      <p className="text-xl md:text-2xl font-semibold">{title}</p>
      <Swiper
        spaceBetween={10}
        slidesPerView={5}
        modules={[Navigation, Pagination, Autoplay]}
        loop={false}
        breakpoints={{
          320: { slidesPerView: 2.4, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 },
          1280: { slidesPerView: 5.5, spaceBetween: 30 },
        }}
      >
        {medias.map((media) => (
          <SwiperSlide key={media.id} className="select-none">
            <MediaCard media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MediaSlider;
