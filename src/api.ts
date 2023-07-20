import {response} from "express";

const API_KEY = "9c1dfc2c8d94d50fc259dd62edd3fcff";
const BASE_PATH = "https://api.themoviedb.org/3"

export function getMovies () {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => response.json());
}
