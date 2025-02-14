import { axiosClient } from "./Constants";
import { SearchResult, SearchResults } from "@/types/SearchResult";

export const fetchSearchMulti = async (q: string): Promise<SearchResult[]> => {
  try {
    const response = await axiosClient.get<SearchResults>(
      `/search/multi?query=${q}`
    );
    return response.data.results;
  } catch {
    throw new Error("Failed to fetch search movies.");
  }
};
