import React from "react";
import ExtraInfoComponent from "./ExtraInfoComponent";
import { useMovieDetails } from "@/hooks/useMovieDetails";

const ExtraInfoSection = () => {
  const { details, keywords } = useMovieDetails();
  if (!details) {
    return;
  }
  return (
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
  );
};

export default ExtraInfoSection;
