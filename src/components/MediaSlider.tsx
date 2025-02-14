import React, { FC } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Media } from "@/types/Media";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MediaCard from "./MediaCard";
const MovieSlider: FC<{
  medias: Media[];
  mediaType: string;
  title: string;
}> = ({ medias, title, mediaType }) => {
  return (
    <div className="overflow-x-auto whitespace-nowrap  gap-6 pt-10 space-y-4">
      <p className="text-2xl md:text-3xl font-semibold">{title}</p>
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

export default MovieSlider;
