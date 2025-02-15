import { Media } from "@/types/Media";
import Link from "next/link";
import React, { FC } from "react";
import Image from "next/image";
import { API_W1280_PHOTO_URL } from "@/services/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const BigSliderComponent: FC<{ media: Media }> = ({ media }) => {
  return (
    <Link href={`/${media.media_type}/${media.id}`}>
      <div className="rounded-2xl overflow-hidden shadow-md duration-700 flex flex-col items-center ">
        <div className="aspect-video w-full relative">
          <Image
            alt={media.title || media.name || "unknown"}
            sizes="lg"
            priority
            unoptimized
            className="object-cover rounded-t-2xl"
            src={`${API_W1280_PHOTO_URL}${media.backdrop_path}`}
            fill
          />
          <div className="absolute inset-x-0 bottom-0 h-[50%] md:h-[50%] bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute h-full w-full  flex flex-col justify-end md:p-10 p-2 space-y-2">
            <div className="flex  space-x-4  mr-auto items-center flex-wrap">
              <p className="md:text-3xl text-lg  font-semibold tracking-wider">
                {media.name || media.title}
              </p>
              <div className="flex space-x-2 items-center md:text-xl text-sm">
                <span className="px-2  bg-themeGray/70 rounded-lg">
                  <FontAwesomeIcon
                    icon={faStar}
                    width={12}
                    className="text-yellow-500"
                  />
                </span>
                <p>{media.vote_average.toFixed(1)}</p>
              </div>
            </div>
            <p className="md:text-base text-xs w-2/3 relative text-wrap text-white/70 line-clamp-2">
              {media.overview}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BigSliderComponent;
