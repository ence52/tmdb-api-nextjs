export interface PersonCredits {
  cast: Cast[];
  crew: Crew[];
  id: number;
}

export interface Cast {
  id: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  character: string;
  credit_id: string;
  vote_count: number;
  popularity: number;
  media_type: string;
  first_air_date?: string;
  name?: string;
}

export interface Crew {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  title: string;
  credit_id: string;
  department: string;
  vote_count: number;
  popularity: number;
  job: string;
  media_type: string;
}
