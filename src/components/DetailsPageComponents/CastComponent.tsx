import React, { FC } from "react";
import Image from "next/image";
import { Cast } from "@/types/MediaCredits";
import { API_W300_PHOTO_URL } from "@/services/Constants";
import Link from "next/link";
const CastComponent: FC<{ cast: Cast }> = ({ cast }) => {
  return (
    <Link href={`/person/${cast.id}`}>
      <div className="rounded-xl hover:bg-themeGray/70 duration-300">
        <div className="aspect-[2/3]  relative">
          <Image
            alt={(cast.cast_id && cast.cast_id.toString()) || "unknown"}
            fill
            unoptimized
            className="object-cover rounded-t-xl"
            src={
              cast.profile_path === null
                ? "/images/no_image_placeholder.svg"
                : API_W300_PHOTO_URL + cast.profile_path
            }
          ></Image>
        </div>
        <div className="p-2">
          <p className="text-lg font-bold">{cast.name}</p>
          <p className="text-sm">{cast.character}</p>
        </div>
      </div>
    </Link>
  );
};

export default CastComponent;
