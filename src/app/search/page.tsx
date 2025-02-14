"use client";
import MediaCard from "@/components/MediaCard";
import { fetchSearchMulti } from "@/services/SearchService";
import { MediaCardProps } from "@/types/MediaCardProps";
import { SearchResult } from "@/types/SearchResult";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [searchResults, setMedias] = useState<SearchResult[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) return;
    const fetchSearch = async () => {
      if (!query) return;
      const res = await fetchSearchMulti(query);

      console.log(res);
      setMedias(res);
    };
    fetchSearch();
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="w-full h-full content-center text-center">
      {searchResults.length === 0 ? (
        <p className="text-2xl">Film not found</p>
      ) : (
        <div className="grid md:grid-cols-5 grid-cols-2  md:gap-4 gap-2 py-10">
          {searchResults.map((searchResult, i) => (
            <MediaCard
              key={i}
              media={searchResult as MediaCardProps}
              mediaType={searchResult.media_type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search...</p>}>
      <Search />
    </Suspense>
  );
}
