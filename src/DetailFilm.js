import React, { useEffect } from 'react'
import { fetchDataId } from './redux/reducers/api-reducer';
import {useSelector,useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Loader from './components/Loader';
function DetailFilm() {
  const {id}=useParams();
  const {films} = useSelector(state => state)
  const {loading,detailFilm} = films;
  const dispatch = useDispatch();
  useEffect(()=>{
    
    dispatch(fetchDataId(id,localStorage.ricerca))
    
  },[])
  
  const checkBackgroundImage = detailFilm.backdrop_path ? `url(https://image.tmdb.org/t/p/original/${detailFilm?.backdrop_path})` : '';
  return (
    
    <div className={`detail-film-container ${!loading ? 'customHeigth' :''}`}>
      {loading ? <div className="loader-detail-film">
          <Loader/>
        </div> :    
        <div className="detail-film" style={ 
          checkBackgroundImage 
          ? {
            backgroundImage: checkBackgroundImage
          } 
          : {
            backgroundColor : '#66b9f0'
          }}>
          <div className={checkBackgroundImage ? 'overlay' : 'overlay2'}>
            <div className='film-text'>
              <h2 className='title'>{detailFilm.title}</h2>

              {detailFilm.genres?.map((el)=>{
                return <span className='genres-film' key={el.id}> {el.name} </span>
              })}
              <div className='score'> <span>Score : {detailFilm.vote_average || "voto mancante"} </span> </div>
              <p className='overview'>{detailFilm.overview || "trama mancante"}</p>
            </div>
            <Link to={`/movies/${localStorage.ricerca}/${localStorage.pagina}`}>
              <button style={{backgroundImage: checkBackgroundImage}} className='button-back'>
                <div className="overlay-button">
                  <FontAwesomeIcon className='arrow-back' icon={faArrowLeft} />
                </div>
              
              </button>
            </Link>
            
          </div>

        </div>}
   
    </div>
  

  )
}

export default DetailFilm