import { usePersonDetails } from "@/hooks/usePersonDetails";
import React from "react";

const NameAndBioSection = () => {
  const { details } = usePersonDetails();
  if (!details) {
    return;
  }
  return (
    <>
      <p className="text-4xl  tracking-wider font-semibold">{details.name}</p>
      {details.biography && (
        <div className="tracking-wide flex flex-col space-y-2 mt-6">
          <p className="font-semibold text-xl">Biography</p>
          <p>{details.biography}</p>
        </div>
      )}
    </>
  );
};

export default NameAndBioSection;
