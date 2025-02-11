import React, { FC } from "react";

const ExtraInfoComponent: FC<{ title: string; info: string }> = ({
  title,
  info,
}) => {
  return (
    <div className="text-xl border-b-[1px] border-themeGray py-3 md:px-4 capitalize ">
      <p className="font-semibold">{title}</p>
      <p className="text-lg">{info === null ? "-" : info}</p>
    </div>
  );
};

export default ExtraInfoComponent;
