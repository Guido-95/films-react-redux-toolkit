import { createSlice} from "@reduxjs/toolkit";
import {instance,instanceId} from "../../api";

const initialState = {
    loading:false,
    query:'',
    error:{
        status:false,
        message:''
    },
    dataFilms:[],
    detailFilm:{},
    pagination:{
        hasNextPage:false,
        hasPrevPage:false,
    },
    infoData:{
        qtyFilms:0,
        currentPage:1,
        totalPages:0
    }
};


const saveDataLocalStorage = (action) =>{
    if(action.type.endsWith("/saveData")){
        return true;
    }
    if(action.type.endsWith("/singleFilm")){
        return true;
    }
    
}

const apiSlice = createSlice({
    name:"api",
    initialState,
    reducers:{
        startLoading:(state)=>{
            state.loading = true;
            state.dataFilms =[];
        },
        stopLoading:(state)=>{
            state.loading = false;
        },
        saveData :(state,action) => {
            state.dataFilms = action.payload;
        },
       
        catchError : (state,action)=>{
            state.error.status = true;
            state.error.message= action.payload.message;
            state.dataFilms =[];
        },
        pageNotFound : (state)=>{
            state.error.status = true; 
            state.error.message= '404 Pagina non trovata';
        },
        cleanError: (state)=>{
            state.error.status = false;
            state.error.message ='';
        },
        checkPagination : (state,action)=>{
            state.pagination.hasNextPage = action.payload.hasNextPage;
            state.pagination.hasPrevPage = action.payload.hasPrevPage;
        },
        checkInfoFilms:(state,action)=>{
            state.infoData.currentPage = action.payload.page;
            state.infoData.qtyFilms = action.payload.qtyFilms;
            state.infoData.totalPages = action.payload.totalPages
        },
        setQuery:(state,action)=>{
            state.query= action.payload;
        },
        increasePage:(state)=>{
            state.infoData.currentPage = state.infoData.currentPage + 1;
        },
        decreasePage:(state)=>{
            state.infoData.currentPage = state.infoData.currentPage - 1;
        },
        singleFilm:(state,action)=>{
            state.detailFilm = action.payload;
        },
        resetFilms: (state) =>{
            state.dataFilms = []
            
        },
     
    },
    extraReducers: (builder) => {
        builder
          .addMatcher(saveDataLocalStorage, state =>{
            localStorage.setItem("ricerca",state.query);
            localStorage.setItem("pagina",state.infoData.currentPage);
          })
          .addDefaultCase(state=>{
            return state;
          })
      },

});

const {startLoading,singleFilm,setQuery,checkInfoFilms,stopLoading,saveData,catchError,cleanError,checkPagination}= apiSlice.actions;
const {reducer} = apiSlice;
export const {increasePage,decreasePage,resetFilms,pageNotFound} = apiSlice.actions;

export const fetchData = (name,nameQuery)=> async (dispatch)=>{

    dispatch(startLoading());
    dispatch(cleanError());
    try {
        
        const response = await instance.get(name);
        dispatch(setQuery(nameQuery));
        dispatch(saveData(response.data.results));
        
        const pagionationInfo = {
            hasNextPage: response.data.page + 1 <= response.data.total_pages,
            hasPrevPage: response.data.page - 1 !== 0,
        }
        dispatch(checkPagination(pagionationInfo));

        const infoData ={
            page:response.data.page,
            qtyFilms:response.data.total_results,
            totalPages:response.data.total_pages
        }
        
        dispatch(checkInfoFilms(infoData))
        
    } catch (error) {
        dispatch(catchError(error))
    }
    dispatch(stopLoading())
    
    }
export const fetchDataId = (id,nameQuery)=> async (dispatch)=>{
    dispatch(startLoading());
    dispatch(cleanError());
    
    
    try {
        const response = await instanceId.get(id);
        dispatch(setQuery(nameQuery));
        dispatch(singleFilm(response.data));
        
        
    } catch (error) {
        console.log(error);
    }
    
    
    dispatch(stopLoading())
}
export default reducer;