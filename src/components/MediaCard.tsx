import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_W300_PHOTO_URL } from "@/services/Constants";
import { MediaCardProps } from "@/types/MediaCardProps";

const MediaCard: FC<{ media: MediaCardProps; mediaType: string }> = ({
  media,
  mediaType,
}) => {
  return (
    <Link href={`/${mediaType}/${media.id}`}>
      <div className="rounded-2xl overflow-hidden shadow-md duration-700 flex flex-col">
        <div className="aspect-[2/3] w-full relative">
          <Image
            alt={media.title || media.name || "unknown"}
            sizes="lg"
            priority
            unoptimized
            className="object-cover rounded-t-2xl"
            src={
              media.poster_path !== null && media.poster_path !== undefined
                ? `${API_W300_PHOTO_URL}${media.poster_path}`
                : media.profile_path !== null &&
                  media.profile_path !== undefined
                ? `${API_W300_PHOTO_URL}${media.profile_path}`
                : "/images/no_image_placeholder.svg"
            }
            fill
          />
          <div className="absolute inset-x-0 bottom-0 h-[20%] md:h-[15%] bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute h-full flex flex-col justify-end p-2">
            <p className="text-sm text-white">{media.name || media.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
