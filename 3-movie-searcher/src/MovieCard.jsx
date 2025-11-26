import React from 'react'

// movie is being passed as a prop, a parameter for the code to use
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
        <header>{movie.Title}</header> {/* fetches the movie's title and inserts as the component header */}

        <div> {/* if there isnt a poster for the movie, a placeholder will be used */}
            <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} 
                alt={movie.Title} 
            />
        </div>

        <footer> {/* simply uses the data parsed by the object in props as information */}
            <span>{movie.Type}</span>
            <h3>{movie.Year}</h3>
        </footer>
    </div>
  )
}

export default MovieCard