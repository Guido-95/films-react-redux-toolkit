import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { Link  } from "react-router-dom";
import { useNavigate  } from "react-router-dom";
import {resetFilms} from '../redux/reducers/api-reducer';
import {useLocation} from 'react-router-dom';
import logo from '../assets/video-camera.png'
function Header() {
  const location = useLocation();
  const navigate  = useNavigate();
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    if(location.pathname === '/'){
      resetPage();
      
    }
  },[location.pathname])
   

  const [name,setName] =  useState(localStorage.ricerca || "");

  const resetPage = ()=>{
    setName('');
    dispatch(resetFilms());
  }
  const searchNameFilm = (e)=>{
    if(e.key==='Enter' && name){
      navigate(`/movies/${name}/1`)
      
    }
  }
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className='logo-link' onClick={resetPage}><img className='logo' alt='logo' src={logo} />
          <div>
            React Films
          </div>
         
        </Link>
        <div className='terms'>

          This product uses the TMDB API but is not endorsed or certified by TMDB.
          <a href="https://www.themoviedb.org/?language=it-IT">
            <img className='img-terms' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" />

          </a>
        </div> 
      </div>
      {/* <div>

        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div> */}
    </header>
  )
}

export default Header