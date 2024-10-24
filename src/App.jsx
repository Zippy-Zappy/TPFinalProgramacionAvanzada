import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Header } from './components/Header';
import Movie from './components/Movie';
import MovieList from './components/MovieList';
import './styles/styles.css'

function App() {
  const [movieSearch, setMovieSearch] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  return (
    <Router>
      <div className='app'>
        <div className='header'>
          <Header setMovieSearch={setMovieSearch} setTriggerSearch={setTriggerSearch}/>
        </div>
        <div className='home'>
          <Routes>
            <Route path='/' element={<Home movieSearch={movieSearch} triggerSearch={triggerSearch}/>} />
            <Route path='/:id' element={<Movie />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
