import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieComponent from "./MovieComponent";
import { Navigation, Pagination } from "swiper/modules";
import { usePersonDetails } from "@/hooks/usePersonDetails";

const KnownForSlider = () => {
  const { knownFor } = usePersonDetails();
  return (
    <div>
      {knownFor && knownFor.length > 0 && (
        <div className=" space-y-4  md:pr-10 pt-6 ">
          <p className="text-2xl font-bold tracking-wider">Known For</p>
          {
            <Swiper
              spaceBetween={20}
              slidesPerView={6.2}
              modules={[Navigation, Pagination]}
              loop={false}
              breakpoints={{
                320: { slidesPerView: 2.4, spaceBetween: 10 },
                480: { slidesPerView: 2, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 25 },
                1280: { slidesPerView: 6.2, spaceBetween: 30 },
              }}
            >
              {knownFor.map((cast, i) => (
                <SwiperSlide key={i} className="select-none">
                  <MovieComponent movie={cast} />
                </SwiperSlide>
              ))}
            </Swiper>
          }
        </div>
      )}
    </div>
  );
};

export default KnownForSlider;
