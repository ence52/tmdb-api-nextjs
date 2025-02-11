import { PersonDetails } from "@/types/PersonDetails";
import { axiosClient } from "./Constants";
import { PersonCredits } from "@/types/PersonCredits";

export const fetchPersonDetails = async (
  id: number
): Promise<PersonDetails> => {
  try {
    const response = await axiosClient.get<PersonDetails>(`/person/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch person details.");
  }
};
export const fetchPersonCredits = async (
  id: number
): Promise<PersonCredits> => {
  try {
    const response = await axiosClient.get<PersonCredits>(
      `/person/${id}/movie_credits`
    );
    return response.data;
  } catch {
    throw new Error("Failed to fetch person credits.");
  }
};
