import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { fetchData,choice } from './redux/reducers/api-reducer';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faXmark } from '@fortawesome/free-solid-svg-icons'
import Card from './components/Card';
import Loader from './components/Loader';
import ChangePage from './components/ChangePage';
import { useState } from 'react';
function Films() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {queryName,page} = useParams();
    const {films} = useSelector(state => state)
    const {qtyFilms,qtySeries} = films.infoData;
    const {loading,error,dataFilms,dataSeries,choiceFilmSerie} = films;
    const {totalPages,totalPagesSeries} = useSelector(state=>state.films.infoData);
    const [name,setName] = useState(queryName);
    const [customHeight,setCustomHeight] = useState(false);
  
    const searchNameFilm = (e)=>{
      if(e.key==='Enter' && name){
        navigate(`/movies/${name}/1`)
       
      }
    }
    const moveFocusOnInput = ()=>{
      document.getElementById("input-search").focus();
    }

   
    useEffect(()=>{
      
      setCustomHeight(true);
      if(!loading){
        if(choiceFilmSerie ==='Films' && (dataFilms.length === 0 || (dataFilms.length < 4 && totalPages === 1) )){
          setCustomHeight(true);
          
          
        }
        else if(choiceFilmSerie ==='Series' && (dataSeries.length === 0 || dataSeries.length < 4 && totalPagesSeries === 1)){
          setCustomHeight(true);
          
          
        }else{
          setCustomHeight(false);
         
        }
      }
      
    },[choiceFilmSerie,loading])
    useEffect(()=>{
      
      if(dataFilms.length < 1){
        dispatch(fetchData(`&query=${queryName}&page=${page}`,queryName))
      }
      if(dataFilms.length >= 1){
        dispatch(fetchData(`&query=${queryName}&page=${page}`,queryName))
      }
    },[page,queryName])
    useEffect(()=>{
      dispatch(choice(localStorage.choice ? localStorage.choice : 'Films' ))
    },[])
    
    const styleDisplayFlex = dataFilms.length >= 1 ? {display:'flex',flexDirection:'column'} : {width:'100%',display:'flex',alignItems:'center'}
   
  return (
    <div className={`films ${customHeight ? 'customHeigth' :''}`}>
   
      <div className="search-films">
        <div className="input-container-films">
          <input id='input-search' placeholder={'Scrivi un titolo..'} onKeyDown={searchNameFilm} onChange={(e)=>setName(e.target.value)} value={name} type="text" />
          
        </div>
        <div onClick={()=>{moveFocusOnInput();setName('')}}  className="x">
          <FontAwesomeIcon  icon={faXmark} />
        </div>
        <Link to={name && `/movies/${name}/1`} className="cerca" > 
          <FontAwesomeIcon  icon={faMagnifyingGlass} />
        </Link>
      </div>
      <div className="details-films-tv">
        <div className='details-container'>
          <div className='detail'>
            <div className='search-result'>Search Result</div>
            <div className='films-series'>
              <Link  to={`/movies/${queryName}/1`} className={`link-film ${(choiceFilmSerie ==='Films' && dataFilms.length >= 1) ? 'active-detail' :''}`} onClick={()=>{dispatch(choice('Films'))}}>
                <div>{loading ? 'Serie Tv' : !loading && dataFilms.length >= 1 ? 'Films' : 'Nessun Film Trovato'}</div>
                <div className='qty'>  {loading ? "0" : qtyFilms}</div>
                
              </Link>
              <Link to={`/movies/${queryName}/1`} className={`link-film ${choiceFilmSerie==='Series' && dataSeries.length >= 1 ? 'active-detail' :''} ${qtySeries >= 1 ? '' : "no-click"}`} onClick={()=>{dispatch(choice('Series'))}}>
                <div>{loading ? 'Serie Tv' : !loading && dataSeries.length >= 1 ? 'Serie Tv' : 'Nessuna Serie Trovata'}{dataSeries.length > 1}</div>
                <div className={`qty ${qtySeries >= 1 ? '' :{cursorPointer:'none'} }`}>  {!loading && qtySeries >= 1 ? qtySeries  :'0' }</div>
              </Link>
            </div>
          </div>
         
        </div>
        <div className="films-cards-container" style={styleDisplayFlex}>
          
          {
            loading && !error.staus 
          ? 
            <Loader/> 
          :
            error.status && !loading 
          ? 
            <h1 className='intestation' style={{color:'red'}}>Errore nel server</h1>
          :
            !error.status && !loading && dataFilms.length === 0 
          ? 
            <h1 className='intestation' style={{color:'red'}}>Titolo non valido</h1> 
          :
          choiceFilmSerie ==='Films' ? 
            dataFilms.map(el=>{
              return <Card key={el.id} {...el} />
            })
            :
            dataSeries.map(el=>{
              return <Card key={el.id} {...el} />
            })
          }
          
        </div>
      </div>
    
      {(!loading && dataFilms.length >= 1) && <ChangePage /> }
      
    
    </div>
  )
}

export default Films