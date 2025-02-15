export interface PersonImages {
  id: number;
  profiles: Profile[];
}

export interface Profile {
  aspect_ratio: number;
  height: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
