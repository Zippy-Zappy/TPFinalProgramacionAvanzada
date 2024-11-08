import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from './MovieList';

export const Header = ({setMovieSearch, setTriggerSearch}) => {
    let movieSearchInput = ''
    const navigate = useNavigate()

    const handleChange = (e) => {
        movieSearchInput = e.target.value
    }

    const backToTrending = () => {
        movieSearchInput = ''
        setMovieSearch(movieSearchInput)
        setTriggerSearch = ((prev) => (!prev))
        navigate('/')
    }

    const handleSearch = () => {
        console.log("Search initiated with:", movieSearch);
        setMovieSearch(movieSearchInput)
        setTriggerSearch = ((prev) => (!prev)) //Activa el trigger - indica que se hizo una search
        navigate('/')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
    return (
        <><div className='header-container'>
            <h2>Search movies</h2>
            <input className="search-input"
                id="movieSearch"
                type="text"
                placeholder="Search movie by title"
                onChange={handleChange}
                onKeyDown={handleKeyDown}>

            </input>
            <button className="search-button"
                type="button" onClick={handleSearch}>Search</button>
        </div><button className="search-button"
            type="button" onClick={backToTrending}>Back to Trending</button></>
    )
}