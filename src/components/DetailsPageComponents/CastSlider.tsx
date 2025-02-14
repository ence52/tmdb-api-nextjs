import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CastComponent from "./CastComponent";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { Navigation, Pagination } from "swiper/modules";
import { Credits } from "@/types/MediaCredits";

const CastSlider: FC<{ credits: Credits }> = ({ credits }) => {
  if (!credits) {
    return;
  }
  return (
    <>
      {credits.cast.length > 0 && (
        <div className=" space-y-4  md:pr-10 pt-6">
          <p className="text-2xl font-bold">Cast</p>
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
              {credits.cast.map((cast, i) => (
                <SwiperSlide key={i} className="select-none">
                  <CastComponent cast={cast} />
                </SwiperSlide>
              ))}
            </Swiper>
          }
        </div>
      )}
    </>
  );
};

export default CastSlider;
