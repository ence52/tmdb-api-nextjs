import {
  fetchPersonDetails,
  fetchPersonCredits,
} from "@/services/PersonService";
import { Crew, Cast } from "@/types/PersonCredits";
import { PersonCredits } from "@/types/PersonCredits";
import { PersonDetails } from "@/types/PersonDetails";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export const usePersonDetails = () => {
  const { id } = useParams();
  const [details, setPersonDetails] = useState<PersonDetails | null>(null);
  const [credits, setPersonCredits] = useState<PersonCredits | null>(null);
  const [knownFor, setKnownfor] = useState<(Crew | Cast)[] | null>(null);
  const [knownCredits, setKnownCredits] = useState<number>(0);
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

        const sortedCredits = {
          ...credits,
          cast: credits.cast
            .filter((movie) => movie.release_date)
            .sort(
              (a, b) =>
                new Date(b.release_date).getTime() -
                new Date(a.release_date).getTime()
            ),
        };
        const allMovies = [...credits.cast, ...credits.crew];
        const knownForMovies = Array.from(
          new Map(
            allMovies
              .filter((movie) => movie.popularity && movie.vote_count > 500)
              .sort(
                (a, b) =>
                  b.popularity * 0.7 +
                  b.vote_count * 0.3 -
                  (a.popularity * 0.7 + a.vote_count * 0.3)
              )
              .map((movie) => [movie.id, movie])
          ).values()
        ).slice(0, 6);
        setKnownCredits(allMovies.length);
        setPersonDetails(details);
        setPersonCredits(sortedCredits);
        setKnownfor(knownForMovies);
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

  return { pickGender, details, credits, knownCredits, knownFor, isLoading };
};
