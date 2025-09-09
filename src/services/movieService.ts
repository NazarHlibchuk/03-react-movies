import axios, { AxiosResponse } from "axios";
import { Movie } from "../types/movie";


const BASE_URL = "https://api.themoviedb.org/3/search/movie";


interface FetchMoviesResponse {
results: Movie[];
}


export const fetchMovies = async (query: string): Promise<Movie[]> => {
const response: AxiosResponse<FetchMoviesResponse> = await axios.get(
BASE_URL,
{
params: { query },
headers: {
Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
},
}
);
return response.data.results;
};