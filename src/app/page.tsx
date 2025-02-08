import Main from "@/components/Main";
import { faEnvelope, faBell } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <div className="px-4 md:px-10">
      <div className="flex flex-col-reverse md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center bg-themeBlack   md:pt-12">
        <div className="relative w-full ">
          <input className="search-bar " placeholder="Search here..."></input>
          <FontAwesomeIcon
            icon={faSearch}
            className=" absolute h-6 right-6 top-1/2 transform -translate-y-1/2 text-gray-400 "
          />
        </div>
        <div className="flex space-x-6 items-center flex-none">
          <FontAwesomeIcon icon={faEnvelope} className="w-8" />
          <FontAwesomeIcon icon={faBell} className="w-6" />
          <div className="h-12 w-12 bg-purple-300 rounded-full flex-none"></div>
        </div>
      </div>
      <Main />
    </div>
  );
}
