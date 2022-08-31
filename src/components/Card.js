import React from 'react'
import { Link  } from "react-router-dom";
function Card({poster_path,title,id}) {
  return (
    <div className='card'>
      <Link className='link-to-detail-film' to={`/movie/${id}`}>
        <h3>{title}</h3>
        <div className="img-film">
          {poster_path ?  
          <img src={`https://image.tmdb.org/t/p/w300/${poster_path}`} alt="" /> :
          <div className="error-img">
            <h4>Immagine mancante</h4>
            <img src={`https://blumagnolia.ch/wp-content/uploads/2021/05/placeholder-126.png`} alt="" />
          </div>
        }
        </div>
      </Link>
    </div>
  )
}

export default Card