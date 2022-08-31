import axios from 'axios';

const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3/search/movie',
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
  
export {instance,instanceId};