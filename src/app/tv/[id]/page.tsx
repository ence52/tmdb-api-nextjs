"use client";
import PosterPhoto from "@/components/DetailsPageComponents/PosterPhoto";
import TitleComponent from "@/components/DetailsPageComponents/TitleComponent";
import InfoSection from "@/components/DetailsPageComponents/InfoSection";
import CreditsSection from "@/components/DetailsPageComponents/CreditsSection";
import CastSlider from "@/components/DetailsPageComponents/CastSlider";
import ExtraInfoSection from "@/components/DetailsPageComponents/ExtraInfoSection";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import MediaSection from "@/components/DetailsPageComponents/MediaSection";

const SeriesDetailsPage = () => {
  const { details, isLoading, credits, images, videos, keywords } =
    useSeriesDetails();
  if (isLoading || !details || !credits || !images || !videos) {
    return <div>LOADING</div>;
  }
  //Credits constants

  return (
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4 grid-rows-5 ">
      {/* Poster Photo */}
      <PosterPhoto poster_path={details.poster_path} title={details.name} />
      <TitleComponent
        release_date={details.first_air_date}
        title={details.name}
      />
      <InfoSection
        genres={details.genres}
        mediaType="movie"
        overview={details.overview}
        tagline={details.tagline}
        vote_average={details.vote_average}
      />
      {/* Credits */}
      <CreditsSection />
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

export default SeriesDetailsPage;
