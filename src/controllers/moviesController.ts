import express from "express";
import fetch from "node-fetch";
import qs from "qs";


type Movie = {
    id: number;
    title: string;
    vote_average: number;
    popularity: number
    release_date: string;
    overview : string
}

type MovieResponse = {
    page : number;
    results : Movie[];
    total_pages: number;
}

const defaultCount = 20;
const defaultRating = 7.5;
const apiKey: string = '69a5ae7d41d296647da8522474ecdc4d';
export const getMovies = async (req: express.Request, res: express.Response) => {
    const page = req.query.page || 20;
    try {
        const url : string = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Unable to get movies");
    }
}

export const getPopularMovies = async (req : express.Request, res : express.Response) => {
    const rating = Number(req.query.rating) || defaultRating;
    const count = Number(req.query.count) || defaultCount;
    try {
        const listPopular20Movies : Movie[]  = []
        let pageNumber = 1;
        while (listPopular20Movies.length <= count) {
            const popularMoviesResponse: MovieResponse = await (await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=${pageNumber}`)).json();

            popularMoviesResponse.results.forEach((movie) => {
                if (movie.vote_average >= rating) {
                    listPopular20Movies.push(movie);
                }
            });

            pageNumber++;
            if (pageNumber > popularMoviesResponse.total_pages) {
                break;
            }
        }
        console.log(`[getPopularMovies] Visited pages: ${pageNumber}`);
        res.status(200).json(listPopular20Movies.slice(0, count));
    } catch (e) {
        console.error("[getPopularMovies] Error: ", e);
        res.status(400).send("Unable to get top 20 popular movies")
    }
}
