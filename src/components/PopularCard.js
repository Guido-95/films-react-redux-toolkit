import React from 'react'
import { Link  } from "react-router-dom";
function PopularCard({poster_path,title,vote_average,id,media_type,name}) {
    const arrotondaPercentuale = (numero)=>{
      if(numero === 0){
        return "NV";
      }
      if(numero !== 10){
        let numeroTrasformato = numero.toFixed(1).toString();
        numeroTrasformato = numeroTrasformato[0] + numeroTrasformato[2];
        return numeroTrasformato;
      }
      return 100;
        
    }
    
  return (
    
    <Link to={`/${media_type}/${id}`} className='popular-card'>
      {console.log(arrotondaPercentuale(vote_average))}
        <div className='img-container'>
          <img className='img-popular-card' src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt="" />
          <div className={`percentual ${ arrotondaPercentuale(vote_average) >= 75 ? 'percentual-green' : arrotondaPercentuale(vote_average) >= 50 ? 'percentual-yellow' : arrotondaPercentuale(vote_average) === "NV" ? 'no-percentual' : 'percentual-red' } `}>{arrotondaPercentuale(vote_average)}</div> 
            
        </div>
        
        <div className={`name-popular-card ${title?.length > 35 || name?.length > 35 ? 'small':''}`}>{title || name}</div>
        
    </Link>
   
  )
}

export default PopularCard