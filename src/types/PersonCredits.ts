export interface PersonCredits {
  cast: Cast[];
  crew: Crew[];
  id: number;
}

export interface Cast {
  id: number;
  release_date: string;
  title: string;
  popularity: number;
  vote_count: number;
  character: string;
  poster_path: string;
  credit_id: string;
}

export interface Crew {
  id: number;
  original_title: string;
  release_date: string;
  title: string;
  popularity: number;
  poster_path: string;
  vote_count: number;
  department: string;
  job: string;
}
