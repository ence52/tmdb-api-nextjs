import React, { FC } from "react";

interface TitleProps {
  title: string;
  release_date: string;
}

const TitleComponent: FC<TitleProps> = (details) => {
  if (!details) {
    return;
  }
  return (
    <div className="col-span-3 row-span-1 flex items-center md:px-4 ">
      {/* Title */}
      <p className="text-4xl  tracking-wider font-semibold">
        {details.title} ({details.release_date.slice(0, 4)})
      </p>
    </div>
  );
};

export default TitleComponent;
