import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { fetchData } from './redux/reducers/api-reducer';
import { useParams } from 'react-router-dom';
import Card from './components/Card';
import Loader from './components/Loader';
import ChangePage from './components/ChangePage';
function Films() {
    const dispatch = useDispatch();
    const {query,page} = useParams();
    const {films} = useSelector(state => state)
    const {qtyFilms} = films.infoData;
    const {loading,error,dataFilms} = films;
 
   
    useEffect(()=>{
      if(dataFilms.length < 1){
        dispatch(fetchData(`?query=${query}&page=${page}`,query))
      }
      if(dataFilms.length >= 1){
        dispatch(fetchData(`?query=${query}&page=${page}`,query))
      }
    },[page,query])

    
    const styleDisplayFlex = dataFilms.length >= 1 ? {display:'flex', flexWrap:'wrap'} : {width:'100%',display:'flex',alignItems:'center'}
    
  return (
    <div className={`films ${loading || error.status || (dataFilms.length === 0 || dataFilms.length < 5 ) ? 'customHeigth' :''}`}>
      {
        (dataFilms.length >= 1 && !loading) && 
        <div className='film-info'>
          
          <h3>Risultati : {qtyFilms}</h3>
        
          
        </div> 
      }
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
          dataFilms.map(el=>{
            return <Card key={el.id} {...el} />
          })
        }
        
      </div>
      {(!loading && dataFilms.length >= 1) && <ChangePage /> }
      
    
    </div>
  )
}

export default Films