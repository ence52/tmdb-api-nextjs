import {
  fetchPersonDetails,
  fetchPersonCredits,
  fetchPersonImages,
} from "@/services/PersonService";
import { Crew, Cast } from "@/types/PersonCredits";
import { PersonDetails } from "@/types/PersonDetails";
import { Profile } from "@/types/PersonImages";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export const usePersonDetails = () => {
  const { id } = useParams();
  const [details, setPersonDetails] = useState<PersonDetails | null>(null);
  const [castCredits, setPersonCastCredits] = useState<Cast[] | null>(null);
  const [crewCredits, setPersonCrewCredits] = useState<Crew[] | null>(null);
  const [knownFor, setKnownfor] = useState<(Crew | Cast)[] | null>(null);
  const [knownCredits, setKnownCredits] = useState<number>(0);
  const [images, setImages] = useState<Profile[]>([]);

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);

      try {
        const [details, credits, images] = await Promise.all([
          fetchPersonDetails(Number(id)),
          fetchPersonCredits(Number(id)),
          fetchPersonImages(Number(id)),
        ]);

        const sortedCastCredits = sortByDate(credits.cast);
        const sortedCrewCredits = sortByDate(credits.crew);
        const allMedias = [...credits.cast, ...credits.crew];
        const knownForMovies = Array.from(
          new Map(
            allMedias
              .filter((media) => media.popularity && media.vote_count > 500)
              .sort(
                (a, b) =>
                  b.popularity * 0.7 +
                  b.vote_count * 0.3 -
                  (a.popularity * 0.7 + a.vote_count * 0.3)
              )
              .map((media) => [media.id, media])
          ).values()
        ).slice(0, 6);
        setKnownCredits(allMedias.length);
        setPersonDetails(details);
        setPersonCastCredits(sortedCastCredits);
        setPersonCrewCredits(sortedCrewCredits);
        setKnownfor(knownForMovies);
        setImages(images);
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

  const sortByDate = <
    T extends { release_date?: string; first_air_date?: string }
  >(
    items: T[]
  ) => {
    return items.sort((a, b) => {
      const dateA =
        a.release_date || a.first_air_date
          ? new Date(a.release_date || a.first_air_date!).getTime()
          : -Infinity;

      const dateB =
        b.release_date || b.first_air_date
          ? new Date(b.release_date || b.first_air_date!).getTime()
          : -Infinity;

      return dateB - dateA;
    });
  };

  return {
    pickGender,
    details,
    castCredits,
    crewCredits,
    knownCredits,
    knownFor,
    isLoading,
    images,
  };
};
