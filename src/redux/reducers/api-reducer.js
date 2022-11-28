import { createSlice} from "@reduxjs/toolkit";
import {instance,instanceId,instanceTvId,instanceTv} from "../../api";
import axios from "axios";
const initialState = {
    loading:false,
    query:'',
    error:{
        status:false,
        message:''
    },
    popularFilms:[],
    freeFilms:[],
    dataFilms:[],
    dataSeries:[],
    dataSeriesEn:[],
    detailFilm:{},
    popularFilms2:[],
    detailTv:{},
    choiceFilmSerie:'',
    pagination:{
        hasNextPageSeries:false,
        hasPrevPageSeries:false,
        hasNextPage:false,
        hasPrevPage:false,
    },
    infoData:{
        qtySeries:0,
        currentPageSeries:0,
        totalPagesSeries:0,
        qtyFilms:0,
        currentPage:1,
        totalPages:0
    }
};


const saveDataLocalStorage = (action) =>{
    if(action.type.endsWith("/saveData")){
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
    
            state.dataFilms = action.payload[0].map((el)=>{
                return {...el,media_type:'movie'}
            });
            state.dataSeries= action.payload[1].map((el)=>{
                return {...el,media_type:'tv'}
            });
        },
        categoriesData :(state,action) =>{
            
            state.popularFilms = action.payload;
        },
        popularFilms:(state,action) =>{
           
            if(action.payload[1]==='movie'){
                state.popularFilms2 = action.payload[0].map(el=>{
                    return {...el,media_type: 'movie'}
                })
            }
            if(action.payload[1]==='tv'){
                state.popularFilms2 = action.payload[0].map(el=>{
                    return {...el,media_type: 'tv'}
                })
            }
          
            
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
            state.pagination.hasNextPage = action.payload[0].hasNextPage;
            state.pagination.hasPrevPage = action.payload[0].hasPrevPage;
            state.pagination.hasNextPageSeries = action.payload[1].hasNextPage;
            state.pagination.hasPrevPageSeries = action.payload[1].hasPrevPage;
        },
        checkInfoFilms:(state,action)=>{
            state.infoData.currentPage = action.payload[0].page;
            state.infoData.qtyFilms = action.payload[0].qtyFilms;
            state.infoData.totalPages = action.payload[0].totalPages

            state.infoData.currentPageSeries = action.payload[1].pageSeries;
            state.infoData.qtySeries = action.payload[1].qtySeries;
            state.infoData.totalPagesSeries = action.payload[1].totalPagesSeries;
         
        },
        setQuery:(state,action)=>{
            state.query= action.payload;
        },
        increasePage:(state)=>{
            state.infoData.currentPage = state.infoData.currentPage + 1;
            state.infoData.currentPageSeries = state.infoData.currentPageSeries + 1;
        },
        decreasePage:(state)=>{
            state.infoData.currentPage = state.infoData.currentPage - 1;
            state.infoData.currentPageSeries = state.infoData.currentPageSeries - 1;
        },
        singleFilm:(state,action)=>{
            state.detailFilm = action.payload;
        },
        choice:(state,action)=>{
            if(action.payload === 'Films'){
                localStorage.choice = "Films"
                state.choiceFilmSerie = "Films";
            }
            if(action.payload === 'Series'){
                localStorage.choice = "Series"
                state.choiceFilmSerie = "Series";
            }
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

const {startLoading,singleFilm,setQuery,checkInfoFilms,stopLoading,saveData,catchError,cleanError,checkPagination,categoriesData,popularFilms}= apiSlice.actions;
const {reducer} = apiSlice;
export const {increasePage,decreasePage,resetFilms,pageNotFound,choice} = apiSlice.actions;

export const fetchData = (name,nameQuery)=> async (dispatch)=>{

    dispatch(startLoading());
    dispatch(cleanError());
    try {
        
        const responseFilm = await instance.get(name);
        
        const responseSeries = await instanceTv.get(name);
      
        dispatch(setQuery(nameQuery));
        dispatch(saveData([responseFilm.data.results,responseSeries.data.results]));
        
        const pagionationInfo = {
            hasNextPage: responseFilm.data.page + 1 <= responseFilm.data.total_pages,
            hasPrevPage: responseFilm.data.page - 1 !== 0,
        }
        const pagionationInfoSeries = {
            hasNextPage: responseSeries.data.page + 1 <= responseSeries.data.total_pages,
            hasPrevPage: responseSeries.data.page - 1 !== 0,
        }
        dispatch(checkPagination([pagionationInfo,pagionationInfoSeries]));

        const infoData ={
            page:responseFilm.data.page,
            qtyFilms:responseFilm.data.total_results,
            totalPages:responseFilm.data.total_pages
        }
        const infoDataSeries ={
            pageSeries:responseSeries.data.page,
            qtySeries:responseSeries.data.total_results,
            totalPagesSeries:responseSeries.data.total_pages
        }
        
        dispatch(checkInfoFilms([infoData,infoDataSeries]))
        
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
export const fetchTvId = (id)=> async (dispatch)=>{
    dispatch(startLoading());
    dispatch(cleanError());
    
    
    try {
        const response = await instanceTvId.get(id);
   
        dispatch(singleFilm(response.data));
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
    }
    
    
    dispatch(stopLoading())
}

export const fetchDataCategories = (type)=> async (dispatch)=>{
    if(type==='movie'){
        try {
            const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT&page=1')
         
            dispatch(categoriesData(response.data.results));
           
          
        } catch (error) {
            dispatch(catchError(error))
        }
    }
    if(type ==='tv'){
        try {
            const response = await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT&page=1')
            dispatch(categoriesData(response.data.results));
        } catch (error) {
            dispatch(catchError(error))
        }
    }
    
    
    
}
export const fetchPopularFilms = (type)=> async (dispatch)=>{
    if(type==='movie'){
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT&page=1')
         
            dispatch(popularFilms([response.data.results,type]));
           
          
        } catch (error) {
            dispatch(catchError(error))
        }
    }
    if(type ==='tv'){
        try {
            const response = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT&page=1')
            dispatch(popularFilms([response.data.results,type]));
        } catch (error) {
            dispatch(catchError(error))
        }
    }
}
export default reducer;