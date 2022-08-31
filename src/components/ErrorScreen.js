import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {pageNotFound} from '../redux/reducers/api-reducer';
 
function ErrorScreen() {
  const {error} =useSelector(state =>state.films);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(pageNotFound());
  },[])
 
  return (
    <div className='error-screen'>
      <h1 className='intestation' style={{color:'red'}}>
        {error.message}
      </h1>
    </div>
  )
}

export default ErrorScreen