import React from 'react'
import { Link  } from "react-router-dom";
function Card({poster_path,title,id,overview,media_type,name}) {
  return (
 
    <Link className='link-to-detail-film' to={`/${media_type}/${id}`}>
      <div className='card'>
      
        <div className="img-film">
          {poster_path ?  
            <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt="" /> :
            <div className="error-img">
              <h4>Immagine mancante</h4>
              <img src={`https://blumagnolia.ch/wp-content/uploads/2021/05/placeholder-126.png`} alt="" />
            </div>
          }
        </div>
        <div className='details-card'>
          <h3>{title || name}</h3>
          <p>{overview ? overview : "" ? "":'Trama Ita Mancante' }</p>
        </div>
      </div>
    </Link>
  )
}

export default Card