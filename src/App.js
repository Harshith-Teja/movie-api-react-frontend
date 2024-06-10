import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
function App() {

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
      try {
        const response = await api.get("/api/v1/movies")
        //console.log(response.data)
        setMovies(response.data)
      }
      catch(err) {
        console.log(err)
      }
  }

  const getMovieData = async (movieId) => {

     try {
      const response = await api.get(`/api/v1/movies/${movieId}`)
      const singleMovie = response.data
      setMovie(singleMovie)
      setReviews(singleMovie.reviewIds)

     }catch(err) {
       console.error(err)
     }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home movies={movies}/>} />
            <Route path="Trailer/:ytTrailerId" element={<Trailer />} />
            <Route path="Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
