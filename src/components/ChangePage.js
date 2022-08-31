import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {increasePage,decreasePage} from '../redux/reducers/api-reducer';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons'
function ChangePage() {
    const {loading} = useSelector(state => state.films)
    const {hasNextPage,hasPrevPage} = useSelector(state => state.films.pagination);
    const {currentPage,totalPages} = useSelector(state=>state.films.infoData);
    const {films}= useSelector(state=>state);
    const {query} = films;
    const dispatch = useDispatch();
    const checkPages = (currentPage,totalPages)=>{
        let arrayPages = Array.from({length:totalPages},(el,index)=>{
            return (index + 1);
        })
        
        if(currentPage - 6 <= 0){
            return arrayPages.slice(0, currentPage + 3);
        }
        return arrayPages.slice(currentPage - 4, currentPage + 3);
    }
    const checkIncreasePage = (page,totalPages)=>{
        
        if(page + 1 <= totalPages){
            dispatch(increasePage()); 
        }

    }
    const checkDecreasePage =(page)=>{
        if(page - 1 !== 0){
            dispatch(decreasePage());
        }
    }
    const [size,setSize] = useState(window.innerWidth);
    const dimensioneFinestra = ()=>{
        setSize(window.innerWidth);
    }
   
    useEffect(()=>{
        window.addEventListener('resize', dimensioneFinestra);
        return ()=>{
            window.removeEventListener('resize',dimensioneFinestra);
        }
    })
    
    return (
        totalPages > 1 ?
        <div className={`change-page '}`}>
            
            <Link to={`/movies/${query}/${currentPage - 1}`}  className={`button-pages ${hasPrevPage && !loading ? '' :'visibility-hidden'}`} onClick={()=>{checkDecreasePage(currentPage,totalPages)}}><FontAwesomeIcon className='arrow-back' icon={faArrowLeft} /></Link>
            
            <div className='number-pages'>
                {currentPage - 6 >= 1 && size > 768 && <Link className='first-link-bottom' to={`/movies/${query}/1`}>...1</Link>}
                
                {checkPages(currentPage,totalPages).map((el,index)=>{
                    if(currentPage === el){
                        return <Link to={`/movies/${query}/${el}`} className='link-bottom active' style={{ pointerEvents: 'none' }} key={index}>{el}</Link>
                    }
                    return <Link to={`/movies/${query}/${el}`} className='link-bottom' key={index}>{el}</Link>
                })}

                {(currentPage !== totalPages && currentPage + 5 < totalPages && size > 768) && <Link className='last-link-bottom' to={`/movies/${query}/${totalPages}`}>...{totalPages}</Link>}
                
            </div>

            <Link to={`/movies/${query}/${currentPage + 1}`}  className={`button-pages ${hasNextPage && !loading ? '' :'visibility-hidden'}`} onClick={()=>{checkIncreasePage(currentPage,totalPages)}}><FontAwesomeIcon className='arrow-back' icon={faArrowRight} /></Link>
        
        </div>: ''
    )
    }

export default ChangePage