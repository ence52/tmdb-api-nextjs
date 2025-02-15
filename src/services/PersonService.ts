import { PersonDetails } from "@/types/PersonDetails";
import { axiosClient } from "./Constants";
import { PersonCredits } from "@/types/PersonCredits";
import { PersonImages, Profile } from "@/types/PersonImages";

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
      `/person/${id}/combined_credits`
    );
    return response.data;
  } catch {
    throw new Error("Failed to fetch person credits.");
  }
};
export const fetchPersonImages = async (id: number): Promise<Profile[]> => {
  try {
    const response = await axiosClient.get<PersonImages>(
      `/person/${id}/images`
    );
    return response.data.profiles;
  } catch {
    throw new Error("Failed to fetch person images.");
  }
};
