"use client";
import {
  fetchPersonCredits,
  fetchPersonDetails,
} from "@/services/PersonService";
import { PersonDetails } from "@/types/PersonDetails";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { API_W500_PHOTO_URL } from "@/services/Constants";
import PersonInfoComponent from "@/components/PersonDetailPageComponents/PersonInfoComponent";
import { PersonCredits } from "@/types/PersonCredits";
import Link from "next/link";

const CastDetails = () => {
  const { id } = useParams();
  const [details, setPersonDetails] = useState<PersonDetails | null>(null);
  const [credits, setPersonCredits] = useState<PersonCredits | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);

      try {
        const [details, credits] = await Promise.all([
          fetchPersonDetails(Number(id)),
          fetchPersonCredits(Number(id)),
        ]);

        setPersonDetails(details);
        setPersonCredits(credits);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const pickGender = (id: number) => {
    switch (id) {
      case 0:
        return "-";
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";

      default:
        break;
    }
  };

  if (isLoading || !details || !credits) {
    return <div>LOADING</div>;
  }
  return (
    <div className="col-span-5 px-2 py-14 md:px-10 md:grid grid-cols-4  ">
      <div className="col-span-1  space-y-2">
        <div className="  aspect-[2/3] w-full relative">
          <Image
            alt={details.id.toString()}
            sizes="lg"
            loading="lazy"
            unoptimized
            className="object-cover rounded-2xl shadow-lg "
            src={API_W500_PHOTO_URL + details.profile_path}
            fill
          />
        </div>
        <p className="text-xl font-bold">Peronal Information</p>
        <PersonInfoComponent
          title="Known for department"
          info={details.known_for_department}
        />
        <PersonInfoComponent
          title="Gender"
          info={pickGender(details.gender)!}
        />
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
      <div className="col-span-3  md:px-4 py-10 space-y-10">
        <p className="text-4xl  tracking-wider font-semibold">{details.name}</p>
        {details.biography && (
          <div className="tracking-wide flex flex-col space-y-2 mt-6">
            <p className="font-semibold text-xl">Biography</p>
            <p>{details.biography}</p>
          </div>
        )}
        <div>
          <p className="text-2xl font-bold tracking-wider">Known For</p>
          {credits.cast.map((cast, i) => (
            <div
              key={i}
              className=" space-x-10 text-xl py-2 border-b-[1px] border-themeGray grid-cols-8 grid"
            >
              <p className="col-span-1">
                {cast.release_date.length === 0 ? "-" : cast.release_date}
              </p>
              <div className="col-span-7">
                <Link href={`/${cast.id}`} className="hover:underline">
                  <p className="font-semibold">{cast.title}</p>
                </Link>
                <p className="font-light pl-6">{cast.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastDetails;
