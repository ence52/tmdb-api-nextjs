import { Movie } from "@/types/Movie";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

const MovieCard: FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <Link href={`/${movie.id}`}>
      <div className="rounded-2xl overflow-hidden shadow-md duration-700">
        <div className="aspect-[2/3] w-full relative">
          <Image
            alt={movie.title}
            sizes="lg"
            className="object-cover rounded-t-2xl"
            src={`${process.env.NEXT_PUBLIC_API_PHOTO_URL}${movie.poster_path}`}
            fill
          />
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
