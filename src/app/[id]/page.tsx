"use client";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieImagesById,
  fetchMovieKeywordsById,
} from "@/services/MovieService";
import { MovieDetails } from "@/types/MovieDetails";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass3, faStar } from "@fortawesome/free-solid-svg-icons";
import { Credits, Crew } from "@/types/MovieCredits";
import { API_W500_PHOTO_URL, API_W780_PHOTO_URL } from "@/services/Constants";
import { MovieImages } from "@/types/MovieImages";
import ExtraInfoComponent from "@/components/DetailsPageComponents/ExtraInfoComponent";
import { Keyword } from "@/types/MovieKeywords";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CastComponent from "@/components/DetailsPageComponents/CastComponent";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [images, setImages] = useState<MovieImages | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);

      try {
        const [details, credits, images, keywords] = await Promise.all([
          fetchMovieDetails(Number(id)).then((res) => res),
          fetchMovieCredits(Number(id)).then((res) => res),
          fetchMovieImagesById(Number(id)).then((res) => res),
          fetchMovieKeywordsById(Number(id)).then((res) => res),
        ]);

        setDetails(details);
        setCredits(credits);
        setImages(images);
        setKeywords(keywords);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading || !details || !credits) {
    return <div>LOADING</div>;
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
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4 grid-rows-5 ">
      {/* Poster Photo */}
      <div className="col-span-1 row-span-5 aspect-[2/3] w-full relative">
        <Image
          alt={details.title}
          sizes="lg"
          loading="lazy"
          unoptimized
          className="object-cover rounded-2xl shadow-lg "
          src={API_W500_PHOTO_URL + details.poster_path}
          fill
        />
      </div>
      <div className="col-span-3 row-span-1 flex items-center md:px-4 ">
        {/* Title */}
        <p className="text-4xl  tracking-wider font-semibold">
          {details.title}
        </p>
      </div>
      {/* Info */}
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
      <div className=" col-span-1 row-span-4 text-lg  justify-between  grid grid-cols-1 grid-rows-3 ">
        {/* Director */}
        <div className="row-span-1 md:px-4 py-3 justify-between border-b-[1px] border-themeGray">
          <p className="font-semibold">Director</p>
          <div className="tracking-wider">{directorInfo?.name}</div>
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
            {starsInfo?.map((i) => (
              <p key={i.id}>{i.name}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="  py-10  col-span-5 md:grid md:grid-cols-4 flex-col-reverse flex">
        <div className="col-span-3">
          {" "}
          {/* Cast */}
          {credits.cast.length > 0 && (
            <div className=" space-y-4  md:pr-10 pt-6 ">
              <p className="text-2xl font-bold">Cast</p>
              {
                <Swiper
                  spaceBetween={20}
                  slidesPerView={6.2}
                  modules={[Navigation, Pagination]}
                  loop={false}
                  breakpoints={{
                    320: { slidesPerView: 2.4, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 15 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 25 },
                    1280: { slidesPerView: 6.2, spaceBetween: 30 },
                  }}
                >
                  {credits.cast.map((cast, i) => (
                    <SwiperSlide key={i} className="select-none">
                      <CastComponent cast={cast} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              }
            </div>
          )}
          {/* Media */}
          <div className=" space-y-4 pr-10">
            <p className="text-2xl font-bold">Media</p>
            {images && (
              <Swiper
                spaceBetween={2}
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                loop={false}
              >
                {images.backdrops.map((image, i) => (
                  <SwiperSlide key={i} className="select-none">
                    <div className="aspect-video relative w-full">
                      <Image
                        src={API_W780_PHOTO_URL + image.file_path}
                        fill
                        unoptimized
                        className="contrast-125 object-cover blur-0 transition-all duration-500  hover:saturate-150 rounded-xl"
                        alt={`photo-${i}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
        {/* Extra Info */}
        <div className="col-span-1 space-y-4 ">
          <ExtraInfoComponent
            title="Original Title"
            info={details.original_title}
          />
          <ExtraInfoComponent title="Status" info={details.status} />
          <ExtraInfoComponent
            title="Original Language"
            info={details.original_language}
          />
          <ExtraInfoComponent
            title="Budget"
            info={
              "$" +
              details.budget.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <ExtraInfoComponent
            title="Revenue"
            info={
              "$" +
              details.revenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }
          />
          <div>
            <div className="text-xl border-b-[1px] border-themeGray md:px-4 capitalize pb-4 ">
              <p className="font-semibold pb-2">Keywords</p>

              <div className="flex flex-wrap md:flex-none gap-x-3 gap-y-2 lowercase ">
                {keywords.map((i) => (
                  <p
                    key={i.id}
                    className="bg-themeGray px-4 py-1 rounded-2xl select-none"
                  >
                    {i.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
