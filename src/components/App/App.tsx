import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";
import type { FetchMoviesResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import styles from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<FetchMoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });


  useEffect(() => {
    if (!data) return;
    if (data.results.length === 0) {
      toast("No movies found for your request.");
    }
  }, [data]);

  function handleSearch(newQuery: string) {
    if (!newQuery.trim()) {
      toast("Please enter your search query.");
      return;
    }
    setQuery(newQuery);
    setPage(1);
  }

  function handleSelectMovie(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && data && (
          <>
            {totalPages > 1 && (
              <Pagination pageCount={totalPages} page={page} setPage={setPage} />
            )}
            {data.results.length > 0 && (
              <MovieGrid movies={data.results} onSelect={handleSelectMovie} />
            )}
          </>
        )}
      </main>

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
}
