import axios from "axios";
import type { FetchMoviesResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(query: string, page = 1): Promise<FetchMoviesResponse> {
  const response = await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
    params: { query, page },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data;
}
