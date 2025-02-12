import { useMovieDetails } from "@/hooks/useMovieDetails";
import Link from "next/link";
import React from "react";

const CreditsSection = () => {
  const { directorInfo, starsInfo, writerInfo } = useMovieDetails();
  return (
    <div className=" col-span-1 row-span-4 text-lg  justify-between  grid grid-cols-1 grid-rows-3 ">
      {/* Director */}
      <div className="row-span-1 md:px-4 py-3 justify-between border-b-[1px] border-themeGray">
        <p className="font-semibold">Director</p>
        <Link href={`/person/${directorInfo?.id}`}>
          <div className="tracking-wider hover:underline">
            {directorInfo?.name}
          </div>
        </Link>
      </div>
      {/* Writers */}
      <div className="row-span-1 md:px-4 py-3 justify-between  border-b-[1px] border-themeGray">
        <p className="font-semibold">Writers</p>
        <div className="tracking-wider">{writerInfo?.name}</div>
      </div>
      {/* Stars */}
      <div className="row-span-1 md:px-4 py-3 justify-between  border-b-[1px] border-themeGray">
        <p className="font-semibold">Stars</p>
        <div className="tracking-wider">
          {starsInfo?.map((star, i) => (
            <Link key={i} href={`/person/${star.id}`}>
              <p className="hover:underline">{star.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsSection;
