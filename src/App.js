
import './App.css';
import { useEffect } from 'react';
function App() {
  useEffect(()=>{
    localStorage.clear();
 
  },[])
  
  return (
    
    <div className="App" style={{display:'flex',alignItems:'center'}} >
    
      <h1 className='intestation' style={{color:'white'}}>Cerca un film</h1>
  
    </div>
  );
}

export default App;
