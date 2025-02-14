import React from "react";
import Image from "next/image";
import { usePersonDetails } from "@/hooks/usePersonDetails";
import { API_W500_PHOTO_URL } from "@/services/Constants";
const ProfilePhoto = () => {
  const { details } = usePersonDetails();
  if (!details) {
    return;
  }
  return (
    <div className="  aspect-[2/3] w-full relative">
      <Image
        alt={details.id.toString()}
        sizes="lg"
        loading="lazy"
        unoptimized
        className="object-cover rounded-2xl shadow-lg "
        src={
          details.profile_path === null
            ? "/images/no_image_placeholder.svg"
            : API_W500_PHOTO_URL + details.profile_path
        }
        fill
      />
    </div>
  );
};

export default ProfilePhoto;
