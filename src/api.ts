import {response} from "express";

const API_KEY = "9c1dfc2c8d94d50fc259dd62edd3fcff";
const BASE_PATH = "https://api.themoviedb.org/3"

export interface IContents {
    adult: boolean;
    backdrop_path : string;
    genre_ids: number[];
    id : number;
    original_language: string;
    overview: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;

    //movies
    original_title? : string;
    release_date?: string;
    title?: string;
    video?: boolean;

    //tvshow
    first_air_date? : string;
    name? : string;
    origin_country? : string[];
    original_name? : string;
}


export interface IGetContentsResult {
    dates : {
        maximum : string;
        minimum : string;
    },
    page: number;
    results : IContents[];
    total_pages : number;
    total_results : number;
}

export interface ISliderProps {
    type : string;
    section : string;
}

export function getContents( { type, section } : ISliderProps ) {
    return fetch(`${BASE_PATH}/${type}/${section}?api_key=${API_KEY}`).then(response => response.json());
}

export function searchContentsFromKeywork( type: string, keyword : string) {
    return fetch(`${BASE_PATH}/search/${type}?api_key=${API_KEY}&query=${keyword}`).then(response => response.json());
}

export function getTrendingContent(type : "movie" | "tv") {
    return fetch(`${BASE_PATH}/trending/${type}/day?api_key=${API_KEY}`).then(response => response.json());
}