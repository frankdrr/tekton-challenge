import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../app/context/auth-context';
import { useIntersectionObserver } from '../../app/hooks/use-intersection-observer';
import type { Anime } from '../../core/domain/types';
import { JikanRepository } from '../../infrastructure/repositories/jikan-repository';
import { IAnimeService } from '../../core/services/anime-service';

const HomePage = () => {
  const { logout } = useAuth();
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const totalLoadedRef = useRef(0);

  const animeService: IAnimeService = new JikanRepository();

  const maxItems = 2000;
  const itemsPerPage = 25;

  const { containerRef, isVisible } = useIntersectionObserver({ threshold: 1.0 });

  const fetchAnime = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await animeService.getTopAnime(page, itemsPerPage);
      const newAnimes = response.data;

      setAnimeList((prev) => [...prev, ...newAnimes]);

      totalLoadedRef.current += newAnimes.length;

      if (totalLoadedRef.current >= maxItems || !response.pagination.has_next_page) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Failed to fetch anime:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    if (isVisible && hasMore && !isLoading && totalLoadedRef.current < maxItems) {
      (async () => {
        await fetchAnime();
      })();
    }
  }, [isVisible, hasMore, fetchAnime, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md sticky top-0">
        <h1 className="text-2xl font-bold">Anime List</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
        >
          Logout
        </button>
      </header>

      <main className="p-4">
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {animeList.map((anime: Anime) => (
            <li key={anime.mal_id} className="bg-gray-800 rounded overflow-hidden shadow-lg">
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="p-2 text-sm font-semibold truncate">{anime.title}</h3>
            </li>
          ))}
        </ul>

        <div ref={containerRef} className="h-10" />

        {isLoading && <p className="text-center mt-4">Loading more...</p>}
        {!hasMore && animeList.length > 0 && (
          <p className="text-center mt-4">You've reached the end!</p>
        )}
      </main>
    </div>
  );
};

export default HomePage;
