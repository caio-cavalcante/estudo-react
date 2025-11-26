import { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';

const apiUrl = import.meta.env.OMDB_API_URL;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const res = await fetch(`%{OMDB_API_URL}&s=${title}`);
        const data = await res.json();

        if(data.Search) {
            setMovies(data.Search);
        } else if (data.Error) {
            console.error(data.Error);
        }
    };
};