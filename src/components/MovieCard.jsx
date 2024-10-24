import { Link } from 'react-router-dom';

export function MovieCard({
    id,
    title,
    poster_path
}) {
    const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

    return (
        <article className="Movie-card" key={id}>
            <Link to={`/${id}`}>
                <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={`Poster of ${title}`}/>
                <h2>{title}</h2>
            </Link>
        </article>  
    )
}