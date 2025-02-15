"use client";
import KnownForSlider from "@/components/PersonDetailPageComponents/KnownForSlider";
import NameAndBioSection from "@/components/PersonDetailPageComponents/NameAndBioSection";
import PersonalInfoSection from "@/components/PersonDetailPageComponents/PersonalInfoSection";
import PersonCreditsComponent from "@/components/PersonDetailPageComponents/PersonCreditsComponent";
import ProfilePhoto from "@/components/PersonDetailPageComponents/ProfilePhoto";
import { usePersonDetails } from "@/hooks/usePersonDetails";
import { API_W500_PHOTO_URL } from "@/services/Constants";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
const CastDetails = () => {
  const { details, castCredits, isLoading, crewCredits, images } =
    usePersonDetails();
  const [activeTab, setActivePage] = useState(0);

  if (isLoading || !details || !castCredits || !crewCredits) {
    return <LoadingSpinner />;
  }

  const castCrewTabs = [
    { name: "Acting", length: castCredits?.length ?? 0 },
    { name: "Directing", length: crewCredits?.length ?? 0 },
    { name: "Images", length: images?.length ?? 0 },
  ];

  return (
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4  ">
      <div className="col-span-1  space-y-2">
        <ProfilePhoto />
        <PersonalInfoSection />
      </div>
      <div className="col-span-3  md:px-4 py-10 space-y-10">
        <NameAndBioSection />
        <KnownForSlider />
        <div className={`flex text-xl space-x-6`}>
          {castCrewTabs.map((tab, i) => (
            <button
              key={i}
              className={`flex space-x-2 ${
                activeTab === i ? "border-b-4 border-themeGray" : "border-b-0"
              }`}
              onClick={() => setActivePage(i)}
            >
              <p className="font-light">{tab.name}</p>
              {tab.length > 0 && <p className="font-semibold">{tab.length}</p>}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div>
            {castCredits.map((cast, i) => (
              <PersonCreditsComponent
                key={i}
                name={(cast.name || cast.title)!}
                character={cast.character}
                date={cast.first_air_date || cast.release_date || ""}
                id={cast.id}
              />
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <div>
            {crewCredits.map((crew, i) => (
              <PersonCreditsComponent
                key={i}
                name={crew.title}
                character={crew.job}
                date={crew.release_date || ""}
                id={crew.id}
              />
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div>
            {images && (
              <Swiper
                spaceBetween={2}
                slidesPerView={4}
                modules={[Navigation, Pagination]}
                loop={false}
                breakpoints={{
                  320: { slidesPerView: 2.2, spaceBetween: 5 },
                  480: { slidesPerView: 2.3, spaceBetween: 5 },
                  640: { slidesPerView: 2.5, spaceBetween: 5 },
                  1024: { slidesPerView: 3, spaceBetween: 5 },
                  1280: { slidesPerView: 4, spaceBetween: 5 },
                }}
              >
                {images.slice(0, 5).map((image, i) => (
                  <SwiperSlide key={i} className="select-none">
                    <div className="aspect-[2/3] relative w-full">
                      <Image
                        src={API_W500_PHOTO_URL + image.file_path}
                        fill
                        unoptimized
                        loading="lazy"
                        className="contrast-125 object-cover blur-0 transition-all duration-500 rounded-xl"
                        alt={`photo-${i}`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CastDetails;
