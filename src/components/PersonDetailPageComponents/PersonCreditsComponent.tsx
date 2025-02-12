import { Cast } from "@/types/PersonCredits";
import Link from "next/link";
import React, { FC } from "react";

const PersonCreditsComponent: FC<{ cast: Cast }> = ({ cast }) => {
  return (
    <div className=" space-x-10 text-xl py-2 border-b-[1px] border-themeGray grid-cols-8 grid">
      <p className="col-span-1 self-center">
        {cast.release_date.length === 0 ? "-" : cast.release_date.slice(0, 4)}
      </p>
      <div className="col-span-7">
        <Link href={`/${cast.id}`} className="hover:underline">
          <p className="font-semibold">{cast.title}</p>
        </Link>
        <p className="font-light pl-6">{cast.character}</p>
      </div>
    </div>
  );
};

export default PersonCreditsComponent;
