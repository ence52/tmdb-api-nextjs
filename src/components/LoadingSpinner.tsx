import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-themeGray rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
