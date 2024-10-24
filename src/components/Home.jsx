import React, { useEffect, useState } from 'react';
import '../styles/styles.css'
import MovieList from './MovieList';

const Home = ({movieSearch, triggerSearch}) => {
    return (
        <div>
            {movieSearch === '' ? (
                <h1>Trending:</h1>
            ) : null}
            <MovieList movieSearch={movieSearch} triggerSearch={triggerSearch}/>
        </div>
    );
};
export default Home