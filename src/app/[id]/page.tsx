"use client";
import { fetchMovieCredits, fetchMovieDetails } from "@/lib/api/MovieService";
import { MovieDetails } from "@/types/MovieDetails";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass3, faStar } from "@fortawesome/free-solid-svg-icons";
import { Credits, Crew } from "@/types/MovieCredits";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const res = await fetchMovieDetails(Number(id));
        const res2 = await fetchMovieCredits(Number(id));
        setDetails(res);
        setCredits(res2);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!details) {
    return <div className="col-span-5">Error loading movie details.</div>;
  }
  if (!credits) {
    return <div className="col-span-5">Error loading movie credits.</div>;
  }
  if (isLoading) {
    <div>LOADING</div>;
  }
  //Credits constants
  const directorInfo = credits.crew.find(
    (person: Crew) => person.job === "Director"
  );
  const writerInfo = credits.crew.find(
    (person: Crew) => person.job === "Story" || person.job === "Writer"
  );
  const starsInfo = credits.cast.slice(0, 4);

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="col-span-5 px-4 py-14 md:px-10 md:grid grid-cols-4 grid-rows-5">
      {/* Poster Photo */}
      <div className="col-span-1 row-span-5 aspect-[2/3] w-full relative ">
        <Image
          alt={details.title}
          sizes="lg"
          className="object-cover rounded-2xl shadow-lg "
          src={
            process.env.NEXT_PUBLIC_API_ORIGINAL_PHOTO_URL + details.poster_path
          }
          fill
        />
      </div>
      <div className="col-span-3 row-span-1 flex items-center px-4">
        {/* Title */}
        <p className="text-4xl tracking-wider font-semibold">
          {details.original_title}
        </p>
      </div>
      {/* Info */}
      <div className="col-span-2 row-span-4 md:py-0  py-4 tracking-wider space-y-4 px-4">
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
          <div className="flex space-x-2 items-center">
            <span className="px-4 py-1 bg-themeGray rounded-xl">
              <FontAwesomeIcon icon={faHourglass3} width={18} />
            </span>
            <p>{formatDuration(details.runtime)}</p>
          </div>
        </div>
        {/* Overview */}
        <div className="tracking-wide flex flex-col space-y-2">
          <p className="italic text-white/60 text-xl">{details.tagline}</p>
          <p className="font-semibold text-xl">Overview</p>
          <p>{details.overview}</p>
        </div>
      </div>
      {/* Credits */}
      <div className=" col-span-1 row-span-4 text-lg  justify-between  grid grid-cols-1 grid-rows-3">
        {/* Director */}
        <div className="row-span-1 px-4 py-3 justify-between border-b-[1px] border-themeGray">
          <p className="font-semibold">Director</p>
          <div className="tracking-wider">{directorInfo?.name}</div>
        </div>
        {/* Writers */}
        <div className="row-span-1 px-4 py-3 justify-between  border-b-[1px] border-themeGray">
          <p className="font-semibold">Writers</p>
          <div className="tracking-wider">{writerInfo?.name}</div>
        </div>
        {/* Stars */}
        <div className="row-span-1 px-4 py-3 justify-between  border-b-[1px] border-themeGray">
          <p className="font-semibold">Stars</p>
          <div className="tracking-wider">
            {starsInfo?.map((i) => (
              <p key={i.id}>{i.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
