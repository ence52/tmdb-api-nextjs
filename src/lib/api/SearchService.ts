import { Movie, Result } from "@/types/Movie";
import { axiosClient } from "./Constants";

export const fetchSearchMovies = async (q: string): Promise<Movie[]> => {
  try {
    const response = await axiosClient.get<Result>(`/search/movie?query=${q}`);
    return response.data.results;
  } catch {
    throw new Error("Failed to fetch search movies.");
  }
};
