import { useMovieDetails } from "@/hooks/useMovieDetails";
import { Genre } from "@/types/MovieDetails";
import { faHourglass3, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface InfoSectionProps {
  genres: Genre[];
  vote_average: number;
  runtime?: number;
  tagline: string;
  overview: string;
  mediaType: string;
}

const InfoSection = (details: InfoSectionProps) => {
  const { formatDuration } = useMovieDetails();
  if (!details) {
    return;
  }
  return (
    <div className="col-span-2 row-span-4 md:py-0  py-4 tracking-wider space-y-4 md:px-4 ">
      {/* Genres */}
      <div className="flex flex-wrap md:flex-none gap-x-3 gap-y-2">
        {details.genres.map((i) => (
          <p
            key={i.id}
            className="bg-themeGray px-4 py-1 rounded-2xl select-none"
          >
            {i.name}
          </p>
        ))}
      </div>
      {/* Rating & Duration */}
      <div className="flex space-x-4 items-center select-none">
        {/* Rating */}
        <div className="flex space-x-2 items-center">
          <span className="px-4 py-1 bg-themeGray rounded-xl">
            <FontAwesomeIcon
              icon={faStar}
              width={18}
              className="text-yellow-500"
            />
          </span>
          <p>{details.vote_average.toFixed(1)}</p>
        </div>
        {/* Duration */}
        {details.runtime && (
          <div className="flex space-x-2 items-center">
            <span className="px-4 py-1 bg-themeGray rounded-xl">
              <FontAwesomeIcon icon={faHourglass3} width={18} />
            </span>
            <p>{formatDuration(details.runtime)}</p>
          </div>
        )}
      </div>
      {/* Overview */}
      <div className="tracking-wide flex flex-col space-y-2">
        <p className="italic text-white/60 text-xl">{details.tagline}</p>
        <p className="font-semibold text-xl">Overview</p>
        <p>{details.overview}</p>
      </div>
    </div>
  );
};

export default InfoSection;
