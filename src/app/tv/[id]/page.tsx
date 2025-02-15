"use client";
import PosterPhoto from "@/components/DetailsPageComponents/PosterPhoto";
import TitleComponent from "@/components/DetailsPageComponents/TitleComponent";
import InfoSection from "@/components/DetailsPageComponents/InfoSection";
import CreditsSection from "@/components/DetailsPageComponents/CreditsSection";
import CastSlider from "@/components/DetailsPageComponents/CastSlider";
import { useSeriesDetails } from "@/hooks/useSeriesDetails";
import MediaSection from "@/components/DetailsPageComponents/MediaSection";
import ExtraInfoComponent from "@/components/DetailsPageComponents/ExtraInfoComponent";

const SeriesDetailsPage = () => {
  const {
    details,
    isLoading,
    credits,
    images,
    videos,
    keywords,
    directorInfo,
    starsInfo,
    writerInfo,
  } = useSeriesDetails();
  if (isLoading || !details || !credits || !images || !videos) {
    console.log(keywords);
    return <div>LOADING</div>;
  }
  //Credits constants

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
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
        overview={details.overview}
        tagline={details.tagline}
        runtime={details.episode_run_time[0]}
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
        <div className="col-span-1 space-y-4 ">
          <ExtraInfoComponent
            title="Original Name"
            info={details.original_name}
          />
          <ExtraInfoComponent
            title="First Air Date"
            info={formatDate(details.first_air_date)}
          />
          <ExtraInfoComponent
            title="Last Air Date"
            info={formatDate(details.last_air_date)}
          />
          <ExtraInfoComponent
            title="Episodes"
            info={details.number_of_episodes.toString()}
          />
          <ExtraInfoComponent
            title="Seasons"
            info={details.number_of_seasons.toString()}
          />
          <ExtraInfoComponent title="Status" info={details.status} />
          <ExtraInfoComponent
            title="Original Language"
            info={details.original_language}
          />

          {keywords !== undefined && (
            <div>
              <div className="text-xl border-b-[1px] border-themeGray md:px-4 capitalize pb-4 ">
                <p className="font-semibold pb-2">Keywords</p>

                <div className="flex flex-wrap md:flex-none gap-x-3 gap-y-2 lowercase ">
                  {keywords.map((k, i) => (
                    <p
                      key={i}
                      className="bg-themeGray px-4 py-1 rounded-2xl select-none"
                    >
                      {k.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsPage;
