import Link from "next/link";
import React, { FC } from "react";
interface Info {
  id: number;
  date: string;
  name: string;
  character: string;
}

const PersonCreditsComponent: FC<Info> = (info) => {
  return (
    <div className=" space-x-10 text-xl py-2 border-b-[1px] border-themeGray grid-cols-8 grid">
      <p className="col-span-1 self-center">
        {info.date.length === 0 ? "-" : info.date.slice(0, 4)}
      </p>
      <div className="col-span-7">
        <Link href={`/${info.id}`} className="hover:underline">
          <p className="font-semibold">{info.name}</p>
        </Link>
        <p className="font-light pl-6">{info.character}</p>
      </div>
    </div>
  );
};

export default PersonCreditsComponent;
