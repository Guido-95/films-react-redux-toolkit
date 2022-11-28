import './App.css';
import { useEffect,useState } from 'react';
import { useNavigate,Link,useLocation  } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchDataCategories,fetchPopularFilms } from './redux/reducers/api-reducer';
import { useSelector } from 'react-redux';
import PopularCard from './components/PopularCard';
function App() {
  const navigate  = useNavigate();
  const dispatch =useDispatch();
  const location =useLocation();
  const {popularFilms,popularFilms2} = useSelector(state => state.films);
  const [categoria,setCagetoria] = useState('movie');
  const [popular,setPopular] = useState('movie');

  useEffect(()=>{
    localStorage.clear();
    dispatch(fetchDataCategories(categoria));
    dispatch(fetchPopularFilms(popular));

  },[])
  useEffect(()=>{
    let myDiv = document.getElementsByClassName('categories-film');
    myDiv[0].scrollLeft  = 0;
    myDiv[0].classList.add('opacityChange');
    setTimeout(() => {
      
      if(myDiv[0]===undefined){
        return;
      }else{
        myDiv[0].classList.remove("opacityChange");
      }
    }, 2100);
    
  },[categoria,location.pathname])
  
  useEffect(()=>{
    let myDiv = document.getElementsByClassName('categories-film');
 
    

    myDiv[1].scrollLeft  = 0;
    myDiv[1].classList.add('opacityChange');
    myDiv[1].classList.add('opacityChange');
    setTimeout(() => {
      if(myDiv[1]===undefined){
        return;
      }else{
        myDiv[1].classList.remove("opacityChange");
      }
    }, 2100);
    
  },[popular,location.pathname])

 
  const searchNameFilm = (e)=>{
    if(e.key==='Enter' && name){
      navigate(`/movies/${name}/1`)
     
    }
  }
  const [name,setName] = useState('');
  
  return (
    
    <div className="App" style={{display:'flex',alignItems:'center'}} >
      
      <div className="home">
        <div className="intestation-home">
          <h2>Benvenuto.</h2>
          <h4>Milioni di film, serie TV e persone da scoprire. Esplora ora.</h4>
          <div className="input-container">
          
            <input className='input-name-home' placeholder={'Scrivi un titolo..'} onKeyDown={searchNameFilm} onChange={(e)=>setName(e.target.value)} value={name} type="text" />
            <Link to={name && `/movies/${name}/1`} className="" >
              <button className='button-name-home' >Cerca</button>

            </Link>
          </div>
          
        </div>
        <section>
          <div className="categories-films-container">
            <h4>Ultime uscite</h4> 
            <div className='categories'>
              <div style={categoria ==='movie' ? {
                position:'absolute',
                top:0,
                left:-1,
                height:'100%',
                width:'120px',
                borderRadius:'20px',
                backgroundColor:'rgba(3,37,65)',
                transition:'0.2s',
                zIndex: '-1'
              } : 
                { position:'absolute',
                  height:'100%',
                  width:'80px',
                  top:0,
                  left:115,
                  borderRadius:'20px',
                  backgroundColor:'rgba(3,37,65)',
                  transition:'0.2s',
                  zIndex: '-1'
                }}>
                  
              </div>
            
              <div  className={`categoria ${categoria ==='movie' ? 'active' : ''}`} onClick={()=> dispatch(fetchDataCategories('movie'),setCagetoria('movie'))}>

                Streaming
              </div>
              <div className={`categoria ${categoria ==='tv' ? 'active' : ''}`} onClick={()=> dispatch(fetchDataCategories('tv'),setCagetoria('tv'))}>In Tv</div>
              
          
            </div>
          </div>
          <div className="categories-film">
            
            {popularFilms.map(el=>{
              return <PopularCard key={el.id} {...el}/>
            })} 
          </div>
        </section>
      
        <section>
          <div className="categories-films-container">
            <h4>Più popolari</h4>

            <div className='categories'>
         
              <div style={popular ==='movie' ? {
                  position:'absolute',
                  top:0,
                  left:-1,
                  height:'100%',
                  width:'80px',
                  borderRadius:'20px',
                  backgroundColor:'rgba(3,37,65)',
                  transition:'0.2s',
                  zIndex: '-1'
                } : 
                  { position:'absolute',
                    height:'100%',
                    width:'108px',
                    top:0,
                    left:65,
                    borderRadius:'20px',
                    backgroundColor:'rgba(3,37,65)',
                    transition:'0.2s',
                    zIndex: '-1'
                  }}>
                    
              </div>
              <div className={`categoria ${popular ==='movie' ? 'active' : ''}`} onClick={()=> dispatch(fetchPopularFilms('movie'),setPopular('movie'))}>Film</div>
              <div className={`categoria ${popular ==='tv' ? 'active' : ''}`} onClick={()=> dispatch(fetchPopularFilms('tv'),setPopular('tv'))}>Serie Tv</div>
              
          
            </div>
          </div>
          <div className="categories-film">
          
            {popularFilms2.map(el=>{
              
              return <PopularCard key={el.id} {...el}/>
            })} 
          </div>
        </section>
        
      </div>
       
    
  
    </div>
  );
}

export default App;
