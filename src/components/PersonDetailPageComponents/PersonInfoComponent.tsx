import React, { FC } from "react";

const PersonInfoComponent: FC<{ title: string; info: string }> = ({
  title,
  info,
}) => {
  return (
    <div className="text-base border-b-[1px] border-themeGray py-2  capitalize ">
      <p className="font-semibold">{title}</p>
      <p className="text-sm">{info === null ? "-" : info}</p>
    </div>
  );
};

export default PersonInfoComponent;
