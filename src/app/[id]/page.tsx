"use client";

import { useMovieDetails } from "@/hooks/useMovieDetails";
import PosterPhoto from "@/components/DetailsPageComponents/PosterPhoto";
import TitleComponent from "@/components/DetailsPageComponents/TitleComponent";
import InfoSection from "@/components/DetailsPageComponents/InfoSection";
import CreditsSection from "@/components/DetailsPageComponents/CreditsSection";
import CastSlider from "@/components/DetailsPageComponents/CastSlider";
import MediaSection from "@/components/DetailsPageComponents/MediaSection";
import ExtraInfoSection from "@/components/DetailsPageComponents/ExtraInfoSection";

const MovieDetailsPage = () => {
  const { details, credits, isLoading } = useMovieDetails();
  if (isLoading || !details || !credits) {
    return <div>LOADING</div>;
  }
  //Credits constants

  return (
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4 grid-rows-5 ">
      {/* Poster Photo */}
      <PosterPhoto />
      <TitleComponent />
      <InfoSection />
      {/* Credits */}
      <CreditsSection />
      <div className="  py-10  col-span-5 md:grid md:grid-cols-4 flex-col-reverse flex">
        <div className="col-span-3">
          {" "}
          {/* Cast */}
          <CastSlider />
          {/* Media */}
          <MediaSection />
        </div>
        {/* Extra Info */}
        <ExtraInfoSection />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
