import {configureStore} from "@reduxjs/toolkit";
import apiReducer from "./reducers/api-reducer";


const store = configureStore({ 
        reducer:{
           films:apiReducer
        }
    }
)


export default store;