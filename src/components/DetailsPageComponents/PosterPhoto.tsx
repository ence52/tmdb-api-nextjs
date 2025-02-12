import React from "react";
import Image from "next/image";
import { API_W500_PHOTO_URL } from "@/services/Constants";
import { useMovieDetails } from "@/hooks/useMovieDetails";
const PosterPhoto = () => {
  const { details } = useMovieDetails();
  if (!details) {
    return;
  }
  return (
    <div className="col-span-1 row-span-5 aspect-[2/3] w-full relative">
      <Image
        alt={details.title}
        sizes="lg"
        loading="lazy"
        unoptimized
        className="object-cover rounded-2xl shadow-lg "
        src={API_W500_PHOTO_URL + details.poster_path}
        fill
      />
    </div>
  );
};

export default PosterPhoto;
