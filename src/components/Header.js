import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
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
  },[])
   
  
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
     
      
      <Link to="/" className='logo-link' onClick={resetPage}><img className='logo' alt='logo' src={logo} />
        <span>
          React Films
        </span>
      </Link>
      
      <div className="search-films">
          <input placeholder={'Scrivi un titolo..'} onKeyDown={searchNameFilm} onChange={(e)=>setName(e.target.value)} value={name} type="text" />
          <Link to={name && `/movies/${name}/1`} className="cerca" > <FontAwesomeIcon  icon={faMagnifyingGlass} />
          </Link>
      </div>
     

    </header>
  )
}

export default Header