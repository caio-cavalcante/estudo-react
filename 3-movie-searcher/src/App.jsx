import { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';

// secutiry by using dotenv to hide API key and base URL
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = import.meta.env.VITE_BASE_URL;

const App = () => {
    // states are being used to store data and update the UI
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // the searchMovies function is being used to fetch data from the API and update the state
    const searchMovies = async (title) => {
        const res = await fetch(`${baseUrl}?apiKey=${apiKey}&s=${title}`);
        const data = await res.json();

        if(data.Search) {
            setMovies(data.Search);
        } else if (data.Error) {
            console.error(data.Error);
        }
    };
    
    return (
        <div className="app">
            <h1>Movie Lost & Found</h1>

            <div className="search">
                <input 
                    placeholder='Search for a movie' // placeholder is being used to give a hint to the user
                    value={searchTerm} // the value of the input will be used to update the state
                    onChange={(e) => setSearchTerm(e.target.value)} // the onChange 'tells' react to update the state and setSearchTerm updates the state with the variable from the user's input
                />

                <button onClick={() => searchMovies(searchTerm)}>
                    Search
                </button>
            </div>

            {/* to render the list, the map function is being used as a 'for each' loop 
            if there is a movie set in the state, the map will create a new component of MovieCard for each movie in the JSON response
            */}
            {movies?.length > 0 ? (
                <div className="movie-container">
                    {movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie}></MovieCard>
                    ))}
                </div>
            ) : (
                <div className="empty-container">
                    <h2>No movies found.</h2>
                </div>
            )}
            {/* if there are no movies in the state, the message will be displayed */}
        </div>
    );
};

export default App;