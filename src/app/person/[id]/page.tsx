"use client";
import KnownForSlider from "@/components/PersonDetailPageComponents/KnownForSlider";
import NameAndBioSection from "@/components/PersonDetailPageComponents/NameAndBioSection";
import PersonalInfoSection from "@/components/PersonDetailPageComponents/PersonalInfoSection";
import PersonCreditsComponent from "@/components/PersonDetailPageComponents/PersonCreditsComponent";
import ProfilePhoto from "@/components/PersonDetailPageComponents/ProfilePhoto";
import { usePersonDetails } from "@/hooks/usePersonDetails";

const CastDetails = () => {
  const { details, credits, isLoading } = usePersonDetails();

  if (isLoading || !details || !credits) {
    return <div>LOADING</div>;
  }
  return (
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4  ">
      <div className="col-span-1  space-y-2">
        <ProfilePhoto />
        <PersonalInfoSection />
      </div>
      <div className="col-span-3  md:px-4 py-10 space-y-10">
        <NameAndBioSection />
        <KnownForSlider />
        <div>
          <p className="text-2xl font-bold tracking-wider">Acting</p>
          {credits.cast.map((cast, i) => (
            <PersonCreditsComponent key={i} cast={cast} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastDetails;
