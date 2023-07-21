import {response} from "express";

const API_KEY = "9c1dfc2c8d94d50fc259dd62edd3fcff";
const BASE_PATH = "https://api.themoviedb.org/3"

interface IMovie {
    adult: boolean;
    backdrop_path : string;
    genre_ids: number[];
    id : number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IGetMoviesResult {
    dates : {
        maximum : string;
        minimum : string;
    },
    page: number;
    results : IMovie[];
    total_pages : number;
    total_results : number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(response => response.json());
}
