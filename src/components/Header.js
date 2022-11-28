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
          <span>
            React Films
          </span>
        </Link>
      </div>
    </header>
  )
}

export default Header