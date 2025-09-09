import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from "./components/MovieModal/MovieModal";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import "modern-normalize/modern-normalize.css";


export default function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


const handleSearch = async (query: string) => {
setMovies([]);
setError(false);
setLoading(true);
try {
const results = await fetchMovies(query);
if (!results.length) {
toast.error("No movies found for your request.");
}
setMovies(results);
} catch (err) {
setError(true);
} finally {
setLoading(false);
}
};


return (
<>
<SearchBar onSubmit={handleSearch} />
{loading && <Loader />}
{error && <ErrorMessage />}
{!loading && !error && <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
{selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
<Toaster position="top-right" />
</>
);
}

