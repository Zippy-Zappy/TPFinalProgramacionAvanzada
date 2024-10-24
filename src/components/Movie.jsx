import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MovieCard } from './MovieCard';
import getData from '../utils/getData';
import '../styles/styles.css'

const Movie = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true);
    const [trailerId, setTrailerId] = useState(null)
    const [showingTrailer, setShowingTrailer] = useState(false)

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieData = await getData(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
                setMovie(movieData);

                const trailersResponse = await getData(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
                const trailers = trailersResponse.results

                const youtubeTrailer = trailers.find(trailer => trailer.site === 'YouTube' && trailer.type === 'Trailer')
                if (youtubeTrailer) {
                    setTrailerId(youtubeTrailer.key)
                }

            } catch (error) {
                console.error("Error fetching movie details:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMovieDetails();
    }, [id]);

    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!movie){
        <>
        <div>No movie found.</div>
        </>
    }

    const handleShowTrailer=() => {
        setShowingTrailer(!showingTrailer)
    }
    return (
        <>
        <div className='Movie-details'>
            <MovieCard key={movie.id} id={movie.id} title={movie.title} poster_path={movie.poster_path} />
            <article className="Movie-extra-details">
                <Link to='/'>Go back</Link>
                <h3>Summary: <span>{movie.overview ? movie.overview : 'None'}</span></h3>
                <h3>Release date: <span>{movie.release_date || 'Unknown or TBA'}</span></h3>
                <h3>Runtime: <span>{movie.runtime ? `${movie.runtime} minutes.` : 'Unknown or TBA'}</span></h3>
                <h3>Rating: <span>{movie.vote_average || 'N/A'}</span></h3>
                {showingTrailer && trailerId &&(
                    <>
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginTop: '20px' }}>
                        <iframe
                                title="Youtube trailer:"
                                src={`https://www.youtube.com/embed/${trailerId}`}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                allowFullScreen />
                            <button onClick={handleShowTrailer}                         
                            style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px', 
                                background: 'white', 
                                border: 'none', 
                                padding: '5px', 
                                cursor: 'pointer' 
                            }}>Close</button>
                    </div>
                    </>
                )}
                {!showingTrailer &&(
                    <button onClick={handleShowTrailer} className='movie-button'>Watch trailer</button>

                )}
            </article>
        </div>
        </>
    )
}
export default Movie;