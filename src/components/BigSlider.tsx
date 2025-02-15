import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Media } from "@/types/Media";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchTrendAllMedia } from "@/services/MediaService";
import BigSliderComponent from "./BigSliderComponent";
const BigSlider = () => {
  const [medias, setMedias] = useState<Media[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchTrendAllMedia();
        setMedias(res.results);
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto whitespace-nowrap  gap-6 pt-10 space-y-4">
      <p className="text-2xl md:text-3xl font-semibold">Trending</p>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.4}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        modules={[Navigation, Pagination, Autoplay]}
        loop={false}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          480: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 1, spaceBetween: 15 },
          1024: { slidesPerView: 1.2, spaceBetween: 20 },
          1280: { slidesPerView: 1.4, spaceBetween: 20 },
        }}
      >
        {medias.map((media, i) => (
          <SwiperSlide key={i} className="select-none ">
            <BigSliderComponent media={media} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BigSlider;
