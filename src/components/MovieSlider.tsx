import React, { FC } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/Movie";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const MovieSlider: FC<{ movies: Movie[]; title: string }> = ({
  movies,
  title,
}) => {
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
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className="select-none">
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
