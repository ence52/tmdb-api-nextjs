import React from "react";
import PersonInfoComponent from "./PersonInfoComponent";
import { usePersonDetails } from "@/hooks/usePersonDetails";

const PersonalInfoSection = () => {
  const { details, knownCredits, pickGender } = usePersonDetails();
  if (!details) {
    return;
  }
  return (
    <div>
      <p className="text-xl font-bold">Peronal Information</p>
      <PersonInfoComponent
        title="Known for department"
        info={details.known_for_department}
      />
      <PersonInfoComponent
        title="Known Credits"
        info={knownCredits.toString()}
      />
      <PersonInfoComponent title="Gender" info={pickGender(details.gender)!} />
      <PersonInfoComponent title="Birthday" info={details.birthday} />
      <PersonInfoComponent
        title="Place of birth"
        info={details.place_of_birth}
      />
      {/* Also known as */}
      <div className="  space-y-2">
        <p className="text-base font-semibold">Also known as</p>
        {details.also_known_as.length === 0 || null ? (
          <p>-</p>
        ) : (
          details.also_known_as.map((name, i) => (
            <p
              key={i}
              className="bg-themeGray px-2 py-1 rounded-xl select-none w-min text-nowrap text-sm"
            >
              {name}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
