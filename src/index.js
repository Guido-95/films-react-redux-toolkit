import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import DetailFilm from './DetailFilm';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorScreen from './components/ErrorScreen';
import store from './redux/store'
import Films from './Films';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/movies/:queryName/:page' element= {<Films />} />
          <Route path='/:type/:id' element= {<DetailFilm />} />
      
          <Route path='*' element={<ErrorScreen />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>

);

