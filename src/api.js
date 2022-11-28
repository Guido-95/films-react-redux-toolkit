import axios from 'axios';

const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3/search/movie',
    params:{
        api_key: "e99307154c6dfb0b4750f6603256716d",
        language: 'it-IT'
    }
});
const instanceTv = axios.create({
    baseURL:'https://api.themoviedb.org/3/search/tv',
    params:{
        api_key: "e99307154c6dfb0b4750f6603256716d",
        language: 'it-IT'
    }
});

const instanceId = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key: "e99307154c6dfb0b4750f6603256716d",
        language: 'it-IT'
    }
});
const instanceTvId = axios.create({
    baseURL:'https://api.themoviedb.org/3/tv',
    params:{
        api_key: "e99307154c6dfb0b4750f6603256716d",
        language: 'it-IT'
    }
});


const instancePopularFilm = axios.create({
    baseURL:'https://api.themoviedb.org/3/movie/popular',
    params:{
        api_key: "e99307154c6dfb0b4750f6603256716d",
        language: 'it-IT'
    }
});
export {instance,instanceId,instanceTvId,instancePopularFilm,instanceTv};