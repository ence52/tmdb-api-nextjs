import { Media } from "@/types/Media";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_W300_PHOTO_URL } from "@/services/Constants";

const MediaCard: FC<{ media: Media; mediaType: string }> = ({
  media,
  mediaType,
}) => {
  return (
    <Link href={`/${mediaType}/${media.id}`}>
      <div className="rounded-2xl overflow-hidden shadow-md duration-700">
        <div className="aspect-[2/3] w-full relative">
          <Image
            alt={media.title || media.name || "unknown"}
            sizes="lg"
            priority
            unoptimized
            className="object-cover rounded-t-2xl"
            src={
              media.poster_path === null
                ? "/images/no_image_placeholder.svg"
                : `${API_W300_PHOTO_URL}${media.poster_path}`
            }
            fill
          />
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
