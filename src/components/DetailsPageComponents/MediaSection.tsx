import { useMovieDetails } from "@/hooks/useMovieDetails";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { API_W780_PHOTO_URL } from "@/services/Constants";
import { Navigation, Pagination } from "swiper/modules";

const MediaSection = () => {
  const { images } = useMovieDetails();
  return (
    <div className=" space-y-4 pr-10">
      <p className="text-2xl font-bold">Media</p>
      {images && (
        <Swiper
          spaceBetween={2}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          loop={false}
        >
          {images.backdrops.map((image, i) => (
            <SwiperSlide key={i} className="select-none">
              <div className="aspect-video relative w-full">
                <Image
                  src={API_W780_PHOTO_URL + image.file_path}
                  fill
                  unoptimized
                  className="contrast-125 object-cover blur-0 transition-all duration-500  hover:saturate-150 rounded-xl"
                  alt={`photo-${i}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MediaSection;
