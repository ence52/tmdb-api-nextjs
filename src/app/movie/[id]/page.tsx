"use client";

import { useMovieDetails } from "@/hooks/useMovieDetails";
import PosterPhoto from "@/components/DetailsPageComponents/PosterPhoto";
import TitleComponent from "@/components/DetailsPageComponents/TitleComponent";
import InfoSection from "@/components/DetailsPageComponents/InfoSection";
import CreditsSection from "@/components/DetailsPageComponents/CreditsSection";
import CastSlider from "@/components/DetailsPageComponents/CastSlider";
import MediaSection from "@/components/DetailsPageComponents/MediaSection";
import ExtraInfoSection from "@/components/DetailsPageComponents/ExtraInfoSection";
import LoadingSpinner from "@/components/LoadingSpinner";

const MovieDetailsPage = () => {
  const {
    details,
    credits,
    isLoading,
    images,
    videos,
    directorInfo,
    starsInfo,
    writerInfo,
  } = useMovieDetails();
  if (isLoading || !details || !credits || !images || !videos) {
    return <LoadingSpinner />;
  }
  //Credits constants

  return (
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4 grid-rows-5 ">
      {/* Poster Photo */}
      <PosterPhoto poster_path={details.poster_path} title={details.title} />
      <TitleComponent
        release_date={details.release_date}
        title={details.title}
      />
      <InfoSection
        genres={details.genres}
        overview={details.overview}
        runtime={details.runtime}
        tagline={details.tagline}
        vote_average={details.vote_average}
      />
      {/* Credits */}
      <CreditsSection
        props={{
          credits: credits,
          starsInfo: starsInfo,
          directorInfo: directorInfo,
          writerInfo: writerInfo,
        }}
      />
      <div className="  py-10  col-span-5 md:grid md:grid-cols-4 flex-col-reverse flex">
        <div className="col-span-3">
          {" "}
          {/* Cast */}
          <CastSlider credits={credits} />
          {/* Media */}
          <MediaSection images={images} videos={videos} />
        </div>
        {/* Extra Info */}
        <ExtraInfoSection />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
