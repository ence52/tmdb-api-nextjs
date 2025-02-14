import { SeriesDetails } from "@/types/SeriesDetails";
import { axiosClient } from "./Constants";
import { Credits } from "@/types/MediaCredits";

export const fetchSeriesDetails = async (
  id: number
): Promise<SeriesDetails> => {
  try {
    const response = await axiosClient.get<SeriesDetails>(`/tv/${id}`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch series details for ID: ${id}.`);
  }
};

export const fetchSeriesCredits = async (id: number): Promise<Credits> => {
  try {
    const response = await axiosClient.get<Credits>(`/tv/${id}/credits`);
    return response.data;
  } catch {
    throw new Error(`Failed to fetch series details for ID: ${id}.`);
  }
};
