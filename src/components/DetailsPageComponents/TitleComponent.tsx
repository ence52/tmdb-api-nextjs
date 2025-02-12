import { useMovieDetails } from "@/hooks/useMovieDetails";
import React from "react";

const TitleComponent = () => {
  const { details } = useMovieDetails();
  if (!details) {
    return;
  }
  return (
    <div className="col-span-3 row-span-1 flex items-center md:px-4 ">
      {/* Title */}
      <p className="text-4xl  tracking-wider font-semibold">{details.title}</p>
    </div>
  );
};

export default TitleComponent;
