import { Media, Result } from "@/types/Media";
import { axiosClient } from "./Constants";

export const fetchSearchMovies = async (q: string): Promise<Media[]> => {
  try {
    const response = await axiosClient.get<Result>(`/search/multi?query=${q}`);
    return response.data.results;
  } catch {
    throw new Error("Failed to fetch search movies.");
  }
};
