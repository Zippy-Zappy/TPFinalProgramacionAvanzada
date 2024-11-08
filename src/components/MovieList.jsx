import React, { useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { Header } from './Header';
import getData from '../utils/getData';
import '../styles/styles.css';

const ITEMS_PER_PAGE = 3;

const MovieList = ({movieSearch, triggerSearch}) => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US'

                if (movieSearch){
                    url = `https://api.themoviedb.org/3/search/movie?query=${movieSearch}&include_adult=false&language=en-US&page=1`;
                }
                
                const moviesData = await getData(url);
                setMovies(moviesData.results);
            } catch (error) {
                console.log("Error fetching data: ", error)
                setError(error.message);
            }
        };

        fetchData();
    }, [movieSearch, triggerSearch]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect( () => {
        setCurrentPage(1)
    }, [movieSearch, triggerSearch])

    const totalPages = Math.max(1, Math.ceil(movies.length / ITEMS_PER_PAGE));
    

    // useEffect(() => {
    //     if (currentPage > totalPages) {
    //         setCurrentPage(totalPages)
    //     }
    // }, [movies.length, totalPages, currentPage])
    
    const indexOfLastMovie = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstMovie = indexOfLastMovie - ITEMS_PER_PAGE;

    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="Movies">
                {currentMovies.map(movie => (
                    <MovieCard key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path}/>
                ))}
            </div>

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieList;