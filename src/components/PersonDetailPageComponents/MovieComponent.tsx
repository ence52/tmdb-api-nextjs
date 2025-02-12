import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { API_W300_PHOTO_URL } from "@/services/Constants";
import { Cast } from "@/types/PersonCredits";
import { Crew } from "@/types/PersonCredits";

const MovieComponent: FC<{ movie: Crew | Cast }> = ({ movie }) => {
  return (
    <Link href={`/${movie.id}`}>
      <div className="rounded-xl hover:bg-themeGray/70 duration-300">
        <div className="aspect-[2/3]  relative">
          <Image
            alt={movie.id.toString()}
            fill
            unoptimized
            className="object-cover rounded-t-xl"
            src={
              movie.poster_path === null
                ? "/images/no_image_placeholder.svg"
                : API_W300_PHOTO_URL + movie.poster_path
            }
          ></Image>
        </div>
        <div className="p-2">
          <p className="text-lg font-light">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};
export default MovieComponent;
