import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { API_W780_PHOTO_URL } from "@/services/Constants";
const ImagesSlider = () => {
  const { images } = useMovieDetails();
  return (
    <div>
      {images && (
        <Swiper
          spaceBetween={2}
          slidesPerView={4.3}
          modules={[Navigation, Pagination]}
          loop={false}
        >
          {images.posters.slice(0, 5).map((image, i) => (
            <SwiperSlide key={i} className="select-none">
              <div className="aspect-[2/3] relative h-full">
                <Image
                  src={API_W780_PHOTO_URL + image.file_path}
                  fill
                  unoptimized
                  loading="lazy"
                  className="contrast-125 object-cover blur-0 transition-all duration-500 rounded-xl"
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

export default ImagesSlider;
